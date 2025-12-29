module.exports = (req, res) => {
  res.render("sign-up", { title: "Sign Up", user:req.user });
};
