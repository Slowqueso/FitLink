import express from "express";
import OTPModel from "../Models/OTPModel.js";
const Router = express.Router();

Router.post("/", async (req, res) => {
  const { OTP, username } = req.body;
  try {
    const otpValue = await OTPModel.findOne({ username: username });
    if (OTP === otpValue.otp) {
      res.status(200).json({ flag: true });
    } else {
      res.status(400).json({ flag: false, msg: "Incorrect OTP!" });
    }
  } catch (err) {
    res.status(400).json({ msg: "Some Error Occured! Try Again Later!" });
  }
});
export default Router;
