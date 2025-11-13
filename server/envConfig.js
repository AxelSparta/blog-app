import dotenv from 'dotenv'

// Loads .env file contents into process.env
dotenv.config()

export const PORT = process.env.PORT
export const DB_URI = process.env.DB_URI
export const CLOUD_NAME = process.env.CLOUD_NAME
export const API_KEY = process.env.API_KEY
export const API_SECRET = process.env.API_SECRET
export const JWT_KEY = process.env.JWT_KEY
export const ORIGIN = process.env.ORIGIN
