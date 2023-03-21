import mongoose from "mongoose";

const otp = mongoose.Schema({
  username: String,
  otp: String,
  createdAt: {
    type: Date,
    expires: "5m",
    default: Date.now(),
  },
});

export default mongoose.model("otp", otp);
