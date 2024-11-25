import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

// for limiting the json data
app.use(express.json({ limit: "16kb" }));

//
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public")); //serves static files like images from public directory.

app.use(cookieParser());
//routes import
import userRouter from "./routes/user.route.js";

// routes declaration
app.use("/api/v1/users", userRouter);

export default app;
