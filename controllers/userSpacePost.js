const { body, validationResult, matchedData } = require("express-validator");
const { prisma } = require("../lib/prisma");
const getContents = require("./helpers/userSpaceHelpers");

const validateDir = [
  body("dir_name")
    .trim()
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("Folder name can contain only letters and numbers")
    .isLength({ min: 3, max: 64 })
    .withMessage("Folder name should be within 3 to 64 characters")
    .custom(async (value, { req }) => {
      const { parent_id } = req.body;
      const folders = await prisma.dir.findMany({
        where: {
          AND: [{ parentId: parseInt(parent_id) }, { name: value }],
        },
      });
      if (folders.length > 0) throw new Error("Folder Name Already Exists");
      return true;
    }),
];

module.exports = [
  validateDir,
  async (req, res) => {
    const { username, id } = req.user;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { path, parentId, files, dirs } = await getContents(
        id,
        req.params.splat
      );
      res.status(400).render("user-space", {
        title: "Invalid Folder Name: Retry",
        dirs: dirs,
        files: files,
        username: username,
        parentId: parentId,
        path: path,
        errors: errors.array(),
      });
    } else {
      const { dir_name } = matchedData(req);
      const { parent_id, path} = req.body;
      await prisma.dir.create({
        data: {
          name: dir_name,
          userId: id,
          parentId: parseInt(parent_id),
        },
      });
      res.redirect(`/user/${username}/home/${path}`);
    }
  },
];
