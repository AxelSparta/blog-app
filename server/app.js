import express from 'express'
// import postRouter from "./routes/posts.routes.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import { ORIGIN } from './envConfig.js'
import authRouter from './routes/auth.routes.js'
import postsRouter from './routes/posts.routes.js'
// import userRouter from './routes/users.routes.js'
const app = express()

// MIDDLEWARES (funciones que se ejecutan entre el procesamiento de los request y en envio de los responses)
app.use(
  cors({
    origin: ORIGIN,
    credentials: true
  })
)

// para entender el formato json
app.use(express.json())

// para poder subir archivos
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
  })
)

// para poder entender formularios
app.use(express.urlencoded({ extended: true }))

// para entender cookies
app.use(cookieParser())

// routes
app.use('/api/auth', authRouter)
app.use('/api/posts', postsRouter)
// app.use('/api/users', userRouter)

export default app
