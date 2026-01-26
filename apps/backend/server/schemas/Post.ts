import { Schema, model, type Document, type Model } from 'mongoose'

export interface IPost extends Document {
  title: string
  content: string
  image?: {
    url?: string
    public_id?: string
  } | null
  createdAt: Date
  userId: string
  category: string
}

// creando schema
const postSchema = new Schema<IPost>({
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
const Post: Model<IPost> = model<IPost>('Post', postSchema)

export default Post
