import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  try {
    cached.conn = await mongoose.connect(MONGODB_URI)
    console.log('MongoDB connected successfully!')
    return cached.conn
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

export default connectDB