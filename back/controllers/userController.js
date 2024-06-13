const User = require('../models/user');
const path = require('path');
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

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

const uploadMyImage = async (req, res) => {
  const filePath = req.file ? path.basename(req.file.path) : "event.jpg";
  const { login } = req.login;

  try {
    const user = await User.findOne({ login: login });
    const finalFilePath = "http://localhost:3001/uploads/" + filePath;
    user.myImages.push(finalFilePath);
    await user.save();

    return res.status(200).json({ message: "Successfully loaded image!" });
  } catch (error) {
    return res.status(500).json({ message: "Error with loading an image" });
  }
}

const getUploadedImages = async (req, res) => {
  const { login } = req.login;

  try {
    const user = await User.findOne({ login: login });

    return res.status(200).json({ message: "Successfully got images!", result: user.myImages });

  } catch (error) {
    return res.status(500).json({ message: "Error with getting images" });
  }

}

const saveShapes = async (req, res) => {
  const { login } = req.login;
  const { shapes } = req.body;

  if(shapes.length == 0){
    return res.status(200);
  }

  try {
    const user = await User.findOne({ login: login });

    user.shapes = [];

    const shapesJson = JSON.stringify(shapes);
    user.shapes.push(shapesJson);
    await user.save();

    return res.status(200).json({ message: "Successfully save shapes!" });
  } catch (error) {
    return res.status(500).json({ message: "Error with loading shapes" });
  }
}

const getShapes = async (req, res) => {
  const { login } = req.login;

  try {
    const user = await User.findOne({ login: login });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const shapes = user.shapes.map(shape => JSON.parse(shape));

    return res.status(200).json({ shapes: shapes[0] });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching shapes", error: error.message });
  }
};

const uploadAiImage = async (req, res) => {
  const { login } = req.login;
  const { image } = req.body;

  try {
    const user = await User.findOne({ login: login });
    user.aiImages.push(image);
    await user.save();

    return res.status(200).json({ message: "Successfully loaded ai image!", result: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error with loading an ai image", result: false });
  }

}

const getAiImages = async (req, res) => {
  const { login } = req.login;

  try {
    const user = await User.findOne({ login: login });

    return res.status(200).json({ message: "Successfully got ai images!", result: user.aiImages });

  } catch (error) {
    return res.status(500).json({ message: "Error with getting ai images" });
  }

}


module.exports = { createUser, loginUser, uploadMyImage, uploadAiImage, getUploadedImages, getAiImages, saveShapes, getShapes };
