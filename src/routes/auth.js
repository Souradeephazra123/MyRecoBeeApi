import express from "express";
import crypto from "crypto";
const authRouter = express.Router();
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const DEFAULT_ID = 1;
let OTP, user;
// Generate a 256-bit (32-byte) secret
// let JWT_SECRET = crypto.randomBytes(32).toString("hex");

async function getLatestID() {
  //-id sort in decending order
  //so here we get highest value
  const latest = await User.findOne().sort("-id");
  if (!latest) {
    return DEFAULT_ID;
  }

  return latest.id + 1;
}

//signup
authRouter.post("/signup", async (req, res) => {
  try {
    const { username, number } = req.body;

    const extractedNumber = number.slice(-10);

    //number validation
    const regex = /[^0-9]/g;
    if (regex.test(extractedNumber)) {
      res.status(400).json({
        msg: "Invalid mobile number",
      });
    }

    //finding at iorst if  the user exist with this mobile number
    const existNumber = await User.findOne({ number });
    if (existNumber) {
      return res.status(400).json({
        msg: "User with this mobile number is already exist! please enter different number",
      });
    }

    //if user not exist create an user
    user = new User({
      id: await getLatestID(),
      username,
      number,
    });

    //creating otp
    let digits = "0123456789";
    OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    console.log(`Your otp is ${OTP}`);
    res.status(200).json({
      msg: "OTP send sucessfully",
    });
  } catch (error) {
    // If an error occurs, ensure no response was sent before
    if (!res.headersSent) {
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  }
});

//verify
authRouter.post("/signup/verify", async (req, res) => {
  const { otp } = req.body;
  console.log(user);
  if (otp === OTP) {
    const token = jwt.sign(
      { id: getLatestID(), username: user.username, number: user.number },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    user = await user.save();
    res.status(200).json({
      msg: "User is verified",
      token,
    });
  } else {
    return res.status(400).json({
      msg: "Invalid OTP",
    });
  }
});

//signin
let signinUser;
authRouter.post("/signin", async (req, res) => {
  const { number } = req.body;
  signinUser = await User.findOne({ number });
  if (!signinUser) {
    return res.status(400).json({
      msg: "User not found with this number",
    });
  }
  let digits = "0123456789";
  OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  console.log(`Your otp is ${OTP}`);
  res.status(200).json({
    msg: "OTP send successfully",
  });
});
//signin verify

//verify
authRouter.post("/signin/verify", async (req, res) => {
  try {
    const { otp } = req.body;
    // console.log(signinUser);
    if (otp === OTP) {
      const token = jwt.sign(
        { number: signinUser.number },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      user = await signinUser.save();
      res.status(200).json({
        msg: "User is verified",
        token,
      });
    } else {
      return res.status(400).json({
        msg: "Invalid OTP",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "An error occurred",
      error: error.message,
    });
  }
});

// A new endpoint for token refresh
authRouter.post("/token/refresh", async (req, res) => {
  try {
    const { token } = req.body;
    // Verify the token to ensure it's valid but expired
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: "Invalid token" });
      }
      // Create a new token with the same payload but a new expiration time
      const newToken = jwt.sign(
        { id: decoded.id, username: decoded.username, number: decoded.number },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ token: newToken });
    });
  } catch (error) {
    res.status(500).json({ msg: "An error occurred", error: error.message });
  }
});

export { authRouter };
