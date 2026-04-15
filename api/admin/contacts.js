const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const contactSchema = new mongoose.Schema({
  name: String, email: String, subject: String, message: String,
  submittedAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema, 'contacts');

function adminMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  adminMiddleware(req, res, async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/trippy', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const contacts = await Contact.find().sort({ submittedAt: -1 });
      res.json(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch contacts' });
    }
  });
}