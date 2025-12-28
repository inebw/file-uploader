const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const { prisma } = require("../lib/prisma");

const verifyCallBack = async (username, password, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) return done(null, false, "User not found!");

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      done(null, user);
    } else {
      done(null, false, { message: "Wrong Password Entered!" });
    }
  } catch (err) {
    done(err);
  }
};

const strategy = new LocalStrategy(verifyCallBack);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});
