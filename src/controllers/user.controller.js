import axios from "axios";



const DOTNET_API = "https://emergency.runasp.net/api"

const getAuthHeader = (req)=> {
  const token = req.headers.authorization.split(" ")[1]
  return{
    headers: {
        Authorization: `Bearer ${token}`
    }
  }
}

export const getProfile = async (req,res)=> {
  try{
    //const token = req.headers.authorization.split(" ")[1]

     const response= await axios.get(
       `${DOTNET_API}/Users/profile`,
       getAuthHeader(req)
     )
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    // )
    return res.status(200).json(response.data)
  }catch (error) {
    console.log("PROFILE ERROR:",error.response?.data || error.message);
    return res.status(500).json({message: "Failed to get profile"})
  }

}

export const getMeasurements = async (req,res)=> {
  try{
    

    const response= await axios.get(
      `${DOTNET_API}/Users/Measurements`,
       getAuthHeader(req)
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    )
    return res.status(200).json(response.data)
  }catch (error) {
    console.log(" Measurements ERROR:",error.response?.data || error.message);
    return res.status(500).json({message: "Failed to get Measurements"})
  }

}

export const getDoctors = async (req,res)=> {
  try{
    

    const response= await axios.get(
      `${DOTNET_API}/Users/my-doctors`,
       getAuthHeader(req)
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    )
    return res.status(200).json(response.data)
  }catch (error) {
    console.log(" DOCTORS ERROR:",error.response?.data || error.message);
    return res.status(500).json({message: "Failed to get doctors"})
  }

}

export const getAppointments = async (req,res)=> {
  try{
    

    const response= await axios.get(
      `${DOTNET_API}/Users/my-appointments`,
       getAuthHeader(req)
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    )
    return res.status(200).json(response.data)
  }catch (error) {
    console.log(" Appointments ERROR:",error.response?.data || error.message);
    return res.status(500).json({message: "Failed to get Appointments"})
  }

}

export const getWallet = async (req,res)=> {
  try{
    

    const response= await axios.get(
      `${DOTNET_API}/Users/Wallet`,
       getAuthHeader(req)
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    )
    return res.status(200).json(response.data)
  }catch (error) {
    console.log(" wallet ERROR:",error.response?.data || error.message);
    return res.status(500).json({message: "Failed to get wallet"})
  }

}