import express from "express";
import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import UserSession from "../Models/UserSession.js";
import OTPModel from "../Models/OTPModel.js";

const Router = express.Router();

Router.post("/", async (req, res) => {
  const { password, username } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      const passVerification = await bcrypt.compare(password, user.password);
      if (passVerification) {
        if (!user.twoFactor) {
          const flag = await User.findOneAndUpdate(
            { username: username },
            { twoFactor: true }
          );
          res.status(200).json({
            msg: "Two Factor Enabled! Your Account is now Secure.",
          });
        } else {
          const flag = await User.findOneAndUpdate(
            { username: username },
            { twoFactor: false }
          );
          res.status(200).json({
            msg: "Two Factor Disabled.. but your account might be vulnerable now!",
          });
        }
      } else {
        res.status(400).json({ msg: "Incorrect password!" });
      }
    }
  } catch (err) {
    res.status(400).json({ msg: "Some Error Occured!" });
  }
});
export default Router;
