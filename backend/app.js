import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";
import path from "path";

import userdb from "./models/UserSchema.js";
import session from "express-session";
import passport from "passport";
import OAuth2Strategy from "passport-google-oauth2";


//dotenv.config({ path: "./config/config.env" });
const app = express();

const port = process.env.PORT || 5000;

connectDB();

// const allowedOrigins = [
//   "https://main.d1sj7cd70hlter.amplifyapp.com",
//   "https://expense-tracker-app-three-beryl.vercel.app",
//   // add more origins as needed
// ];

// Middleware
app.use(express.json());
app.use(
  cors()
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(session({
//   secret:"dsjhcbsjh78787",
//   resave:false,
//   saveUninitialized:true
// }))

// passport.use(
//   new OAuth2Strategy.Strategy({
//       clientID:"client_id",
//       clientSecret:"secret_key",
//       callbackURL:"/auth/google/callback",
//       scope:["profile","email"]
//   },
//   async(accessToken,refreshToken,profile,done)=>{
//       try {
//           let user = await userdb.findOne({email:profile.email});

//           if(!user){
//               user = new userdb({
//                 email:profile.email,
//                   name:profile.displayName,
//                   // password:
//               });

//               await user.save();
//           }

//           return done(null,user)
//       } catch (error) {
//           return done(error,null)
//       }
//   }
//   )
// )


// passport.serializeUser((user,done)=>{
//   done(null,user);
// })

// passport.deserializeUser((user,done)=>{
//   done(null,user);
// });


// app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));
// console.log("enteres");
// app.get("/auth/google/callback",passport.authenticate("google",{
//     successRedirect:"http://localhost:3000/",
//     failureRedirect:"http://localhost:3000/"
// }))


// app.get("/login/sucess",async(req,res)=>{

//   if(req.user){
//       res.status(200).json({message:"user Login",user:req.user})
//   }else{
//       res.status(400).json({message:"Not Authorized"})
//   }
// })

// Router
app.use("/api/v1", transactionRoutes);
console.log("enterd");
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
