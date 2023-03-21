import express from "express";
import User from "../Models/User.js";
import bcrypt from "bcryptjs";
const Router = express.Router();

Router.post("/", (req, res) => {
  const { email, password, username, toPassword } = req.body;
  const filter = { username: username };
  if (
    !email ||
    email === "" ||
    password === "" ||
    !password ||
    !username ||
    !toPassword
  ) {
    return res.status(400).json({ msg: "All fields are not entered" });
  }
  User.findOne({ username })
    .then(async (user) => {
      const userFlag = await bcrypt.compare(password, user.password);
      if (!userFlag) {
        res.status(400).json({ msg: "Incorrect Password!" });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(toPassword, salt, async (err, hash) => {
            console.log(hash);
            try {
              const update = { password: hash };
              const user = await User.findOneAndUpdate(filter, update);
              res.status(200).send("Password Changed!");
            } catch (err) {
              console.log(err);
              res.status(400).send("Error Occured!");
            }
          });
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ msg: "Some Error Occured!" });
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
