import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import axios from "axios";
import { response } from "express";

const DOTNET_API = "https://emergency.runasp.net/api";

// passport.serializeUser((user, done) => {
//   done(null, user);
// }); 

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

/* ========== GOOGLE ========== */

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID, 
  clientSecret:  process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
  
  // scope:["profile","email"]
  
},
async (accessToken, refreshToken, profile, done) => {
  try{
// const userData = {
//     fullName: profile.displayName,
//     emailAddress: profile.emails[0]?.value,
//     provider: "Google"
//   };
  const response = await axios.post(`${DOTNET_API}/Users/social-login`,

    {
      provider: "Google",
      token: accessToken
    }
    
  );
return done(null,response.data)
//console.log("DOTNET RESPONSE:",response.data);
   }catch(error){
   console.log("sosial login error",error.response?.data || error.messsage);
    return done(error, null);
   }
  
}));
  



/* ========== FACEBOOK ========== */

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL:`${process.env.BASE_URL}/auth/facebook/callback`,
  profileFields: ["id", "displayName", "emails"]
},
async (accessToken, refreshToken, profile, done) => {
   
  // const userData = {
  //   fullName: profile.displayName,
  //   emailAddress: profile.emails[0]?.value,
  //   provider: "Facebook"
  // };
   try{
  const response = await axios.post(`${DOTNET_API}/Users/social-login`, 
    {
      provider: "Facebook",
      token: accessToken
    }
    
    
  );

console.log("DOTNET RESPONSE:",response.data);
   }catch(error){
    console.log(error.response?.data || error.messsage);
    return done(null, response.data);
   }
  
}));