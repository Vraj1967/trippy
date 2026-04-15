const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupSchema = new mongoose.Schema({
  name: String, email: String, password: String,
  registeredAt: { type: Date, default: Date.now }
});
const SignUp = mongoose.model('SignUp', signupSchema, 'signups');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/trippy', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { email, password } = req.body;
    const user = await SignUp.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { name: user.name, email: user.email, role: 'user' } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
}