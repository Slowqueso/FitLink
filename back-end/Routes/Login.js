import express from "express";
import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserSession from "../Models/UserSession.js";
import nodemailer from "nodemailer";
import OTPModel from "../Models/OTPModel.js";
const Router = express.Router();

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

Router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (!username || username === "" || password === "" || !password) {
    return res.status(400).send("All fields are not entered");
  }
  User.findOne({ username }).then(async (user) => {
    if (user) {
      const userFlag = await bcrypt.compare(password, user.password);
      if (!userFlag) {
        res.status(400).json({ msg: "Incorrect Password", type: "password" });
      } else {
        const token = generateToken(user._id);
        const session = await UserSession.findOne({ username: user.username });
        if (session) {
          if (user.twoFactor) {
            const { email } = user;
            const OTP = Math.floor(Math.random() * 899999 + 100000);
            async function main() {
              let transporter = nodemailer.createTransport({
                service: "Gmail",
                secure: false,
                auth: {
                  user: process.env.EMAIL,
                  pass: process.env.EPASS,
                },
              });

              let info = await transporter.sendMail({
                from: `"Fit Link" <${process.env.EMAIL}>`,
                to: `${email}`,
                subject: "This is from my Code",
                text: "Hello World",
                html: `<p style='color: red;'>Your OTP is <span style="font-weight: bold">${OTP.toString()}</span></p>`,
              });
            }
            main().catch(console.error);
            const updated = await UserSession.findOneAndUpdate({
              loginDate: Date.now(),
              token: token,
              twoFactor: user.twoFactor,
              OTP: OTP.toString(),
            });
            const otpStore = await OTPModel.findOneAndUpdate(
              { username: user.username },
              { username: user.username, otp: OTP.toString() },
              { new: true, upsert: true }
            );
            res.status(201).json({
              OTP: OTP,
              _id: user._id,
              username: user.username,
              email: user.email,
              isAdmin: user.isAdmin,
              fname: user.fname,
              dob: user.dob.day + "-" + user.dob.month + "-" + user.dob.year,
              token: token,
              success: true,
              profileImage: user.profileImage,
            });
          } else {
            const updated = await UserSession.findOneAndUpdate({
              loginDate: Date.now(),
              token: token,
              twoFactor: user.twoFactor,
            });
            res.status(201).json({
              _id: user._id,
              username: user.username,
              email: user.email,
              isAdmin: user.isAdmin,
              fname: user.fname,
              dob: user.dob.day + "-" + user.dob.month + "-" + user.dob.year,
              token: token,
              success: true,
              profileImage: user.profileImage,
            });
          }
        } else {
          UserSession.create(
            {
              username: user.username,
              email: user.email,
              token: token,
              twoFactor: user.twoFactor,
            },
            (err, data) => {
              if (err) {
                console.log(err);
                res.status(400).json({ msg: "Some Error Occured" });
              } else {
                res.status(201).json({
                  _id: user._id,
                  username: user.username,
                  email: user.email,
                  isAdmin: user.isAdmin,
                  fname: user.fname,
                  dob:
                    user.dob.day + "-" + user.dob.month + "-" + user.dob.year,
                  token: token,
                  success: true,
                  profileImage: user.profileImage,
                });
              }
            }
          );
        }
      }
    } else {
      res.status(400).json({ msg: "User not found", success: false });
    }
  });
});

Router.get("/", (req, res) => {
  User.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
export default Router;
