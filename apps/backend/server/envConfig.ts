import dotenv from 'dotenv'

// Loads .env file contents into process.env
dotenv.config()

export const PORT = process.env.PORT as string
export const DB_URI = process.env.DB_URI as string
export const CLOUD_NAME = process.env.CLOUD_NAME as string
export const API_KEY = process.env.API_KEY as string
export const API_SECRET = process.env.API_SECRET as string
export const JWT_KEY = process.env.JWT_KEY as string
export const ORIGIN = process.env.ORIGIN as string
export const DOMAIN = process.env.NODE_ENV === 'production' ? 'blog-app-frontend-umber.vercel.app' : undefined
