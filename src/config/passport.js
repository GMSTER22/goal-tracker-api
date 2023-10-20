const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongodb = require('../database/database');
const config = require('./index.js');
module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleClientId,
        clientSecret: config.googleClientSecret,
        callbackURL: '/auth/google/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value
        };
        try {
          let user = await mongodb.getDb().collection('users').findOne({ googleId: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await mongodb.getDb().collection('users').insertOne(newUser);
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
        }
      }
    )
  );
  passport.serializeUser(function (user, done) {
    console.log(user);
    done(null, user.googleId);
  });
  passport.deserializeUser(async function (id, done) {
    const user = await mongodb.getDb().collection('users').findOne({ googleId: id });
    done(null, user);
  });
};
