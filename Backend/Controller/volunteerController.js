import Volunteer from "../model/volunteerModel.js";
// import User from "../model/userModel.js";
import fs from 'fs';
import path from "path";
export const registerVolunteer = async (req,res)=>{
    try{
        const {name, email, phone, services} = req.body;
        const existingVolunteer = await Volunteer.findOne({email});
        if(existingVolunteer){
            return res.status(400).json({message:"email is already a volunteer"});
        }


        let imagePath = '';

        if(req.file){
            imagePath = req.file.path;
        }


        const newVolunteer = new Volunteer({
            name,
            email,
            phone,
            services,
            image:imagePath,
        });

        await newVolunteer.save();
        res.status(201).json({message:"Volunteer registered successfully."});
    } catch (error){
        res.status(500).json({message:"server error: "+ error.message});
    }
};


export const getVolunteerDetails = async(req,res)=>{
    try{
        const volunteer = await Volunteer.find({});
        res.status(200).json(volunteer);
    }catch (error){
        res.status(500).json({message:'server error' + error.message});
    }
};


export const createVolunteer = async(req,res)=>{
    try{
        const {name,email,phone,services} = req.body;

        const existingVolunteer = await Volunteer.findOne({email});
        if(existingVolunteer){
            return res.status(400).json({message:'email is already a volunteer'});
        }

        const imagePath = req.file ? req.file.path : '';

        const newVolunteer = new Volunteer({
            name,
            email,
            phone,
            services,
            image:imagePath,
        });
        await newVolunteer.save();
        res.status(201).json({message: 'volunteer created successfully with image'});
    } catch (error){
        res.status(500).json ({message:'server error: '+ error.message});
    }
};