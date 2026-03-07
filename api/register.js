// import axios from ("axios");
// const { response } = require("express");

// export default  async function handler (req, res)  {
//   if(req.method !=="POST")
//     return res.status(405).json({message:"method not allowed"})
// try{
//     const { fullName, emailAddress, password, confirmPassword } = req.body;

//     if (!fullName || !emailAddress || !password || !confirmPassword) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // ابعت لصاحبك .NET
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

//   }