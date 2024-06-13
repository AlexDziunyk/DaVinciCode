const express = require('express');
const router = express.Router();
const { loginUser, createUser, uploadMyImage, getUploadedImages, getAiImages } = require('../controllers/userController');
const { tokenVerify } = require('../middlewares/tokenVerify');
const { imageUpload } = require('../middlewares/imageUpload');

router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/upload/myimages', imageUpload.single('image'), tokenVerify, uploadMyImage);
router.post('/upload/aiimages', tokenVerify, uploadMyImage);
router.get('/aiimages', tokenVerify, getAiImages);
router.get('/myimages', tokenVerify, getUploadedImages);

module.exports = router;
