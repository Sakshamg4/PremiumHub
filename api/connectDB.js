import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

// Ensure a global connection instance (fix for Vercel)
let cached = global.mongoose || { conn: null, promise: null }

async function connectDB() {
  if (cached.conn) return cached.conn

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  cached.conn = await cached.promise
  console.log('MongoDB connected!')
  return cached.conn
}

global.mongoose = cached
export default connectDB
