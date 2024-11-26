import { model, Schema } from "mongoose";

const messageSchema = new Schema({
    content :{
        type : String,
        required: true
    },
    sendTo:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    isViewed:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

const Message = model('message', messageSchema);
export default Message;