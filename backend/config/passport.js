import passport from 'passport';
import dotenv from'dotenv';
dotenv.config({ path: "./backend/.env" });
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js'; // Replace with your actual User model
import db from '../config/db.js'; // your database connection module

// Local Strategy remains unchanged
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,       
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      
      console.log('Google profile info:', profile);
      // Query your consumers table for a matching googleId
      const [rows] = await db.promise().query(
        "SELECT * FROM consumers WHERE email = ? LIMIT 1",
        [profile.emails[0].value]
      );
      let user = rows[0];

      if (user) {
        // If the consumer exists, update the Google ID if not already set:
          if (!user.googleId) {
          const [updateResult] = await db.promise().query(
            "UPDATE consumers SET googleId = ? WHERE email = ?",
            [profile.id, profile.emails[0].value]
          );
          // Optionally re-fetch the updated user record
          const [updatedRows] = await db.promise().query(
            "SELECT * FROM consumers WHERE id = ? LIMIT 1",
            [user.id]
          );
          user = updatedRows[0];
          console.log('User after update:', user);
        }
        // Now, return the consumer's id (or the full consumer record)
        return done(null, user);
      } else {
        console.log('No user found; creating new consumer record.');
       
        // Otherwise, you might want to create a new consumer record or reject the login
        // For example, create a new consumer:
        const result = await db.promise().query(
          "INSERT INTO consumers (googleId, email, name) VALUES (?, ?, ?)",
          [profile.id, profile.emails[0].value, profile.displayName]
        );
        console.log('Insert result:', result);
        // Retrieve the newly created consumer record:
        const [newConsumerRows] = await db.promise().query(
          "SELECT * FROM consumers WHERE id = ? LIMIT 1",
          [result[0].insertId]
        );
        console.log('New consumer record:', newConsumerRows[0]);
        return done(null, newConsumerRows[0]);
      }
    } catch (error) {
      console.error('Error in GoogleStrategy:', error);
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  // Store the user id (or any unique identifier from your db)
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Retrieve the consumer record from your database
    const [rows] = await db.promise().query(
      "SELECT * FROM consumers WHERE id = ? LIMIT 1",
      [id]
    );
    const user = rows[0];
    console.log('Deserialized user:', user);
   done(null, user);
  } catch (error) {
    console.error('Error in deserializeUser:', error);
    done(error, null);
  }
});

export default passport;
