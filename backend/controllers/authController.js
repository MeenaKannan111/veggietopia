import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/mailer.js';

export const signup = async (req, res) => {
  // Your sign-up logic here (e.g. hashing password and inserting user into DB)
  
  // After inserting the user in the database:
  const verifyToken = jwt.sign(
    { email: req.body.email },
    process.env.JWT_SECRET || 'secretkey',
    { expiresIn: '1d' }
  );

  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verifyToken}`;

  try {
    await sendEmail({
      to: req.body.email,
      subject: 'Email Verification',
      html: `<p>Please click the link below to verify your email:</p><a href="${verificationLink}">${verificationLink}</a>`,
      text: `Please verify your email by visiting: ${verificationLink}`,
    });
    res.status(200).json({ message: 'Signup successful. Please verify your email.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send verification email' });
  }
};