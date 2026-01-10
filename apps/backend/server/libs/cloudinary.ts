import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs-extra'
import { API_KEY, API_SECRET, CLOUD_NAME } from '../envConfig.js'

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
})

export const uploadImage = async (filePath: string): Promise<any> => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'posts'
  })
  await fs.remove(filePath)
  return result
}

export const deleteImage = async (publicId: string): Promise<any> => {
  return await cloudinary.uploader.destroy(publicId)
}
