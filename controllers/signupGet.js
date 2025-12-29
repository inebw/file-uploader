module.exports = (req, res) => {
  if (!req.isAuthenticated()) {
    res.render("sign-up", { title: "Sign Up", user: req.user });
  } else {
    res.redirect("/");
  }
};
