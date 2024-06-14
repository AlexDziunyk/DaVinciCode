const express = require('express');
const router = express.Router();
const { loginUser, createUser, uploadMyImage, getUploadedImages, getAiImages, saveShapes, getShapes, uploadAiImage, getInfo, updateInfo } = require('../controllers/userController');
const { tokenVerify } = require('../middlewares/tokenVerify');
const { imageUpload } = require('../middlewares/imageUpload');

router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/upload/myimages', imageUpload.single('image'), tokenVerify, uploadMyImage);
router.post('/upload/aiimages', tokenVerify, uploadAiImage);

router.post('/shapes/:id', tokenVerify, saveShapes);

router.get('/aiimages', tokenVerify, getAiImages);
router.get('/myimages', tokenVerify, getUploadedImages);

router.get('/shapes/:id', tokenVerify, getShapes);

router.get('/info', tokenVerify, getInfo);
router.post('/info/update', tokenVerify, updateInfo);

module.exports = router;
