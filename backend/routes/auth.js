import express from 'express';
import passport from 'passport';
import '../config/passport.js';  // Ensure passport is configured

const router = express.Router();
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Handle callback and redirect after authentication
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // On success redirect the user to your dashboard or home page
    //res.redirect(`${process.env.FRONTEND_URL}/consumer-dashboard`);
    //res.redirect(`/api/consumer/dashboard/${req.user.id}`);
    res.redirect(`${process.env.FRONTEND_URL}/consumer-dashboard`);
  
  }
);
 export default router;