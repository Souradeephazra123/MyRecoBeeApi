import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  otp: {
    type: Number,
  },
});

export default mongoose.model("User", UserModel);
