import express from "express";
import session from "express-session"
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import patientRoutes from "./routes/patientinfo.routes.js"
import patientinfoRoutes from "./routes/patientinfo.routes.js";
import homeRoutes from "./routes/home.routes.js"
import passport from "passport";
import "./config/passport.js"

console.log("passport file loaded");


const app = express()

// app.use (cors({
//     origin: "*"
// })) 
// app.js

// ...
app.use(cors({
  origin: "*", // في مابعد حدد دومين الويب ودومين الـ API
  credentials: true
}));

// لازم الترتيب ده:
app.use(express.json());
app.use(session({
    secret:"supersecretkey",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize()); 
app.use(passport.session())


app.use("/auth",authRoutes)
app.use("/user",userRoutes)
app.use("/patient",patientRoutes)
app.use("/api/patientinfo",patientinfoRoutes)
app.use("/api/patient",patientinfoRoutes)

app.get("/test",(req,res)=>{
    console.log("server work");
    res.send("ok")
    
})
app.get("/", (req, res) => {
  res.send("API is running");
});


app.use("/home",homeRoutes)

//console.log(passport._strategies);

export default app;