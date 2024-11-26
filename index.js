import express from 'express';
import connection_DB from './DB/connection.js';
import userRouter from './src/modules/User/user.routes.js';
import messageRouter from './src/modules/Message/message.routes.js';
import { config } from 'dotenv';
import { globalResponce } from './src/middlewares/globalResponse.js';
config();
// config({path: './config/dev.config.env'}); // if you have .env file in a different directory
const app = express();
app.use(express.json());
connection_DB();
app.use('/user', userRouter);
app.use('/message', messageRouter);

app.use(globalResponce)
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});