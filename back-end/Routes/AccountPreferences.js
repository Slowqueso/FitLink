import express from "express";
const Router = express.Router();
import User from "../Models/User.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "pfpUploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + file.originalname.split(".").pop());
    // cb(null, req.body.toFind + "." + file.originalname.split(".").pop());
    // User.findOne(finding)
    //   .then((user) => {
    //     id = user._id;
    //     console.log(id);
    //     cb(null, id + "." + file.originalname.split(".").pop());
    //   })
    //   .catch((err) => {
    //     console.log("error occured");
    //     console.log(err);
    //   });
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

Router.post("/", upload.single("profileImage"), async (req, res) => {
  console.log(req.body);
  const { username, desc, toFind } = req.body;
  const filter = { username: toFind };
  const update = {
    username,
    desc,
    profileImage: req.file.path,
  };
  if (filter.username === update.username) {
    User.findOneAndUpdate(filter, update).then((user) => {
      if (user) {
        res.status(200).json({
          username: update.username,
          desc: update.desc,
          profileImage: process.env.BACK_END + "/" + req.file.path,
        });
      }
    });
  } else {
    User.findOne({ username }).then((user) => {
      if (user) {
        res.status(400).json({ msg: "Username already taken" });
      } else {
        if (!username) {
          res.status(400).send("Username is required!");
        } else if (!/^[^\d!@#$%^&*_].[a-zA-Z0-9_]+$/g.test(username)) {
          res.status(400).send("Invalid Username");
        } else {
          User.findOneAndUpdate(filter, update).then((user) => {
            if (user) {
              res.status(200).json({
                username: update.username,
                desc: update.desc,
                profileImage: process.env.BACK_END + "/" + req.file.path,
              });
            }
          });
        }
      }
    });
  }
});

Router.get("/", async (req, res) => {
  const { username } = req.body;
  console.log(username);
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
