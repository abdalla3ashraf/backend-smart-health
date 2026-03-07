import axios from "axios";

const DOTNET_API = "https://emergency.runasp.net/api";

export const postToDotNet = async (url, data) => {
  try{
  const response = await axios.post(`${DOTNET_API}${url}`, data);
  return response.data;
}catch(error){
  throw error.response?.data || error. message
}
}
export const getFromDotNet = async (url, token) => {
  const response = await axios.get(`${DOTNET_API}${url}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const putToDotNet = async (url, data,token)=>{
  const response = await axios.put (`${DOTNET_API}${url}`,data,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

/// دي فيها تعديل ممكن ارجعلو تاني