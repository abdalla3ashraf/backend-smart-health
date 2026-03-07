// const User = require("../models/user.model");
// const bcrypt = require("bcrypt");
// const axios = require("axios");
// const jwt =require ('jsonwebtoken')
// const{sendMail} = reqire("../helpers/sendMail")


// function generateOtp(){
//     return Math.floor(100000 + Math.random() * 900000).toString()
// }
// exports.register = async (req, res) => {
//   try {
//     const { fullname, email, password } = req.body;

//     if (!fullname || !email || !password)
//       return res.status(400).json({ message: "Missing fields" });

//     // Check existing user MongoDB
//     const exists = await User.findOne({ email });
//     if (exists) return res.status(409).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const otp =generateOtp()
//     const otpExpiry= Date.now() + 5 * 60 * 1000
  

//     const user = await User.create({
//       fullname,
//       email,
//       password: hashedPassword,
//       otp,
//       otpExpiry
//     });
//     await sendMail({
//       to: email,
//       subject: "Verify your Email",
//       html: `<h1>Your OTP is :${otp}</h1>`
//     })
//     // Send to .NET API
//     // try {
//     //   await axios.post("http://localhost:5069/api/Users", {
//     //     fullName: fullname,
//     //     emailAddress: email,
//     //     password: password,
//     //     confirmPassword: password
//     //   });
//     // } catch (err) {
//     //   console.log("Failed to save in .NET:", err.message);
//     // }

//     return res.status(201).json({
//       message: "User registered successfully",
//       data: {
//         fullname,
//         email,
//         isVerified: false
//       }
//     });

//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.login = async (req,res) => {
//   try {
//     const {email,password}= req.body
//     //check empty fields
//     if(!email || !password){
//       return res.status(400).json({message:"Email and password are required"})
//     }
//     //check existance
//     const user=await User.findOne({email})

//     if(!user){
//       return res.status(401).json({message:"Invalid email or password"})
//     }
//     //compare paasword
//     const isMatch=await bcrypt.compare(password, user.password)
//     if(!isMatch){
//       return res.status(401).json({message:"Invalid email or password"})
//     }

//     //generate jwt
//     const token = jwt.sign(
//       { id: user._id, email:user.email},
//       process.env.JWT_SECRET,
//       {expiresIn:"1d"}
//     )
//     return res.json({
//         message:"Login successful",
//         token,
//          user:{id: user._id,
//           email:user.email,
//           fullName: user.fullName
//          }
//     })
//   } catch (err) {
//       console.error(err);
//       return res.status(500).json({message:"Internal server error"})
//   }
// }


// exports.confirmEmail =async (req,res)=>{
//   try{
//     const { email, otp }= req.body
//     const user=await User.findOne({email})
//     if(!user) return res.status(400).json({message:"invalid OTP"})
//   }
// };




// const axios = require("axios");
// const { response } = require("express");

// exports.register = async (req, res) => {
//   try {
//     const { fullName, emailAddress, password, confirmPassword } = req.body;

//     if (!fullName || !emailAddress || !password || !confirmPassword) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//   // joks .NET
//     const response = await axios.post(
//       "https://emergency.runasp.net/api/Users/register",
//       {
//         fullName,
//         emailAddress,
//         password,
//         confirmPassword,
//       }
//     );

//     return res.json({
//       success: true,
//       message: "User registered successfully",
//       data: response.data,
//     });

//   } catch (err) {
//     console.error(err.response?.data || err.message);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to register user via .NET API",
//       error: err.response?.data || err.message,
//     });
//   }
// };

// exports.login = async (req,res) => {
//   try{
//     const { emailAddress, password}= req.body
// if(!emailAddress || !password){
//   return res.status(400).json({message:"Email and Password are required"})
// }
// const response = await axios.post(
//   "https://emergency.runasp.net/api/users/login",
//   { emailAddress , password}
// )

//   return res.json ({
//     success:true,
//     message:"logiin successful",
//     data: response.data
//   })

// }catch(err){
//   console.error(err.response?.data || err.message)

//   return res.status(500).json({
//     success:false,
//     message:"Faild to login via .NET API",
//     error :err.response?.data || err.message,
//   })
    
// }

//   



  //import jwt from "jsonwebtoken"
  //import bcrypt from "bcryptjs"
  //const SECRET_KEY = "abdalla_super_secret"
  


import axios from "axios";
  import { postToDotNet } from "../services/dotnet.service.js";


const DOTNET_API = "https://emergency.runasp.net/api";

export const login = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { emailAddress, password } = req.body;

    if (!emailAddress || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    const response = await axios.post(
      `${DOTNET_API}/Users/login`,
      {
        emailAddress: emailAddress,
        password: password
      }
    );

    return res.status(200).json(response.data);

  } catch (error) {
    console.log("LOGIN ERROR:", error.response?.data || error.message);

    return res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "Login failed"
    });
  }
};



export const register = async (req, res) => {
  try {
    const { fullName, emailAddress, password, confirmPassword } = req.body;

    if (!fullName || !emailAddress || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match"
      });
    }

    const response = await axios.post(
      `${DOTNET_API}/Users/register`,
      {
        fullName,
        emailAddress,
        password,
        confirmPassword
      }
    );

    return res.status(201).json(response.data);

  } catch (error) {
    console.log("REGISTER ERROR:", error.response?.data || error.message);

    return res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "Registration failed"
    });
  }
};
const getAuthHeader = (req)=> {
  const token = req.headers.authorization.split(" ")[1]
  return{
    headers: {
        Authorization: `Bearer ${token}`
    }
  }
}


export const completeProfile = async (req, res) => {
  try {

    const { emailAddress, nationalId, birthDate, gender, city, phoneNumber } = req.body;

    const response = await axios.post(
      `${DOTNET_API}/Users/complete-profile`,
      {
        
          emailAddress,
          nationalId,
          birthDate,
          gender,
          city,
          phoneNumber
        
      },
      getAuthHeader(req)
    );

    return res.status(200).json(response.data);

  } catch (error) {

    console.log("COMPLETE PROFILE ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      message: "Failed to complete profile"
    });
  }
};


// export const register = async (req, res) => {
//   try {
//     const data = await postToDotNet("/Users/register", req.body);

//     return res.json({
//       success: true,
//       message: "User registered successfully",
//       data
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Register failed",
//       error: error.response?.data || error.message
//     });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const data = await postToDotNet("/Users/login", req.body);

//     return res.json(data//{
//       //success: true,
//       //message: "Login successful",
//       //data
//     //}
//     );

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Login failed",
//       error: error.response?.data||error.message
//     });
//   }
// };