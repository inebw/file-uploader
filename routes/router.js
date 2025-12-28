const { Router } = require("express");
const indexController = require("../controllers/indexController");
const loginGet = require("../controllers/loginGet");
const signupGet = require("../controllers/signupGet");
const signupPost = require("../controllers/signupPost");
const passport = require("passport");
const multer = require("multer");
const uploadPost = require("../controllers/uploadPost");
const userSpaceGet = require("../controllers/userSpaceGet");
const userSpacePost = require("../controllers/userSpacePost");
const loginPost = require("../controllers/loginPost");

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.get("/", indexController);


router.get("/login", loginGet);
router.post("/login", passport.authenticate("local"), loginPost);
router.get("/logout", (req, res) =>
  req.logOut((err) => {
    if (err) console.error(err);
    else res.redirect("/");
  })
);
router.get("/sign-up", signupGet);
router.post("/sign-up", signupPost);
router.get("/user/:username/home/{*splat}", userSpaceGet);
router.post("/upload/user/:username/home/{*splat}", upload.single("file"), uploadPost);
router.post("/user/:username/home/{*splat}", userSpacePost);


module.exports = router;
