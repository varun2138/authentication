import connectDB from "./db/index.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(
    () => {
      app.get("/", (req, res) => {
        res.send("hello");
      });
      app.listen(process.env.PORT || 5000, () => {
        console.log(`App is listening at port ${process.env.PORT}`);
      });
    },
    // Global Error Handler
    app.use((err, req, res, next) => {
      const statusCode = err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(statusCode).json({
        success: false,
        statusCode,
        message,
      });
    }),

    app.on("error", (error) => {
      console.log("ERROR :", error);
      throw new Error(error.message);
    })
  )
  .catch((err) => {
    console.log("MongoDB connection failed !!!", err);
  });
