const { prisma } = require("../../lib/prisma");

const getParentId = async (userId) => {
  const homeDir = await prisma.dir.findMany({
    where: {
      AND: [{ userId: userId }, { name: "Home" }, { parentId: null }],
    },
  });
  return homeDir[0].id;
};

const getFiles = async (parentId) => {
  return await prisma.file.findMany({
    where: {
      dirId: parentId,
    },
  });
};

const getDirectories = async (parentId) => {
  return await prisma.dir.findMany({
    where: {
      parentId: parentId,
    },
    select: {
      name: true,
    },
  });
};

const getContents = async (userId, splat) => {
  let path = "";
  let parentId = await getParentId(userId);
  let currDir = "Home";
  let files = await getFiles(parentId);
  let dirs = await getDirectories(parentId);

  if (splat) {
    path += `${splat.join("/")}`;
    for (let i = 0; i < splat.length; i += 1) {
      currDir = await prisma.dir.findMany({
        where: {
          AND: [{ parentId: parentId }, { name: splat[i] }],
        },
      });
      parentId = currDir[0].id;
      dirs = await getDirectories(parentId);
      files = await getFiles(parentId);
    }
  }
  return { path, parentId, currDir, files, dirs };
  
};

module.exports = getContents;
