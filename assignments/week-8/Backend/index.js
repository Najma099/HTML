import express from "express";
import rootRouter from "./src/routers/index.route.js";
import cors from "cors";
import config from "./config.js";
import { connectDB } from "./db.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.json({ Key: "HII" });
});

app.use('/api/v1', rootRouter);
app.use((err,req, res,next) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

connectDB().then(() => {
  app.listen(config.server.port, () => {
    console.log(`Server listening on port ${config.server.port}`);
  });
}).catch((err) => {
  console.error("Could not start server:", err);
});
