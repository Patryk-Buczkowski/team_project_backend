import passport from 'passport';
import passportJWT from 'passport-jwt';
import dotenv from 'dotenv';
// import User from "../schemas/userSchema"; // User from db
import User from '../models/user.model';
// const User = h;

dotenv.config();

const secret = process.env.SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  'roleUser',
  new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user) {
        return done(null, false, { message: 'Not authorized' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.use(
  'roleAdmin',
  new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user || user.role !== 'admin') {
        return done(null, false, {
          message: 'Not authorized role, admin required',
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.use(
  'roleModerator',
  new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user || !(user.role === 'admin' || user.role === 'moderator')) {
        return done(null, false, {
          message: 'Not authorized role, moderator or admin required',
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);
