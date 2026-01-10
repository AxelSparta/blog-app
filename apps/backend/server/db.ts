import mongoose from 'mongoose'
import { DB_URI } from './envConfig.js'

// conexión a la base de datos
export const connectDB = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(DB_URI)
    console.log('connected!!')
  } catch (error) {
    console.log(error)
  }
}
