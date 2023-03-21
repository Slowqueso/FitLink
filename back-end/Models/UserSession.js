import mongoose from "mongoose";

const userSession = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  loginDate: {
    type: Date,
    default: Date.now(),
  },
  token: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
  twoFactor: {
    type: Boolean,
    default: false,
  },
  OTP: {
    type: String,
    default: "",
    index: {
      expires: "5m",
    },
  },
});

export default mongoose.model("userSessions", userSession);
