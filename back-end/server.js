import express from "express";
import mongoose from "mongoose";
import navData from "./Models/NavbarSchema.js";
import dotenv from "dotenv";
dotenv.config();
import Login from "./Routes/Login.js";
import navbar from "./Routes/Navbar.js";
import Signup from "./Routes/Signup.js";
import Verify from "./Routes/EmailVerification.js";
import Username from "./Routes/UsernameVerification.js";
import AccountPreferences from "./Routes/AccountPreferences.js";
import GetProfilePic from "./Routes/GetProfilePicture.js";
import cors from "cors";
import ChangePassword from "./Routes/ChangePassword.js";
import GetSessionOTP from "./Routes/GetSessionOTP.js";
import TwoFactorPass from "./Routes/TwoFactorAuth.js";

const app = express();
const port = process.env.PORT;
const connection_url = process.env.MONGOOSE_CONNECTION;

//Midlewares
app.use(express.json());
app.use(cors());
app.use("/pfpUploads", express.static("pfpUploads"));

//DB Config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.set("useFindAndModify", false);
//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello World!"));
app.use("/signup", Signup);
app.use("/navbar", navbar);
app.use("/emailverification", Verify);
app.use("/usernameverification", Username);
app.use("/login", Login);
app.use("/accUpdate", AccountPreferences);
app.use("/getProfile", GetProfilePic);
app.use("/changePassword", ChangePassword);
app.use("/otpVerification", GetSessionOTP);
app.use("/twoFactorPassVerification", TwoFactorPass);
//Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
