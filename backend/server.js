import mongoose from "mongoose";;
import dotenv from "dotenv";

import { app } from "./src/App.js"

mongoose.set("strictQuery", false);

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT;

mongoose.connect(process.env.DATABASE_CLOUD, { usenewurlparser: true })
  .then(()=> {
    console.log("Database connected");
  })
  .catch(error => {
    console.log(error);
  })

const server = app.listen(PORT, ()=> {
  console.log(`Server is running at port ${PORT}`);
});

