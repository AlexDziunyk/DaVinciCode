const express = require('express');
const router = express.Router();
const { loginUser, createUser, uploadMyImage, getUploadedImages, getAiImages, saveShapes, getShapes, uploadAiImage } = require('../controllers/userController');
const { tokenVerify } = require('../middlewares/tokenVerify');
const { imageUpload } = require('../middlewares/imageUpload');

router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/upload/myimages', imageUpload.single('image'), tokenVerify, uploadMyImage);
router.post('/upload/aiimages', tokenVerify, uploadAiImage);
router.post('/shapes', tokenVerify, saveShapes);
router.get('/aiimages', tokenVerify, getAiImages);
router.get('/myimages', tokenVerify, getUploadedImages);
router.get('/shapes', tokenVerify, getShapes);

module.exports = router;
