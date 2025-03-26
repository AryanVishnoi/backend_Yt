import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

// if middleware is use we should use app.use
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// security practice -- We will use two ways to accept input into our application
// 1--> json
// 2--> url
app.use(express.json({
    limit: "16kb"
}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

// security practice -- to store some files on my server iotself
app.use(express.static("public"))

// routes import
import userRouter from './routes/user.routes.js'

// routes decleration
app.use("/api/v1/users", userRouter)

export {
    app
}