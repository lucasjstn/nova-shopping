import express from 'express'
import morgan from 'morgan'
import authRoute from './routes/authRoute.js'
import protectedRoute from './routes/exampleRoute.js'
import  globalErrorHandler  from './utils/error/globalErrorHandler.js'
import AppError from './utils/error/AppError.js'
import itemRoute from './routes/itemRoute.js'

const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/", protectedRoute)
app.use("/api/v1/", itemRoute)

app.all("*", (req, res, next) => {
  const error = new AppError("Route is not defined", 404)
  next(error)
})

app.use(globalErrorHandler)

export default app;
