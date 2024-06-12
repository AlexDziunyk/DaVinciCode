const User = require('../models/user');
const generateToken = require('../service/tokenService');
const { sendConfirmationEmail } = require('../service/emailService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const createUser = async (req, res) => {

  const { login, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const existingUser = await User.findOne({ login });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this login already exists' });
    }

    const user = new User({
      login: login,
      profilename: login,
      password: hashedPassword,
      email: email,
    });

    //const confirmationToken = generateToken();
    //user.confirmationToken = confirmationToken;

    const result = await user.save();

    //await sendConfirmationEmail(email, confirmationToken);

    // const secretKey = "sdpofmsflklkj34jj6klkljal";
    // console.log('Debug test secret key:', secretKey);

    const token = jwt.sign({ userId: user._id, login: user.login }, process.env.JWT_SECRET, { expiresIn: '3d' });

    return res.status(201).json({ data: result, message: "User successfully created! Check your email for confirmation!", token });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create a user",
      error: error.message
    });
  }
}



const loginUser = async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await User.findOne({ login });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, login: user.login }, process.env.JWT_SECRET, { expiresIn: '3d' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = { createUser, loginUser };
