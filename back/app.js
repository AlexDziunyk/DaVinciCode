const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const mongoDB = process.env.MONGODB;

const openaiRoutes = require('./routes/openaiRoutes');
const userRoutes = require('./routes/userRoutes');


mongoose.connect(mongoDB)
  .then(result => console.log("connected to db"))
  .catch(e => console.log(e));


app.use(cors());
app.use(express.json());

app.use('/api/openai', openaiRoutes);
app.use('/api/user', userRoutes);

app.listen(3001, () => {
  console.log("Listening...");
})