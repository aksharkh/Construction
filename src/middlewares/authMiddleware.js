import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import 'dotenv/config';

 export const protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findByPk(decoded.id, {
                attributes: { exclude: ["password"] }
            });

            if(!req.user){
                return res.status(401).json({
                    message:"Not authorized, user not found"
                });
            }
            next();

        } catch(error){
            console.error("Error in auth middleware:", error);
            return res.status(401).json({
                message: "Not authorized, token failed"
            });

        }
    }


    if(!token){
        return res.status(401).json({
            message: "Not authorized, no token provided"
        });
    }

    
};

export const authorize = (...roles) => {
    return( req, res, next) => {
        if(!req.user || !roles.includes(req.user.role)){
            return res.status(403).json({
                message: `Dennied, user role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    }
}