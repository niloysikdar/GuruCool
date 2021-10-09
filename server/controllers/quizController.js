const Quiz = require('../models/Quiz');
const User = require('../models/User');
const respMessage = require('../utils/respMessage');

exports.createQuiz = async (req, res) => {
  const quiz = new Quiz({ ...req.body, createdBy: req.user.userId });
  try {
    await quiz.save();
    res.status(201).send(respMessage(true, { quiz }, 'Quiz created successfully'));
  } catch (error) {
    res.status(400).send(respMessage(false, {}, error.message));
  }
}

exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    const user = await User.findById(req.user.userId);
    if (user.role === 'Student') {
      quiz.qnas.forEach(qna => {
        qna.options.forEach(option => {
          option.isCorrect = false;
        });
      });
    }
    if (!quiz) {
      return res.status(404).send(respMessage(false, {}, 'Quiz not found'));
    }
    res.status(200).send(respMessage(true, { quiz }, 'Quiz fetched successfully'));
  } catch (error) {
    res.status(400).send(respMessage(false, {}, error.message));
  }
}

exports.getAllQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ classroom: req.params.id });
    res.status(200).send(respMessage(true, { quizzes }, 'Quizzes fetched successfully'));
  } catch (error) {
    res.status(400).send(respMessage(false, {}, error.message));
  }
}