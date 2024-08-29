import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler"
import User from "../model/userModel.js";
import bcrypt from "bcryptjs"

const genToken = (id)=>{
    return jwt.sign({id},process.env.JWT_KEY,{expiresIn:"1d"});
};



const registerUser = asyncHandler(async(req,res)=>{
    const {email, username, password} = req.body;

    if(!email || !username || !password){
        res.status(400);
        throw new Error("Please enter all field")
    }

    if(password.length<6){
        res.status(400);
        throw new Error("Password must contain atleast 6 character")
    }

    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("User already exist")
    }

    const user = await User.create({
        email,
        username,
        password
    });

    const token = genToken(user._id);
    res.cookie("token",token,{
        httpOnly:true,
        expires:new Date(Date.now() + 1000 + 86400),
        secure:false,
        sameSite:"lax",
        path:"/"
    });

    if(user){
        const {username, email} = user;
        res.status(201).json({
            username,
            email
        });
    }
    else{
        res.status(400)
        throw new Error("Invalid user Data")
    }
});


const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        req.status(400)
        throw new Error("Please provide email and password");
    }

    const user = await User.findOne({email});
    if(!user){
        res.status(400)
        throw new Error("User not Found")
    }

    const passwordMatch = await bcrypt.compare(password,user.password);
    const token = genToken(user._id);

    res.cookie("token",token,{
        httpOnly:true,
        expires:new Date(Date.now() + 1000 + 86400),
        secure:false,
        sameSite:"lax",
        path:"/"
    });

    if(user && passwordMatch){
        const {username,email} = user;
        res.status(201).json({username,email})
    }else{
        res.status(400)
        throw new Error("Invalid email and password")
    }
});


const loginCheck = asyncHandler(async(req,res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json(false);
    }

    try{
        const verify = jwt.verify(token.process.env.JWT_KEY);
        if(verify){
            return res.json(true);
        }
    } catch(error){
        console.error("jwt verification failed",error.message);
    }

    return res.json(false);
});


const logout = (req,res)=>{
    res.clearCookie("token");
    res.status(200).json({message:"Successfully Logged out"})
}


const getuser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);

    if(user){
        const {email,username} = user;
        res.status(200).json({
            email,
            username
        })
    }else{
        res.status(400)
        throw new Error("user not found!")
        console.log("User not found")
    }
});


const updateUser = asyncHandler(async(req,res)=>{
    const id = req.user._id;
    const {email,username} = req.body;


    try{
        await User.findbyIdAndUpdate(id, {email,username},{new:true,runValidator:true});
        res.status(200).json({message:"User updated successfully"})
    }catch(error){
        res.status(400)
        throw new Error("User not updated")
    }
})


const updatePassword = asyncHandler(async(req,res)=>{
    const id = req.user._id;
    const password = req.body;

    try{
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(password,salt);
        await User.findbyIdAndUpdate(id,{password:hashpass},{new:true,runValidator:true})
        res.status(201).json({message:"Update successfully"})
    } catch(error){
        res.status(400)
        throw new Error("Unable to update")
    }
})

export {registerUser,loginUser,loginCheck,logout,getuser,updateUser,updatePassword}