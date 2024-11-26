import { Router } from "express";
import * as userController from './user.controller.js';
const userRouter = Router();
userRouter.post('/SignUp', userController.SignUp);
userRouter.post('/SignIn', userController.SignIn);
userRouter.put('/updateUser', userController.updateUser);
userRouter.delete('/deleteUser', userController.deleteUser);
userRouter.get('/getUserById', userController.getUserById);
export default userRouter;