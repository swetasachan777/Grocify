import { isAuth, login, logout, registerUser } from "../controllers/userController.js";
import express from 'express';  // Fix: add quotes around 'express'
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();
userRouter.post('/register', registerUser);
userRouter.post('/login', login);
userRouter.get('/is-auth', authUser,isAuth);
userRouter.get('/logout', authUser,logout);


export default userRouter;
