import User from '../models/User.js'
import validator from "validator"
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/error/AppError.js'
import jwt from 'jsonwebtoken'


export const signUp = catchAsync (async (req, res, next) => {
 
  const password = req.body.password;
  const confirmPassword = req.body.confirmpassword
  const strongPassword = validator.isStrongPassword(password, {
    minLowercase: 1,
    minUppercase: 0,
    minSymbols: 0,
    minNumbers: 1,
  })

  if(!strongPassword) {
    res.status(400).json({
        message: "weak password"
    })
    return;
  }

 if(password !== confirmPassword) {
    res.status(400).json({
        message: "please asdfkksaconfirm your password"
    })
    return;
  }

  const user = await User.findOne({ username: req.body.username });

  if(user) {
    next(new AppError("user already exists", 400))
  }

  const newUser = await User.create(req.body)

  if(!newUser) {
    next(new AppError("user not created", 400))
  }

  const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES_IN})

  console.log(process.env.JWT_EXPIRES_IN)

  res.status(200).json({
    message: "created"
  })

})

