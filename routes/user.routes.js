const { getUsers, getUserByID } = require('../controllers/user.controller');

const app = require('express');

const userRouter = app.Router()

userRouter.get('/:id', getUserByID);
userRouter.get('/', getUsers);

module.exports = userRouter;