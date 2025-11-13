import { Schema, model } from 'mongoose'

// creando schema
const postSchema = new Schema({
  title: String,
  content: String,
  image: {
    url: String,
    public_id: String
  },
  createdAt: { type: Date, default: Date.now() },
  userId: String,
  category: String
})

// creando modelo y exportando
export default model('Post', postSchema)
