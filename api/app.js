import express from "express";
import postRoute  from "./routes/post.js";
import authRoute  from "./routes/auth.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";
import testRoute from "./routes/test.js";
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js";

const app = express();
dotenv.config();


app.use(cors({origin:process.env.CLIENT_URL, credentials:true}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}!`);
});