const userRouter = require('express').Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

userRouter.post('/login', userController.loginUser);
userRouter.post('/register', userController.createUser);
userRouter.get('/currentUser', verifyToken, userController.getCurrentUser);

module.exports = userRouter;
