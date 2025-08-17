import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import 'dotenv/config';



export const register = async (req, res) => {


    const {name, email, password, role} = req.body;


    if(!name || !email || !password || !role){
        return res. status(400).json({
            message: "All fields are required"
        });
    }

    try{
        const existingUser = await User.findOne({ where: { email}});
        if(existingUser){
            return res.status(400).json({
                message: "User with this email already exists"
            });
        }


        const user = await User.create({name, email, password, role});

        res. status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    } catch(error){
        console.error("Error in registration:", error);
        return res.status(500).json({
            message: "Internal server error signup", error: error.message
        });
    }
}


export const login =  async (req, res) => {
    const { email, password} = req.body;



    if(!email || !password){
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    try{

        const user = await User.findOne({ where: { email}});
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isValidPassword = await user.isValidPassword(password);
        if(!isValidPassword){
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const payload = {
            id: user.id,
            role: user.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h"});

        res.status(200).json({
            message: "Login successful",
            token: token,
        });


    } catch(error){
        console.error("Error in login:", error);
        return res.status(500).json({
            message: "Internal server error in login", error: error.message
        })
    }
}