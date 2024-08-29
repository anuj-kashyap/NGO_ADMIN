import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true
    },
    phone: {
        type: String,
        required: [true,"Please add a phone number"],
        trim: true,
        match: [/^\d{10,15}$/, "Please enter a valid phone number"]
    },
    email: {
        type: String,
        required: [true,"Please add an email"],
        trim: [true],
        match:  [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"]
    },
    comment: {
        type: String,
        trim: true
    }
    
},
    {
        timestamps:true
    }

);



export const Contact = mongoose.model('Contact',contactSchema)