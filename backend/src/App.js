import express from "express";

export const app = express();


app.all("*", ()=> {
  res.status(404).json({
    status: "failed",
    message: "Can't find route"
  })
})
