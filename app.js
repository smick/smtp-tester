// app.js
const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config(); // Load .env file

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the email form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Handle form submission and send the email
app.post('/send-email', async (req, res) => {
  const recipientEmail = req.body.email;

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_SECURE === 'true', // true for 465 (SSL), false for 587 (TLS/STARTTLS)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Allows self-signed certificates
    }
  });

  // Email options
  const mailOptions = {
    from: `"Email Tester" <${process.env.SMTP_USER}>`,
    to: recipientEmail,
    subject: 'Hello World',
    text: 'This is a test email from our Node.js app.',
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    res.json({ success: false, errorLog: `Error sending email: ${error.message}\n\nStack Trace:\n${error.stack}` });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
