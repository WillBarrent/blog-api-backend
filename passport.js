const passport = require("passport");
const { findUserById } = require("./models/auth");
const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

const verifyCallback = async function (jwt_payload, done) {
  const userId = jwt_payload.userId;

  const user = await findUserById(userId);

  if (!user) {
    done(null, false);
  } else {
    done(null, {
      userId: user.id,
    });
  }
};

const strategy = new jwtStrategy(options, verifyCallback);

passport.use(strategy);
