import express from 'express';
import cors from 'cors'
const app = express();
app.use(cors())
app.use(express.json({limit:'20kb'}))
app.use(express.urlencoded({extended:true,limit:'20kb'}))
app.use(express.static("public"));

//import routes
import userRouter from './routes/user.routes.js'


app.use("/users",userRouter)
export {app}