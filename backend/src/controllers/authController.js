import User from '../models/User.js'
import validator from "validator"
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/error/AppError.js'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'

const signToken = (id) => {
  return jwt.sign({id: id}, process.env.JWT_SECRET, { expiresIn:  process.env.JWT_EXPIRES_IN })
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)

  const cookieOptions = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN *24*60*60*1000),
    httpOnly: true
  }

  if(process.env.NODE_ENV === "production") {
    cookieOptions.secure = true
  }

  user.password = undefined

  res.status(200).json({ status: "sucess", data: { user: user, token: token }})
}

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

  // const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET, { expiresIn: "40d" })

  createSendToken(newUser, 201, res)

  // res.status(200).json({
  //   message: "created",
  //   token: token,
  // })

})

export const login = async (req, res, next) => {
  const { email, password } = req.body

  if(!email ||!password) {
    return next(new AppError("Please enter your email and password.", 401))
  }

  //without password
  // const user = await User.findOne({email})

  const user = await User.findOne({email}).select("+password")

  if(!user) {
    return next(new AppError("Invalid username or password", 401))
  }

  if(!(await user.passwordCheck(password, user.password))) {
    return next(new AppError("Invalid username or password", 401))
  }

  createSendToken(user, 200, res)
}

export const protectedRoute = catchAsync(async (req, res, next) => {
  console.log("protected route")

  let token 
  
  //Pre-process the authorization headers to obtain JWT
  // authorization-header: Bearer sdfkkfkkasdfkksfkk
  // ["Bearer", "sdfkkfkkasdfkksfkk"]
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    //obtain jwt using authorization headers
    token = req.headers.authorization.split(" ")[1]
  } else if (req.cookies.jwt) {
    //2 obtain jwt using cookies stored in the frontend
    token = req.cookies.jwt
  }

  if(!token) {
    return next(new AppError("You are not logged in", 401))
  }

  //decode the jwt
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  //check if the current user exists
  const currentUser = await User.findById(decoded.id)

  if(!currentUser) {
    return next(new AppError("unauthorized", 401))
  }

  next()
})
