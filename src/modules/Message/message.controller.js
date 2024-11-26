import { addDocument, findDocument } from "../../../DB/dbMethods.js";
import Message from "../../../DB/models/message.model.js";
import User from "../../../DB/models/user.model.js";

// ====================== ADD MESSAGE ======================

export const addMessage = async (req, res, next) => {
    const { content } = req.body;
    const { sendTo } = req.query;
    // const isUserExists = await User.findById(sendTo);
    const isUserExists = await findDocument(User, { _id: sendTo });
    if (!isUserExists.success) {
        // return res.status(400).json({ message: "User not found" });
        return res.status(isUserExists.status).json({ message: isUserExists.message });
    }
    // const newMessage = await Message.create({ content, sendTo });
    const newMessage = await addDocument(Message, { content, sendTo });
    if(!newMessage.success){
        // return res.status(400).json({message: "Something went wrong"});
        return res.status(newMessage.status).json({message: newMessage.message});
    }
    // return res.status(200).json({message: "Message sent successfully", data: newMessage.data});
    return res.status(newMessage.status).json({message: newMessage.message, data: newMessage.data});
};

// ====================== DELETE MESSAGE ======================
export const deleteMessage = async (req, res, next) => {
    const {loggedInUserId, messageId } = req.query;
    const deletedMessage = await Message.findOneAndDelete({
        _id: messageId,
        sendTo: loggedInUserId
    });
    if(!deletedMessage){
        return res.status(400).json({message: "Something went wrong"});
    }
    return res.status(200).json({message: "Message deleted successfully", deletedMessage});
};

// ====================== MARK MESSAGE AS VIEWED ======================

export const markMessageAsViewed = async (req, res, next) => {
    const { loggedInUserId, messageId } = req.query;
    const updatedMessage = await Message.findOneAndUpdate({
        _id: messageId,
        sendTo: loggedInUserId,
        isViewed: false
    },{isViewed: true, $inc:{__v: 1}},{new: true});
    if(!updatedMessage){
        return res.status(400).json({message: "Something went wrong"});
    }
    return res.status(200).json({message: "Message marked as viewed", updatedMessage});
}

// ====================== GET MESSAGES FOR USER ======================

export const getMessagesForUser = async (req, res, next) => {
    const { loggedInUserId, isViewed } = req.query;
    if(!loggedInUserId){
        return next(new Error("User not found",{cause: 404}));
    }
    const messages = await Message.find({ sendTo: loggedInUserId, isViewed }).sort({createdAt: -1});
    if(!messages.length){
        return next(new Error("No messages found",{cause: 400}));
    }
    return res.status(200).json({message: "Messages found", count:messages.length, messages});
};