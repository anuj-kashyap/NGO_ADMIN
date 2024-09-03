import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
   name: {
        type:String,
        required: true,
    },

    email: {
        type:String,
        required:true,
        unique:true,
    },

    phone:{
        type:String,
        required:true
    },

    services:{
        type:[String],
        enum: ['Teaching', 'Fundraising', 'Event Management', 'Community Outreach', 'Mentorship'],
        required: true,
    },

    Status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
    },

    Image:{
        type:String,
        required:false,

    },

    createdAt: {
        type:Date,
        default:Date.now,
    },
});


const Volunteer = mongoose.model('Volunteer', volunteerSchema);

export default Volunteer