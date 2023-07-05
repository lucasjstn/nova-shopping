import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './src/app.js'

dotenv.config({ path: "./config.env" })

mongoose.set("strictQuery", false)
const PORT = process.env.PORT || 3001

mongoose.connect(process.env.DATABASE_CLOUD, {usenewurlparser: true})
.then(()=> {
    console.log("Database connected")
  })
.catch(error => {
    console.log(error)
  })

const server = app.listen(PORT, ()=> {
  console.log(`Server is running at PORT ${PORT}`)
})
 
