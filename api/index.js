import express from "express"
import dotenv from "dotenv"
import connectDB from "./connectDB.js"

dotenv.config()

//connecting Database
connectDB()

const app = express()


//middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"

    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

