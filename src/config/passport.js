import dotenv  from "dotenv";
dotenv.config()

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import axios from "axios";
//import { response } from "express";

const DOTNET_API = "https://emergency.runasp.net/api";
//console.log("GOOGLE_CLIENT_ID =", process.env.GOOGLE_CLIENT_ID);
// passport.serializeUser((user, done) => {
//   done(null, user);
// }); 

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

/* ========== GOOGLE ========== */

// config/passport.js
// ... (البداية زي ما هي)
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/google/callback`, // تأكد إن الـ BASE_URL هو لينك فيرسيل
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // بنبعت التوكن اللي جه من جوجل لزميلك بتاع الـ .NET
      const response = await axios.post(`${process.env.DOTNET_API}/Users/social-login`, {
        provider: "Google",
        token: accessToken 
      });

      // البيانات اللي راجعة من الـ .NET (اللي فيها الـ JWT بتاعكم)
      return done(null, response.data); 
    } catch (error) {
      console.error("Google Login Error:", error.response?.data || error.message);
      return done(error, null);
    }
  }
));
  



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