// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const generateRouter = require('./generate'); // import the generate route

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mount the generate route
app.use('/generate', generateRouter);

app.get('/', (req, res) => {
  res.send('🧠 Smart Shopping Assistant API is running');
});

app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`);
});
