const passport = require("passport");
const { PrismaClient } = require("./generated/prisma");
const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

const verifyCallback = async function (jwt_payload, done) {
  const prisma = new PrismaClient();

  const userId = jwt_payload.userId;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

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
