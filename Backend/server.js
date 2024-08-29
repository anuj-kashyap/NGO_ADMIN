import express from "express";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import { mongoose } from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import userRoute from "./Route/userRoute.js"
import contactRoute from "./Route/contactRoute.js"
dotenv.config()
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys:[process.env.SEESION_SECRET]
}))



app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(cors({
    origin:["http://localhost:5174"],
    credentials:true
}))

app.use("/api/user",userRoute)
app.use("/api/form",contactRoute)

const PORT = process.env.PORT||5000;


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`the server is running in the PORT ${PORT}`);
    })
}).catch((err)=>console.log(err));