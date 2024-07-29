import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //to create a new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    //check if user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //check if password is correct

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //generate token and sent to user
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      { id: user.id, 
        isAdmin:false,
     },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const{password:userPassword,...userInfo} = user
    //set cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,                   //enable in production
        sameSite: "none",
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login" });
  }
};
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout success" });
};
