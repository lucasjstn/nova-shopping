import express from "express";
import authRoute from "./routes/authRoute.js"
import morgan from "morgan";
import CustomError from "./utils/CustomError.js";
import globalErrorHandler from "./controllers/errorController.js";

export const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use("/api/v1/auth", authRoute);

app.all("*", (req, res, next)=> {

  // res.status(404).json({
  //   status: "failed",
  //   message: "Can't find route"
  // })

  // const err = new Error(`Cant find ${req.originalUrl} on the server`);
  //
  // err.status = "fail";
  // err.statusCode = 404;

  const err = new CustomError(`Can't find ${req.originalUrl} on this server.`, 404);

  next(err);
});

app.use(globalErrorHandler);
