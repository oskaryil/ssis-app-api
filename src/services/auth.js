import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import request from 'superagent';

import User from '../models/user.model';
import constants from '../config/constants';
import { createUser } from '../helpers/auth.helper';

/**
 * Local Strategy Auth
 */
const localOpts = { usernameField: 'username' };

const localLogin = new LocalStrategy(
  localOpts,
  async (username, password, done) => {
    try {
      const user = await User.query().where('username', username);

      if (user.length === 0) {
        const userData = {
          username,
          password,
        };
        const createdUser = await createUser(userData);
        return done(null, createdUser);
      } else if (!user[0].authenticateUser(password)) {
        return done(null, false);
      }
      return done(null, user[0]);
    } catch (e) {
      return done(null, false);
    }
  },
);

/**
 * JWT Strategy Auth
 */
const jwtOpts = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  // Telling Passport where to find the secret
  secretOrKey: constants.JWT_SECRET,
};

const jwtLogin = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    console.log(payload);
    const user = await User.query().where('user_uuid', payload.user_uuid);
    console.log(user[0].toJSON());

    if (user.length === 0 || !user) {
      return done(null, false);
    }

    return done(null, user[0]);
  } catch (e) {
    console.log(e);
    return done(e, false);
  }
});

passport.use(localLogin);
passport.use(jwtLogin);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });
