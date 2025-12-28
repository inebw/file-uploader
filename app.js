require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { prisma } = require("./lib/prisma");
const path = require("node:path");
const router = require("./routes/router");
const passport = require("passport");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  expressSession({
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.session())

require('./config/passport.js')

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))
app.use(router);

const port = process.env.PORT || 4000;
app.listen(port, (err) => {
  if (err) console.error(err);
  else console.log(`Listening on ${port}`);
});
