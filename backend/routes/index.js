import express from 'express';
import passport from '../passport'

const router = express.Router();

router.get('/', function (req, res, next) {
  res.status(200).json("Hello");
});

router.get('/login', passport.authenticate('facebook'));

router.get('/fbcallback',
  passport.authenticate('facebook', {failureRedirect: '/'}),
  function (req, res, next) {
    res.status(200).json({displayName: req.user.displayName, profilePicture: req.user.photos[0].value});
  }
);

export default router;
