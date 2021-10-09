const Classroom = require('../models/Classroom');
const User = require('../models/User');
const respMessage = require('../utils/respMessage');

exports.createClassroom = async (req, res) => {
  try {
    Classroom.create(
      { ...req.body, createdBy: req.user.userId },
      async (err, classroom) => {
        if (err) {
          return res.status(500).send(respMessage(false, {}, err));
        }
        await User.findByIdAndUpdate(
          req.user.userId,
          { $push: { classrooms: classroom._id } },
          (err, user) => {
            if (err) {
              return res.status(500).send(respMessage(false, {}, err));
            }
            const fullname = user.fullname;
            //console.log(name)
            return res
              .status(201)
              .send(respMessage(true, { ...classroom._doc, fullname }, null));
          }
        );
      }
    );
  } catch (err) {
    return res.status(500).send(respMessage(false, {}, err));
  }
};

exports.getClassroomById = async (req, res) => {
  try {
    Classroom.findById(req.query.id, async (err, classroom) => {
      if (err) {
        return res.status(500).send(respMessage(false, {}, err));
      }
      const user = await User.findById(classroom.createdBy);
      const fullname = user.fullname;
      //console.log(user)
      return res
        .status(200)
        .send(respMessage(true, { ...classroom._doc, fullname }, null));
    });
  } catch (err) {
    return res.status(500).send(respMessage(false, {}, err));
  }
};

exports.joinClassroom = async (req, res) => {
  try {
    Classroom.findByIdAndUpdate(
      req.query.id,
      { $push: { students: { userId: req.user.userId, score: 0, level: 0 } } },
      (err, classroom) => {
        if (err) {
          return res.status(500).send(respMessage(false, {}, err));
        }
        User.findByIdAndUpdate(
          req.user.userId,
          { $push: { classrooms: req.query.id } },
          (err, user) => {
            if (err) {
              return res.status(500).send(respMessage(false, {}, err));
            }
            return res.status(200).send(respMessage(true, { classroom }, null));
          }
        );
      }
    );
  } catch (err) {
    return res.status(500).send(respMessage(false, {}, err));
  }
}

exports.getAllClassrooms = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user.role === 'Teacher') {
      Classroom.find({ createdBy: req.user.userId }, async (err, classrooms) => {
        if (err) {
          return res.status(500).send(respMessage(false, {}, err));
        }
        const fullname = user.fullname;
        //console.log(name)
        return res.status(200).send(respMessage(true, { classrooms, fullname }, null));
      });
    } else {
      var classrooms = [];
      for(let i = 0; i < user.classrooms.length; i++){
        const classroomData = await Classroom.findById(user.classrooms[i]);
        const createdBy = await User.findById(classroomData.createdBy);
        classrooms.push({ ...classroomData._doc, fullname: createdBy.fullname });
      }
      return res.status(200).send(respMessage(true, { classrooms }, null));
    }
  } catch (err) {
    return res.status(500).send(respMessage(false, {}, err));
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.query.id);
    const students = classroom.students;
    const studentsData = [];
    for (let i = 0; i < students.length; i++) {
      const user = await User.findById(students[i].userId);
      user.password = null;
      //console.log(user)
      studentsData.push({ ...user._doc, points: students[i].score, level: students[i].level });

    };
    console.log(studentsData)
    studentsData.sort((a, b) => b.points - a.points);
    const leaderboard = studentsData;
    return res.status(200).send(respMessage(true, { leaderboard }, null));
  } catch (err) {
    return res.status(500).send(respMessage(false, {}, err));
  }
}
