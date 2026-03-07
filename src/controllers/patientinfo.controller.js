// const axios = require ("axios")


// exports.savePatientInfo  = async (req, res) =>{
//     try{
//         const{
//           fullName,
//           birthDate,
//           gender,
//           maritalStatus,
//           emailAddress,
//           phoneNumber,
//           allergies,
//           medicalHistory,
//           height,
//           weight
//         } = req.body
//         if(!fullName || !emailAddress || !phoneNumber){
//           return res.status(400).json({ message:"required fields missing"})
//         }

//         const response = await axios.post(
//           "https://emergency.runasp.net/api/users/patient",
//           {
//             fullName,
//             birthDate,
//             gender,
//             maritalStatus,
//             emailAddress,
//             allergies,
//             medicalHistory,
//             height,
//             weight
//           }
//         )
//         return res.json({
//           success:true,
//           message:"Patient info saved successgully",
//           data: response.data
//         })

//     }catch (err){
//       console.log(err.response?.data || err.message);
      
//       return res.status(500).json({
//         success:false,
//         message:"Failed to save patient info",
//         error: err.response?.data || err.message
//       })
//     }
//   } 


import axios from "axios";
import { getFromDotNet , putToDotNet} from "../services/dotnet.service.js";

export const savePatientInfo = async (req, res) => {
  try {
    const {
      fullName,
      birthDate,
      gender,
      maritalStatus,
      emailAddress,
      phoneNumber,
      allergies,
      medicalHistory,
      height,
      weight,
    } = req.body;

    if (!fullName || !emailAddress || !phoneNumber) {
      return res.status(400).json({ message: "required fields missing" });
    }

    const response = await axios.post(
      "https://emergency.runasp.net/api/users/patient",
      {
        fullName,
        birthDate,
        gender,
        maritalStatus,
        emailAddress,
        phoneNumber, // ⚠️ كنت ناسي تبعته للـ API
        allergies,
        medicalHistory,
        height,
        weight,
      }
    );

    return res.json({
      success: true,
      message: "Patient info saved successfully",
      data: response.data,
    });
  } catch (err) {
    console.log(err.response?.data || err.message);

    return res.status(500).json({
      success: false,
      message: "Failed to save patient info",
      error: err.response?.data || err.message,
    });
  }
};

export default {

  savePatientInfo
}
export const getPatientInfo = async (req, res)=>{
 try{
  const { id } = req.params

   const data = await getFromDotNet(`/Users/${id}`)
   return res.json({
    success:true,
    data
   })
 }catch (error){
  return res.status(500).json({
    success:false,
    message:"Failed to fetch patient info",
    error: error.response?.data || error.message
  })
 }
}

export const getProfile = async (req,res)=>{
  try{
    const token = req.headers.authorization?.split(" ")[1]
    const data = await getFromDotNet("/Users/profile",token)
    res.json(data)
  }catch (error){
   res.status(500).json({
    message:"Failed to fetch profile",
    error: error.response?.data || error.message
  })
}
}

export const updateProfile = async (req,res)=>{
  try{
    const token = req.headers.authorization?.split(" ")[1]
    const data = await getFromDotNet("/Users/profile",req.body,token)
    res.json({
      message: "Profile updated successfully",
      data
    })
  }catch (error){
   res.status(500).json({
    message:"Update Failed ",
    error: error.response?.data || error.message
  })
}
}