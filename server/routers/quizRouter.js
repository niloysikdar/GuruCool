const quizRouter = require('express').Router();
const quizController = require('../controllers/quizController');
const verifyToken = require('../middlewares/verifyToken');

quizRouter.get('/get', verifyToken, quizController.getQuiz);
quizRouter.post('/create', verifyToken, quizController.createQuiz);
quizRouter.get('/getAll', verifyToken, quizController.getAllQuiz);
quizRouter.post('/submit', verifyToken, quizController.submitQuiz);

module.exports = quizRouter;
