import bcrypt from 'bcryptjs'
import { Schema, model, type Document, type Model } from 'mongoose'

export interface IUser extends Document {
  username: string
  email: string
  password: string
  avatar?: {
    url?: string
    public_id?: string
  }
  encryptPassword(password: string): Promise<string>
  comparePassword(password: string, hash: string): Promise<boolean>
}

const userSchema = new Schema<IUser>({
  username: String,
  email: String,
  password: String,
  avatar: {
    url: String,
    public_id: String
  }
})

userSchema.methods.encryptPassword = async function (password: string): Promise<string> {
  // cuantas veces queremos aplicar el algoritmo
  const salt = await bcrypt.genSalt(10)
  // aplicación del algoritmo
  const hash = await bcrypt.hash(password, salt)
  return hash
}

userSchema.methods.comparePassword = async function (
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

const User: Model<IUser> = model<IUser>('User', userSchema)

export default User
