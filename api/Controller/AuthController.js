import { User } from "../Models/UserModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const RegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashPassword });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const UserLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // Generate Token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      "12345",
      { expiresIn: "100d" }
    );
    res
      .status(200)
      .json({ message: "User Login successfully", data: { token, email } });
  } catch (error) {
    res.status(500).json("Error to login customer");
  }
};
