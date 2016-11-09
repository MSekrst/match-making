import fbConfig from '../config/fbConfig';

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    display: "popup",
    clientID: fbConfig.facebook_api_key,
    clientSecret: fbConfig.facebook_api_secret,
    callbackURL: fbConfig.callback_url,
    profileFields: ['displayName','picture.type(large)'],

  },
  function (accessToken, refreshToken, user, done) {
    done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

export default passport;