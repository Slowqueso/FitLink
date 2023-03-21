import express from "express";
const Router = express.Router();
import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import User from "../Models/User.js";

Router.post("/", (req, res) => {
  const OTP = Math.floor(Math.random() * 899999 + 100000);
  const values = req.body;
  const email = values.email;

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "User already exists!" });
    } else {
      if (!values.email) {
        res.status(400).send("Email Address Required");
      } else if (
        !/^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/i.test(
          values.email
        )
      ) {
        res.status(400).send("Invalid Email Address");
      } else {
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
            to: `${req.body.email}`,
            subject: "This is from my Code",
            text: "Hello World",
            html: `<p style='color: red;'>Your OTP is <span style="font-weight: bold">${OTP.toString()}</span></p>`,
          });
        }
        main().catch(console.error);
        res.status(200).json({ OTP, emailAccepted: true });
      }
    }
  });
});

export default Router;
