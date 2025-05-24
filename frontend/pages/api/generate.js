const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
const { Pinecone } = require('@pinecone-database/pinecone');
const cors = require('cors');
// Initialize Bedrock client

app.use(cors({
  origin: 'https://smart-shopping-assistant-beta.vercel.app/', // your frontend domain here
}));
const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Initialize Pinecone
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

// Get Titan embedding
async function getTitanEmbedding(text) {
  const command = new InvokeModelCommand({
    modelId: 'amazon.titan-embed-text-v2:0',
    contentType: 'application/json',
    accept: 'application/json',
    body: Buffer.from(JSON.stringify({ inputText: text })),
  });

  const response = await bedrockClient.send(command);
  const result = JSON.parse(Buffer.from(response.body).toString('utf8'));
  return result.embedding;
}

// Query Pinecone
async function queryPinecone(embedding, topK = 3) {
  const response = await index.query({
    vector: embedding,
    topK,
    includeMetadata: true,
  });

  return (response.matches || []).filter((m) => m?.metadata?.content);
}

// Call Claude model
async function callClaudeWithMessages(context, question) {
  const systemPrompt = `
You are a smart shopping assistant. Answer questions clearly and confidently.

NEVER say:
- "Based on the information"
- "According to the product details"
- "Context suggests"
- "It seems that"
- "From what I understand"

Give direct, helpful, confident answers. Do not reference the question or context. Do not explain your reasoning.
`.trim();

  const messages = [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: `${context}\n\nQ: ${question}\nA:`,
        },
      ],
    },
  ];

  const command = new InvokeModelCommand({
    modelId: 'anthropic.claude-3-haiku-20240307-v1:0',
    contentType: 'application/json',
    accept: 'application/json',
    body: Buffer.from(
      JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        system: systemPrompt,
        messages,
        max_tokens: 1024,
        temperature: 0.5,
        top_p: 0.9,
      })
    ),
  });

  const response = await bedrockClient.send(command);
  const result = JSON.parse(Buffer.from(response.body).toString('utf8'));
  let answer = result.content?.[0]?.text?.trim() || 'No response generated.';

  const vaguePatterns = [
    /not enough information/i,
    /please provide more context/i,
    /could you rephrase/i,
    /based on the/i,
    /according to the/i,
  ];

  if (vaguePatterns.some((p) => p.test(answer))) {
    answer = "I'm unable to answer that right now. Try asking something else.";
  }

  return answer;
}

// Main handler
async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body. "messages" must be an array.' });
  }

  try {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.sender !== 'user') {
      return res.status(400).json({ error: 'Last message must be from user.' });
    }

    const question = lastMessage.content;

    const history = messages
      .slice(0, -1)
      .map((m) => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n');

    const fullContext = history ? `Conversation:\n${history}` : '';

    const embedding = await getTitanEmbedding(question);
    const matches = await queryPinecone(embedding, 3);
    const contextText = matches.length > 0
      ? matches.map((m) => m.metadata.content).join('\n---\n')
      : 'No relevant product information found.';

    const combinedContext = `${contextText}\n\n${fullContext}`;
    const answer = await callClaudeWithMessages(combinedContext, question);

    res.status(200).json({ answer });
  } catch (error) {
    console.error('Claude error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}

module.exports = handler;
