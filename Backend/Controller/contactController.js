import AsyncHandler from "express-async-handler";
import { Contact } from "../model/contactModel.js";

const contact = AsyncHandler(async (req, res) => {
  const { name, phone, email, comment } = req.body;

  if (!name || !phone || !email || !comment) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const userExist = await Contact.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const form = await Contact.create({
    name: name,
    phone: phone,
    email: email,
    comment: comment,
  });

  res.status(201).json(form);
});

const getContact = AsyncHandler(async (req, res) => {
  const contacts = await Contact.find();

  res.status(200).json(contacts);
});

const deleteContact = AsyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please provide an email");
  }

  const contact = await Contact.findOneAndDelete({ email });

  
  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  }

  
  res.status(200).json({ message: "Contact deleted successfully" });
});

export { contact, getContact, deleteContact };
