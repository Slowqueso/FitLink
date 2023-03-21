import express from "express";
const Router = express.Router();
import User from "../Models/User.js";
Router.post("/", async (req, res) => {
  const { username } = req.body;
  User.findOne({ username })
    .then((user) => {
      res
        .status(200)
        .json({ profileImage: process.env.BACK_END + "/" + user.profileImage });
    })
    .catch((err) => {
      res.status(400).json({ msg: "huh" });
    });
});

export default Router;
