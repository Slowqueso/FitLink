import express from "express";
import User from "../Models/User.js";
import bcrypt from "bcryptjs";
const Router = express.Router();
import jwt from "jsonwebtoken";
import UserSession from "../Models/UserSession.js";

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};
Router.post("/", (req, res) => {
  const {
    email,
    register_date,
    password,
    username,
    fname,
    lname,
    day,
    year,
    month,
  } = req.body;

  if (
    !email ||
    email === "" ||
    password === "" ||
    !password ||
    !username ||
    !fname ||
    !lname ||
    !day ||
    !year ||
    !month
  ) {
    return res.status(400).json({ msg: "All fields are not entered" });
  }
  if (
    !/^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/i.test(
      email
    )
  ) {
    res.status(400).json({ msg: "Invalid email!" });
  }
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).send("User already exists");
    else {
      User.findOne({ username }).then((user) => {
        if (user)
          return res.status(400).send("Username is already being used!");
        else {
          const newUser = new User({
            email,
            register_date,
            password,
            username,
            fname,
            lname,
            dob: {
              day,
              month,
              year,
            },
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              User.create(newUser, async (err, data) => {
                if (err) {
                  console.log(err);
                  res.status(500).send("This wasn't complete!");
                } else {
                  const token = generateToken(newUser._id);
                  const session = await UserSession.create({
                    username: newUser.username,
                    email: newUser.email,
                    token: token,
                  });
                  res.status(201).json({
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    isAdmin: newUser.isAdmin,
                    fname: newUser.fname,
                    dob:
                      newUser.dob.day +
                      "-" +
                      newUser.dob.month +
                      "-" +
                      newUser.dob.year,
                    token: token,
                  });
                }
              });
            });
          });
        }
      });
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
