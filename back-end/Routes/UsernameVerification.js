import express from "express";
const Router = express.Router();
import User from "../Models/User.js";

Router.post("/", (req, res) => {
  const values = req.body;
  const username = values.username;
  User.findOne({ username }).then((user) => {
    if (user) {
      res.status(400).json({ msg: "Username already taken" });
      console.log("yes");
    } else {
      if (!values.username) {
        res.status(400).send("Username is required!");
      } else if (!/^[^\d!@#$%^&*_].[a-zA-Z0-9_]+$/g.test(values.username)) {
        res.status(400).send("Invalid Username");
      } else {
        res.status(200).send(true);
      }
    }
  });
});

export default Router;
