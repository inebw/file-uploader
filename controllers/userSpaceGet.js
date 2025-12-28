const { prisma } = require("../lib/prisma");

module.exports = async (req, res) => {
  const { id, username } = req.user;
  let path = "/home/";
  if (req.params.splat) {
    path += `${req.params.splat.join("/")}`;
  }

  const homeDir = await prisma.dir.findMany({
    where: {
      AND: [{ userId: id }, { name: "Home" }, { parentId: null }],
    },
  });
  let parentId = homeDir[0].id;
  let currDir = "Home";

  let files = await prisma.file.findMany({
    where: {
      dirId: parentId,
    },
  });
  let dirs = await prisma.dir.findMany({
    where: {
      parentId: parentId,
    },
    select: {
      name: true,
    },
  });

  for (let i = 0; i < req.params.splat.length; i += 1) {
    currDir = await prisma.dir.findMany({
      where: {
        AND: [{ parentId: parentId }, { name: req.params.splat[i] }],
      },
    });
    parentId = currDir[0].id;
    dirs = await prisma.dir.findMany({
      where: {
        parentId: parentId,
      },
      select: {
        name: true,
      },
    });
    files = await prisma.file.findMany({
      where: {
        dirId: parentId,
      },
    });
  }

  res.render("user-space", {
    title: "User Space",
    path: path,
    dirs: dirs,
    files: files,
    username: username,
    parentId: parentId,
  });
};
