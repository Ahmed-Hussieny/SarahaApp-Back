import { Router } from "express";
import * as messageController from './message.controller.js';
import asyncHandler from 'express-async-handler';
const messageRouter = Router();
messageRouter.post('/addMessage', asyncHandler(messageController.addMessage));
messageRouter.delete('/deleteMessage', asyncHandler(messageController.deleteMessage));
messageRouter.put('/markMessageAsViewed', asyncHandler(messageController.markMessageAsViewed));
messageRouter.get('/getMessagesForUser', asyncHandler(messageController.getMessagesForUser));
export default messageRouter;