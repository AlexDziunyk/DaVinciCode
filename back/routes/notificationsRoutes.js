const express = require('express');
const router = express.Router();

const { getAllNotifications, addNotificationToUser } = require('../controllers/notificationController');
const { tokenVerify } = require('../middlewares/tokenVerify');

router.get('/all', tokenVerify, getAllNotifications);
router.post('/add', tokenVerify, addNotificationToUser);

module.exports = router;