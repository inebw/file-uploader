const getContents = require("./helpers/userSpaceHelpers");

module.exports = async (req, res) => {
  const { id, username } = req.user;
  const {path, parentId, files, dirs} = await getContents(id, req.params.splat)

  res.render("user-space", {
    title: "User Space",
    user:req.user,
    path: path,
    dirs: dirs,
    files: files,
    username: username,
    parentId: parentId,
  });
};
