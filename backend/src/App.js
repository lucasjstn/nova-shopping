import express from "express";
import authRoute from "./routes/authRoute.js"
import morgan from "morgan";

export const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use("/api/v1/auth", authRoute);

app.all("*", (req, res, next)=> {
  res.status(404).json({
    status: "failed",
    message: "Can't find route"
  })
})
