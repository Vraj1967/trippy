const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const contactSchema = new mongoose.Schema({
  name: String, email: String, subject: String, message: String,
  submittedAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema, 'contacts');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/trippy', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { name, email, subject, message } = req.body;
    await new Contact({ name, email, subject, message }).save();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '📩 Message Received!',
      text: `Hi ${name},\n\nThank you for contacting us regarding "${subject}".\n\nWe will respond shortly!\n\nBest regards,\nTeam Trippy`
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to submit' });
  }
}