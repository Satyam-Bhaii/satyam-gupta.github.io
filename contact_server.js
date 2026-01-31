// Contact form server
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3001; // Different port for contact server

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Configure nodemailer transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your_email@gmail.com', // Replace with your email
    pass: process.env.EMAIL_PASS || 'your_app_password'    // Replace with your app password
  }
});

// Handle contact form submission
app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER || 'your_email@gmail.com',
    to: 'sgsatyam27@gmail.com', // Your email
    subject: `New Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email. Please try again later.' });
  }
});

// Serve the main website
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Contact server running at http://localhost:${PORT}`);
  console.log('Emails will be sent to: sgsatyam27@gmail.com');
});