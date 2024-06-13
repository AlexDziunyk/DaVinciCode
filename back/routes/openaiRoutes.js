const express = require('express');
const router = express.Router();
const { tokenVerify } = require('../middlewares/tokenVerify');

//const { generateImage } = require('../controllers/openaiController');

router.post('/generate-image', tokenVerify, generateImage);


//module.exports = router;