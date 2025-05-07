import express from 'express';
import { sendEmail } from './mailer.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const recipient = req.query.to;
  if (!recipient) {
    return res.status(400).json({ error: 'Recipient email address is required as query parameter "to"' });
  }
  try {
    await sendEmail({
      to: recipient,
      subject: 'Test Email from Veggietopia',
      text: 'This is a test email to verify the Gmail SMTP connection.',
      html: '<p>This is a test email to verify the Gmail SMTP connection.</p>',
    });
    res.status(200).json({ message: `Test email sent successfully to ${recipient}` });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ error: 'Failed to send test email' });
  }
});

export default router;
