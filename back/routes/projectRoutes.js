const express = require('express');
const router = express.Router();
const { tokenVerify } = require('../middlewares/tokenVerify');

const { createProject, getAllProjects } = require('../controllers/projectController');


router.post('/create', tokenVerify, createProject);
router.get('/my', tokenVerify, getAllProjects);

module.exports = router;