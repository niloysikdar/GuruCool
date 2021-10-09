const userRouter = require('express').Router();
const userController = require('../controllers/userController');

userRouter.post('/login', userController.loginUser);
userRouter.post('/register', userController.createUser);

module.exports = userRouter;
