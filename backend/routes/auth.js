import express from 'express';
import passport from 'passport';
import '../config/passport.js';  // Ensure passport is configured

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication - redirect or send token.
    res.redirect('/');
  }
);

export default router;