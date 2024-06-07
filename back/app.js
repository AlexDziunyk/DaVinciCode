const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const openaiRoutes = require('./routes/openaiRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/openai', openaiRoutes);

app.listen(3001, () => {
  console.log("Listening...");
})