import User from "../../../DB/models/user.model.js";
import bcrypt from "bcryptjs";

// ========================== sign Up ==========================

export const SignUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    // ^ username check
    const isUsernameDuplicate = await User.findOne({ username });
    if (isUsernameDuplicate) {
        return res.status(400).json({ message: "Username already exists" });
    }
    // ^ email check
    const isEmailDuplicate = await User.findOne({ email });
    if (isEmailDuplicate) {
        return res.status(400).json({ message: "Email already exists" });
    }
    // ^ password hashing
    const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);
    const createdUser = await User.create({ username, email, password:hashedPassword });
    if(!createdUser){
        return res.status(400).json({message: "Something went wrong"});
    }
    return res.status(201).json({message: "User created successfully",createdUser});
};

// ========================== sign In ==========================

export const SignIn = async (req, res, next) => {
    const { username, email, password } = req.body;

    const user = await User.findOne({ 
        $or: [{ username }, { email }]
    });
    //^ user check
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    //^ password check
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({ message: "Logged in successfully", user });
};

//======================= update User ========================
export const updateUser = async (req, res, next) => {
    const { id , loggedInId} = req.query;
    const { username, email } = req.body;
    if(id !== loggedInId){
        return res.status(400).json({message: "You are not authorized to update this user"});
    }
    let updatedObject = {};
    if (username){
        const isUsernameDuplicate = await User.findOne({username});
        if(isUsernameDuplicate){
            return res.status(400).json({message: "Username already exists"});
        }
        updatedObject.username = username;
    } 
    if(email){
        const isEmailDuplicate = await User.findOne({email});
        if(isEmailDuplicate){
            return res.status(400).json({message: "Email already exists"});
        }
        updatedObject.email = email;
    }
    const updatedUser = await User.findByIdAndUpdate(id, updatedObject, {new: true});
    if(!updatedUser){
        return res.status(400).json({message: "Something went wrong"});
    }
    return res.status(200).json({message: "User updated successfully", updatedUser});
}

//======================= delete User ========================

export const deleteUser = async (req, res, next) => {
    const { _id ,loggedInId } = req.query;
    //^ way one
        // const deletedUser = await User.findByIdAndDelete({
        //     _id:loggedInId
        // });
        // if(!deletedUser){
        //     return res.status(400).json({message: "Something went wrong"});
        // }

    //^ way two
        if(_id !== loggedInId){
            return res.status(400).json({message: "You are not authorized to delete this user"});
        }
        const deletedUser = await User.findByIdAndDelete(_id);
        if(!deletedUser){
            return res.status(400).json({message: "Something went wrong"});
        }
    return res.status(200).json({message: "User deleted successfully", deletedUser});
};

// ========================== get user by id ===========================

export const getUserById = async (req, res, next) => {
    const { id } = req.query;
    const user = await User.findById(id, 'username email profilePic');
    if(!user){
        return res.status(400).json({message: "User not found"});
    }
    return res.status(200).json({message: "User found successfully", user});
};