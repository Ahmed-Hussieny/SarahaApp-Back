import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    isConfirmed:{
        type: Boolean,
        default: false
    },
    profilePic:String
},{
    timestamps: true
})

const User = model('user', userSchema);
export default User;