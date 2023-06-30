import mongoose from "mongoose";

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
    maxlength: [30, "Your username can't take more than 30 characters."]
  },
  password: {
    type: String,
    require: [true, "You need to set a password."],
    minlength: [8, "Your password can't have less than 8 characters."], 
    maxlength: [18, "Your password can't take more than 18 characters."]
  },
  confirmPassword: {
    type: String,
    require: [true, "Please confirm your password"],
    minlength: [8, "Your password can't have less than 8 characters."], 
    maxlength: [18, "Your password can't take more than 18 characters."]
  }
})

const User = mongoose.model("User", userSchema);

export default User;
