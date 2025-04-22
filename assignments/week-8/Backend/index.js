import express from "express";
import rootRouter from "./routers/index.js";
import cors from "cors";
import config from "./config.js";
import { connectDB } from "./db.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', rootRouter);

connectDB().then(() => {
  app.listen(config.server.port, () => {
    console.log(`Server listening on port ${config.server.port}`);
  });
}).catch((err) => {
  console.error("Could not start server:", err);
});
