const express = require('express');
const router = express.Router();
const { loginUser, createUser } = require('../controllers/userController');
const { tokenVerify } = require('../middlewares/tokenVerify');

router.post('/register', createUser);
router.post('/login', loginUser);

module.exports = router;
