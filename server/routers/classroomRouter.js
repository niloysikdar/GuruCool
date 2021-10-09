const classroomRouter = require('express').Router();
const classroomController = require('../controllers/classroomController');
const verifyToken = require('../middlewares/verifyToken');

classroomRouter.post('/create', verifyToken, classroomController.createClassroom);
classroomRouter.get('/get', verifyToken, classroomController.getClassroomById);
classroomRouter.put('/join', verifyToken, classroomController.joinClassroom);
classroomRouter.get('/getAll', verifyToken, classroomController.getAllClassrooms);
classroomRouter.get('/getLeaderboard', verifyToken, classroomController.getLeaderboard);

module.exports = classroomRouter;