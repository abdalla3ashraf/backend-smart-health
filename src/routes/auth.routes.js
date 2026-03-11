import express from "express";
import passport from "passport";
import { register, login ,completeProfile ,} from "../controllers/auth.controller.js";
import { getMyProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/complete-profile",verifyToken ,completeProfile)
router.get ("/my-profile",verifyToken,getMyProfile)


/* GOOGLE */
router.get("/google",
  //console.log("google route");
 
  passport.authenticate("google",{ scope : ["profile","email"]})
);

router.get("/google/callback",
  passport.authenticate("google", { session: false,
    failureRedirect:"/login"
  }),
  (req, res) => {
    //res.redirect("http://localhost:1550/dashboard.html?token=" + req.user.token);
    //  res.json({message: " login success",
    //   data: req.user,
  //     token: req.user.token,
  //  })
  const token = req.user.token
  res.redirect(process.env.FRONTEND_URL + "/dashboard.html?token=" + token)
  })

;

/* FACEBOOK */
router.get("/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get("/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    // res.redirect("http://localhost:1550/dashboard.html?token=" + req.user.token);
     res.redirect(process.env.FRONTEND_URL + "/dashboard.html?token=" + req.user.token);
  }
);


export default router;