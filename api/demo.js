require('dotenv').config();
const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
const { Pinecone } = require('@pinecone-database/pinecone');

const app = express();  
const port = 3000;

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

async function getTitanEmbedding(text) {
  const input = { inputText: text };
  const command = new InvokeModelCommand({
    modelId: 'amazon.titan-embed-text-v2:0',
    contentType: 'application/json',
    accept: 'application/json',
    body: Buffer.from(JSON.stringify(input)),
  });

  const response = await bedrockClient.send(command);
  const result = JSON.parse(Buffer.from(response.body).toString('utf8'));
  return result.embedding;
}

async function loadAndUploadDocuments() {
  try {
    const rawData = fs.readFileSync('./data.json', 'utf8');
    const documents = JSON.parse(rawData);
    const failedVectors = [];

    for (const doc of documents) {
      const text = doc.content || doc.text || '';
      if (!text) continue;

      try {
        const embedding = await getTitanEmbedding(text);
        const vector = {
          id: uuidv4(),
          values: embedding,
          metadata: {
            title: doc.title || '',
            content: text,
          },
        };

        await index.upsert([vector]);
        // console.log(✅ Uploaded: ${vector.id});
      } catch (uploadError) {
        console.error('❌ Upsert failed. Backing up vector locally.');
        failedVectors.push({
          title: doc.title || '',
          content: text,
        });
      }
    }

    if (failedVectors.length > 0) {
      fs.writeFileSync('./vectors.json', JSON.stringify(failedVectors, null, 2));
      console.log("⚠ ${failedVectors.length} vectors saved to failed_vectors.json");
    }

    console.log('🎉 Upload process finished!');
  } catch (error) {
    console.error('❌ Error loading/uploading documents:', error);
  }
}

app.get('/upload', async (req, res) => {
  await loadAndUploadDocuments();
  res.send('📦 Documents processed. Check console and failed_vectors.json if needed.');
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
  