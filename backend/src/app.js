import express from 'express'
import morgan from 'morgan'
import authRoute from './routes/authRoute.js'
import  globalErrorHandler  from './utils/error/globalErrorHandler.js'
import AppError from './utils/error/AppError.js'
const app = express()

app.use(express.json())
// app.use(morgan('dev'))
app.use("/api/v1/auth", authRoute)

app.all("*", (req, res, next) => {
  console.log("caindo aqui")
//   console.log(err)
  const error = new AppError("Route is not defined", 404)
  next(error)
})

app.use(globalErrorHandler)

export default app;
