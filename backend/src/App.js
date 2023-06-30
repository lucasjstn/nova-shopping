import express from "express";
import authRoute from "./routes/authRoute.js"
import morgan from "morgan";

export const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use("/api/v1/auth", authRoute);

app.all("*", (req, res, next)=> {

  // res.status(404).json({
  //   status: "failed",
  //   message: "Can't find route"
  // })

  const err = new Error(`Cant find ${req.originalUrl} on the server`);

  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Something went wrong";

  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message
  })
});
