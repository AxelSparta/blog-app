import cloudinary, { v2 } from 'cloudinary'
import { API_KEY, API_SECRET, CLOUD_NAME } from '../envConfig.js'

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
})

export const uploadImage = async filePath => {
  return await v2.uploader.upload(filePath, {
    folder: 'posts'
  })
}

export const deleteImage = async publicId => {
  return await v2.uploader.destroy(publicId)
}
