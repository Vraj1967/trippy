require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/trippy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected')).catch(err => console.error('❌', err));

// --- Schemas ---
const signupSchema = new mongoose.Schema({
  name: String, email: String, password: String,
  registeredAt: { type: Date, default: Date.now }
});
const SignUp = mongoose.model('SignUp', signupSchema, 'signups');

const contactSchema = new mongoose.Schema({
  name: String, email: String, subject: String, message: String,
  submittedAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema, 'contacts');

// --- Nodemailer ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

// --- Middleware ---
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ message: 'Invalid token' }); }
}

function adminMiddleware(req, res, next) {
  authMiddleware(req, res, () => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    next();
  });
}

// --- Auth Routes ---
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await SignUp.findOne({ email })) return res.status(400).json({ success: false, message: 'Email already registered.' });
    const hashedPassword = await bcrypt.hash(password, 10);
    await new SignUp({ name, email, password: hashedPassword }).save();
    res.status(201).json({ success: true, message: 'Registered successfully!' });
  } catch { res.status(500).json({ success: false, message: 'Signup failed' }); }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await SignUp.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { name: user.name, email: user.email, role: 'user' } });
  } catch { res.status(500).json({ success: false, message: 'Login failed' }); }
});

app.post('/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin', email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ success: true, token });
  }
  res.status(401).json({ success: false, message: 'Invalid admin credentials' });
});

app.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// --- Contact Route ---
app.post('/contact', async (req, res) => {
  try {
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
});

// --- Admin Routes ---
app.get('/admin/users', adminMiddleware, async (req, res) => {
  const users = await SignUp.find({}, '-password').sort({ registeredAt: -1 });
  res.json(users);
});

app.get('/admin/contacts', adminMiddleware, async (req, res) => {
  const contacts = await Contact.find().sort({ submittedAt: -1 });
  res.json(contacts);
});

app.delete('/admin/users/:id', adminMiddleware, async (req, res) => {
  await SignUp.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'User deleted' });
});

app.delete('/admin/contacts/:id', adminMiddleware, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Contact deleted' });
});

app.get('/admin/stats', adminMiddleware, async (req, res) => {
  const [totalUsers, totalContacts, recentUsers, recentContacts] = await Promise.all([
    SignUp.countDocuments(),
    Contact.countDocuments(),
    SignUp.find({}, '-password').sort({ registeredAt: -1 }).limit(5),
    Contact.find().sort({ submittedAt: -1 }).limit(5)
  ]);
  res.json({ totalUsers, totalContacts, recentUsers, recentContacts });
});

app.listen(process.env.PORT || 5000, () => console.log(`🚀 Server running at http://localhost:${process.env.PORT || 5000}`));
