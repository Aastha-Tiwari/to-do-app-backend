import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ************************* Function to create a token using JWT ********************************
function createToken(id){
    return jwt.sign({id} , process.env.JWT_SECRET_KEY);
}


// ************************* Controller to register a user *********************************
const registerUser = async (req , res)=>{
    try{
        const {username , email , password} = req.body;
        // Check whether all fields are filled or not
        if(!username || !email || !password){
            return res.json({success:false , message: "All fields are required"});
        }
        // Register the user only if the email does not exist already
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.json({success:false , message: "email already exists"});
        }
        // check whether the password length is more than 5 or not
        if(password.length<6){
            return res.json({success:false , message: "password length should be more than 5"});
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password , 10);

        // Create a user and save it
        const newUser = new User({
            username,
            email,   
            password:hashedPassword
        });
        await newUser.save();

        return res.status(200).json({success:true , message:"User registered successfully , Now Please Login"});
    }catch(error){
        console.log("Error in Register User Controller");
        return res.status(500).json({success:false , message: "Internal Server Error"});
    }
}


// ************************* Controller to Login a User *************************************
const loginUser = async (req , res)=>{
    try{
        const {username , password} = req.body;
        const existingUser = await User.findOne({username});
        if(!existingUser){
            return res.json({success:false , message : "Username doesn't exist"});
        }

        // user already exists , so now check the password is correct or not
        const isPasswordMatch = await bcrypt.compare(password , existingUser.password);
        if(!isPasswordMatch){
            return res.json({success:false , message : "Incorrect Password"}); 
        }

        // password also matches , so user will successfully login
        // Generate a token for the user
        const token = createToken(existingUser._id);

        return res.status(200).json({success:true , message : "User Logged in Successfully" , id:existingUser._id , token});

    }catch(error){
        console.log("Error in Login User Controller");
        return res.status(500).json({success:false , message: "Internal Server Error"});
    }
}

export {registerUser , loginUser};