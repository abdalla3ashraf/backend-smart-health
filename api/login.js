// import axios from "axios"
// export default  async function handler (req, res)  {
//   if(req.method !=="POST")
//     return res.status(405).json({message:"method not allowed"})
// try{
//     const { emailAddress, password}= req.body
// if(!emailAddress || !password){
//   return res.status(400).json({message:"Email and Password are required"})
// }
// const response = await axios.get(
//   "https://emergency.runasp.net/api/users/login",
//   //{ emailAddress , password}
// )
//     const users= response.data
//     const user= users.find(
//         (u)=>
//             u.emailAddress===emailAddress && u.password===password
//     )
//     if(!user){
//         return res.status(401).json({message:"Invalid credentials"})
//     }
//   return res.json ({
//     success:true,
//     message:"logiin successful",
//     //data: response.data
//     user,
//   })

// }catch(err){
//   //console.error(err.response?.data || err.message)
   
//   return res.status(500).json({
//     success:false,
//     message:"Faild to login via .NET API",
//     error :err.response?.data || err.message,
//   })
    
// }

//   }