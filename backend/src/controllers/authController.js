import User from "../models/userModel.js";

export const signUp = async (request, response, next) => {

  const newUser = await User.create(request.body);

  console.log(request.body);
  response.status(200).json({
    status: "success",
    message: "User created."
  })


}
