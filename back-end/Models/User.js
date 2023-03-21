import mongoose from "mongoose";

const user = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    sparse: true,
  },
  register_date: {
    type: Date,
    default: Date,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  dob: {
    day: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
    required: false,
    default: null,
  },
  desc: {
    type: String,
    default: "",
  },
  twoFactor: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("user", user);
