const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

    const { name, email, password } = req.body;
    if (await SignUp.findOne({ email })) {
      return res.status(400).json({ success: false, message: 'Email already registered.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await new SignUp({ name, email, password: hashedPassword }).save();
    res.status(201).json({ success: true, message: 'Registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Signup failed' });
  }
}