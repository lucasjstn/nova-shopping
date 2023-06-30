import express from "express";
import authRoute from "./routes/authRoute.js"
export const app = express();

app.use("/api/v1/auth", authRoute);

app.all("*", (req, res, next)=> {
  res.status(404).json({
    status: "failed",
    message: "Can't find route"
  })
})
