const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/', questionController.getQuestions);
router.get('/search',questionController.getQuestionsByTitle);


module.exports = router;