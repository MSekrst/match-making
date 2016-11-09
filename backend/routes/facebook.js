import express from 'express';
import passport from '../passport'

const facebookRouter = express.Router();

facebookRouter.get('/', passport.authenticate('facebook'));

facebookRouter.get('/fbcallback',
  passport.authenticate('facebook', {failureRedirect: '/'}),
  function (req, res, next) {
    res.status(200).json({displayName: req.user.displayName, profilePicture: req.user.photos[0].value});
  }
);

export default facebookRouter;
