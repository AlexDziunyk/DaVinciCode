const express = require('express');
const router = express.Router();
const { loginUser, createUser, uploadMyImage, getUploadedImages } = require('../controllers/userController');
const { tokenVerify } = require('../middlewares/tokenVerify');
const { imageUpload } = require('../middlewares/imageUpload');

router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/upload/myimages', imageUpload.single('image'), tokenVerify, uploadMyImage);
router.get('/myimages', tokenVerify, getUploadedImages);

module.exports = router;
