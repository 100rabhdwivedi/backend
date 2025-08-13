import express from 'express'
import userRouter from './routes/user.route.js'
import todoRouter from './routes/todo.route.js'
import cookieParser from 'cookie-parser'
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth/users',userRouter)
app.use('/api/todos',todoRouter)

export default  app;