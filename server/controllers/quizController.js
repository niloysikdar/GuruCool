const Classroom = require('../models/Classroom');
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
    const quizzes = await Quiz.find({ classroom: req.query.id });
    quizzes.forEach(quiz => {
      quiz.qnas.forEach(qna => {
        qna.options.forEach(option => {
          option.isCorrect = false;
        });
      });
    });
    res.status(200).send(respMessage(true, { quizzes }, 'Quizzes fetched successfully'));
  } catch (error) {
    res.status(400).send(respMessage(false, {}, error.message));
  }
}

exports.submitQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.query.id);
    const user = await User.findById(req.user.userId);
    if (user.role === 'Student') {
      const answers = req.body.answers;
      let score = 0;
      for (var i = 0; i < quiz.qnas.length; i++) {
        var qna = quiz.qnas[i];
        for (var j = 0; j < qna.options.length; j++) {
          var option = qna.options[j];
          if (option.isCorrect && answers[i] === j) {
            score++;
          }
        }
      }
      const totalScore = quiz.qnas.length;
      const result = {
        score,
        totalScore,
        percentage: (score / totalScore) * 100,
        submittedBy: user._id,
        submittedOn: Date.now()
      }
      var level = Math.floor((user.points + score) / 100);
      await User.findByIdAndUpdate(user._id, { points: (user.points + score), level: level });
      await Quiz.findByIdAndUpdate(req.query.id, { $push: { submissions: result } });
      const classroom = await Classroom.findById(quiz.classroom);
      for (let i = 0; i < classroom.students.length; i++) {
        if (classroom.students[i].userId === user._id) {
          classroom.students[i].score += score;
          classroom.students[i].level = Math.floor(classroom.students[i].points / 100);
          break;
        }
      }
      console.log(classroom.students)
      await Classroom.findByIdAndUpdate(req.query.classroomId, { students: classroom.students });
      res.status(200).send(respMessage(true, { result }, 'Quiz submitted successfully'));
    } else {
      res.status(403).send(respMessage(false, {}, 'Only students can submit quiz'));
    }
  }
  catch (error) {
    res.status(400).send(respMessage(false, {}, error.message));
  }
}