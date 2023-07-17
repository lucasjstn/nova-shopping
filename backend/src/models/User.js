import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'
import validator from 'validator'

dotenv.config({ path: "../../config.env" })

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please, enter your usernsme"],
    unique: true,
    lowercase: true,
    minlength: [3, "Your username can't be fewer than 3 characters."],
    maxlength: [12, "Your username can't take more than 12 characters."]
  },
  email: {
    type: String,
    require: [true, "Please, enter your email."],
    unique: true,
    lowercase: true,
    minlength: [10, "Your email can't have less than 10 characters."], 
    maxlength: [30, "Your username can't take more than 30 characters."],
    validate: [
      validator.isEmail,
      "Please enter a valid email."
    ]
  },
  password: {
    type: String,
    require: [true, "You need to set a password."],
    minlength: [8, "Your password can't have less than 8 characters."], 
    maxlength: [18, "Your password can't take more than 18 characters."],
    select: false
  },
  confirmPassword: {
    type: String,
    require: [true, "Please confirm your password"],
    minlength: [8, "Your password can't have less than 8 characters."], 
    maxlength: [18, "Your password can't take more than 18 characters."],
  },
  passwordChangedAt: {
    type: Date,
  }
})

userSchema.pre("save", async function(next) {
  if(!this.isModified("password")) return next()

  this.password = await bcryptjs.hash(this.password, 12)
  this.confirmpassword = "";
})

// userSchema.pre("save", async function(next) {
//   if(this.password !== this.confirmPassword) {
//     next()
//   }
// })

userSchema.methods.passwordCheck = async function (userEnteredPassword, password) {
 return await bcryptjs.compare(userEnteredPassword, password)
}

userSchema.pre("save", function(next) {
  this.passwordChangedAt = Date.now() - 1

  next()
})

const User = mongoose.model("User", userSchema)

export default User;
