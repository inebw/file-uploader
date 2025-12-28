const { body, validationResult, matchedData } = require("express-validator");
const { prisma } = require("../lib/prisma");
const bcrypt = require("bcryptjs");

const validateUser = [
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("Username can contain only letters and numbers")
    .isLength({ min: 3, max: 32 })
    .withMessage("Username should be within 3 to 32 characters"),
  body("first_name")
    .trim()
    .isAlpha()
    .withMessage("First Name can contain only alphabets")
    .isLength({ min: 3, max: 255 })
    .withMessage("First name should be within 3 to 255 characters"),
  body("last_name")
    .trim()
    .isAlpha()
    .withMessage("Last Name can contain only alphabets")
    .isLength({ min: 3, max: 255 })
    .withMessage("Last name should be within 3 to 255 characters"),
  body("password")
    .isLength({ min: 8, max: 255 })
    .withMessage("Password should be at least 8 characters long"),
  body("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) throw new Error("Password does not match");
    return true;
  }),
];

module.exports = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).render("sign-up", { errors: errors.array() });
    } else {
      const { username, first_name, last_name, password } = matchedData(req);
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: {
          username: username,
          first_name: first_name,
          last_name: last_name,
          password: hashedPassword,
          dirs: {
            create: {
              name: "Home",
            },
          },
        },
      });
      res.redirect("/");
    }
  },
];
