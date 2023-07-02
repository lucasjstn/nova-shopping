import User from "../models/userModel.js";
import validator from "validator";
import CustomError from "../utils/CustomError.js";

const asyncErrorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(err => { next(err)});
  }
}

export const signUp = asyncErrorHandler( async (request, response, next) => {


  const strongPassword = validator.isStrongPassword(request.body.password, {
    minLowercase: 1,
    minUppercase: 0,
    minSymbols: 0,
    minNumbers: 1,
  })

  if(!strongPassword) {
    // response.status(400).json({
    //   status: "failed",
    //   message: "Please enter a password with minimum 8 characters length, a lower case letter and a number"
    // })
    const error = new CustomError("Please enter a password with minimum 8 characters length, a lower case letter and a number", 400)  
    next(error);
    return;
  }

  const password = request.body.password; 
  const confirmPassword = request.body.confirmPassword;

  if(password !== confirmPassword) {
    // response.status(400).json({
    //   status: "failed",
    //   message: "Please confirm your password."
    // })

    const error = new CustomError("Please confirm your password", 400);
    next(error);
    return;
  }

  const newUser = await User.create(request.body);

  console.log(request.body);
  response.status(200).json({
    status: "success",
    message: "User created."
  })


})
