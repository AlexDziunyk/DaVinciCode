const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const User = require('./models/user');
// const passport = require('passport');
const mongoDB = process.env.MONGODB;

const openaiRoutes = require('./routes/openaiRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');

mongoose.connect(mongoDB)
  .then(result => console.log("connected to db"))
  .catch(e => console.log(e));


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use(session({
//   secret: 'your_secret_key',
//   resave: false,
//   saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/auth', authRoutes);

app.get('/confirm', async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ confirmationToken: token });

    if (!user) {
      return res.status(400).json({ error: 'Invalid confirmation token' });
    }

    user.confirmed = true;
    user.confirmationToken = undefined;
    await user.save();

    return res.status(200).json({ message: 'Account confirmed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.use('/api/openai', openaiRoutes);
app.use('/api/user', userRoutes);
app.use('/api/projects', projectRoutes);

app.listen(3001, () => {
  console.log("Listening");
})
