module.exports = (req, res) => {
  res.render("index", { title: "Homepage", user: req.user });
};
