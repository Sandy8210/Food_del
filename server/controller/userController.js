import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// LOGIN USER

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(202)
        .json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(202)
        .json({ success: false, message: "Incorrect Password" });
    } else {
      const token = createToken(user._id);
      res
        .status(200)
        .json({ success: true, message: "Login successful", token });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(202)
      .json({ success: false, message: "Login Failed try again!" });
  }
};

//  CREATE A TOKEN

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// REGISTER USER
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    // Checking user existence
    const user = await userModel.findOne({ email });

    if (user) {
      return res
        .status(202)
        .json({ success: false, message: "User already exists" });
    }

    // VALIDATING EMAIL FORMAT

    if (!validator.isEmail(email)) {
      return res
        .status(202)
        .json({ success: false, message: "Please enter valid email" });
    }

    //  VALIDATING STRONG PASSWORD

    if (password.length < 6) {
      return res
        .status(202)
        .json({ success: false, message: "Please enter a strong passsword" });
    }

    // HASHING USER PASSWORD

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const userData = await newUser.save();
    const token = createToken(userData._id);

    res
      .status(200)
      .json({ success: true, message: "Resiter Successfully", token });
  } catch (error) {
    console.log(error);
    res.status(202).json({ success: false, message: "Registration failed" });
  }
};

export { loginUser, registerUser };
