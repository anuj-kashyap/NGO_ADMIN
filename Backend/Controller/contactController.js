import AsyncHandler from "express-async-handler";
import  {Contact}  from "../model/contactModel.js";

const contact = AsyncHandler(async(req,res)=>{
    const {name,phone,email,comment} = req.body
    if(!name || !phone || !email || !comment){
        res.status(400)
        throw new Error("Please fill all field")
    }

    const userExist = await Contact.findOne({email});

    if(userExist){
        res.status(400)
        throw new Error("user already exist");
    }


    const form = await Contact.create({
        name:name,
        phone:phone,
        email:email,
        comment:comment
    });

    res.status(201).json(form);
})

const getContact = AsyncHandler(async(req,res)=>{
    const contact = await Contact.find();
    res.status(200)/json(contact)
})


const deleteContact = AsyncHandler(async(req,res)=>{
    const {email} = req.body;

    if(!email){
        res.status(400)
        throw new Error("Please provide an email")
    }


    const contact = await Contact.findOneAndDelete({email});

    if(!contact){
        res.status(400)
        throw new Error("Contact is not found");
    }

    res.status(200).json({message:"contact deleted successfully"})
})


export {contact,getContact,deleteContact};




