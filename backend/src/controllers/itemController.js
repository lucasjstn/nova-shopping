import Item from '../models/Item.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/error/AppError.js'

export const createItems = catchAsync( async (req, res, next) => {
  console.log("items") 
  const item = Item.create(req.body)

  if(item){
    res.status(201).json({
      message: "created"
    })
  } else {
    return next(new AppError("xd", 401))
  }


})
