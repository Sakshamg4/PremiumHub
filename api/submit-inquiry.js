import connectDB from './connectDB'
import mongoose from 'mongoose'
import nodemailer from 'nodemailer'

// Inquiry Model (Move to `/api/` for Vercel compatibility)
const InquirySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    service: String
  },
  { timestamps: true }
)

const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    await connectDB()
    const { name, email, service } = req.body

    const inquiry = await Inquiry.create({ name, email, service })

    // Use a reliable email service instead of SMTP (Recommended)
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com', // Use Brevo (formerly Sendinblue)
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Inquiry Received',
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Service:</strong> ${service}</p>`
    })

    res.status(200).json({ success: true, data: inquiry })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ success: false, error: error.message })
  }
}
