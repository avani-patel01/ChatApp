import express from "express";
import { createServer } from "http";
import cors from "cors";
import { router } from "./routes/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import socketInit from "./socket/index.js";

dotenv.config();
mongoose.connect(process.env.MONGOOSE_URL);

const app = express();
const server = createServer(app);
socketInit(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/", router);

server.listen(5000, () => {
  console.log("server is running on port 5000");
});

// username:avani
// password:kMuiNuBYEIftmkjJ
// mongoose :mongodb+srv://avani:kMuiNuBYEIftmkjJ@chat.ohxcgby.mongodb.net/?retryWrites=true&w=majority&appName=Chat
