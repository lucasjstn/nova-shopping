
import mongoose from 'mongoose'

export const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "item field cannot be empty"],
    lowercase: true,
    minlength: [3, "item must contain at least 3 characters"],
    maxlength: [10, "item name cannot be longer than 10 characters"]
  },
  lot: {
    type: Number,
    require: [true, "item lot must be defined"],
    minlength: [10, "lot number must be 10 characters long"],
    maxlength: [10, "lot number must be 10 characters long"],
  },
  priceInCents: {
    type: Number,
    require: [true, "item price must be defined"],
    maxlength: [12, "item price too long"] 
  },
  weightInGrams: {
    type: Number,
    maxlength: [15, "item weight too long"],
  },
  quantity: {
    type: Number,
    maxlength: [15, "item quantity too big"]
  }
})

const Item = mongoose.model("Item", itemSchema)

export default Item;
