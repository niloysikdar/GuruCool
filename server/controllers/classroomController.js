const Classroom = require('../models/Classroom');
const User = require('../models/User');
const respMessage = require('../utils/respMessage');

exports.createClassroom = async (req, res) => {
  try {
    Classroom.create({ ...req.body, createdBy: req.user.userId }, async (err, classroom) => {
      if (err) {
        return res.status(500).send(respMessage(false, {}, err));
      }
      await User.findByIdAndUpdate(req.user.userId, { $push: { classrooms: classroom._id } }, (err, user) => {
        if (err) {
          return res.status(500).send(respMessage(false, {}, err));
        }
        const fullname = user.fullname;
        //console.log(name)
        return res.status(201).send(respMessage(true, { ...classroom._doc, fullname }, null));
      });
    });
  } catch (err) {
    return res.status(500).send(respMessage(false, {}, err));
  }
}

exports.getClassroomById = async (req, res) => {
  try {
    Classroom.findById(req.query.id, async (err, classroom) => {
      if (err) {
        return res.status(500).send(respMessage(false, {}, err));
      }
      const user = await User.findById(classroom.createdBy);
      const fullname = user.fullname;
      //console.log(user)
      return res.status(200).send(respMessage(true, { ...classroom._doc, fullname }, null));
    });
  } catch (err) {
    return res.status(500).send(respMessage(false, {}, err));
  }
}
exports.joinClassroom = async (req, res) => {
  try {
    Classroom.findByIdAndUpdate(req.query.id, { $push: { students: { userId: req.user.userId, score: 0, level: 0 } } }, (err, classroom) => {
      if (err) {
        return res.status(500).send(respMessage(false, {}, err));
      }
      User.findByIdAndUpdate(req.user.userId, { $push: { classrooms: req.query.id } }, (err, user) => {
        if (err) {
          return res.status(500).send(respMessage(false, {}, err));
        }
        return res.status(200).send(respMessage(true, { classroom }, null));
      });
    });
  } catch (err) {
    return res.status(500).send(respMessage(false, {}, err));
  }
}