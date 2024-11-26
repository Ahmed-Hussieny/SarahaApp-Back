import mongoose from "mongoose";

const connection_DB = async ()=>{
    await mongoose.connect(process.env.CONNECTION_STRING)
    .then(()=>console.log('DB connected'))
    .catch((err)=>console.log(err));
}
export default connection_DB;