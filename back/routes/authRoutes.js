const express = require('express');
const router = express.Router();
const { sendConfirmationEmail } = require('../controllers/userController');
const User = require('../models/user');
const passport = require('../service/auth');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/'); 
  });

router.get('/confirm', async (req, res) => {
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

module.exports = router;
