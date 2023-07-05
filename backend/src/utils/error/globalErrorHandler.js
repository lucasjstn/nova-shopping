import AppError from './AppError.js'
import dotenv from 'dotenv'
dotenv.config({ path: "../../../config.env"})

const sendErrorForDev = (err, res) => {
  console.log("Dev error invoked")
  console.error(err)
  res.status(err.statusCode).json({
    prod: {
      status: err.status,
      message: err.message,
    },
    message: err.message,
    error: err,
    stack: err.stack
  })
}


const sendErrorForProd = (err, res) => {  
  console.log("Prod error invoked");

  console.log(err.isOperational);

  if(err.isOperational){
    console.log("Trusted user");

    // User is trusted
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {    
    console.log("Unknown user");

    // User is unknown
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }  
}

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(item => item.message)

  const message = `Invalid input data ${errors.join(". ")}`;

  return new AppError(message, 400)
}

const globalErrorHandler = (err, req, res, next) => {
  console.log("caiu aqui")

  err.status = err.status || "error";
  err.message = err.message || "Something went wrong";
  err.statusCode = err.statusCode || 500;

  if(process.env.NODE_ENV === "development") {
    // Development error responses
    sendErrorForDev(err, res)
  } else {
    // Production error responses
    // 1) Handling invalid database IDs
    if(err.name === "CastError"){
      err = handleCastErrorDB(err)
    }

    // 2) Handling duplicate fields
    if(err.code === 11000){
      err = handleDuplicateFieldDB(err)
    }

    // 2) Handling validation error
    if(err.name === "ValidationError"){
      err = handleValidationErrorDB(err)
    }

    sendErrorForProd(err, res)
  }
};

export default globalErrorHandler;
