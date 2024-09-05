import AsyncHandler from "express-async-handler";
import { User } from "../model/userModel.js";
import jwt from "jsonwebtoken";

const protect = AsyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            res.status(401);
            throw new Error("User not authorized, please login");
        }

        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_KEY);

        if (!verified || !verified.id) {
            res.status(401);
            throw new Error("Invalid token");
        }

        // Fetch user from the database
        const user = await User.findById(verified.id).select("-password");

        if (!user) {
            res.status(401);
            throw new Error("User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protect middleware:", error); // Log the error for debugging
        res.status(401);
        throw new Error("Not authorized, please login");
    }
});

export default protect;
