import AsyncHandler from "express-async-handler";
import { User } from "../model/userModel.js";
import jwt from "jsonwebtoken";


const protect = AsyncHandler(async (req,res, next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            res.status(401);
            throw new Error("User not authorised, please login");
        }


        const verified = jwt.verify(token, process.env.JWT_KEY);

        const user = await User.findById(verified.id).select("-password");
        if(!user){
            res.status(401);
            throw new Error("User not found");
        }

        req.user = user;
        next();
    } catch (error){
        res.status(401);
        throw new Error("Not authorised, please login");
    }
});



export default protect;