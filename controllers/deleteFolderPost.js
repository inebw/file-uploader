const { prisma } = require("../lib/prisma");

module.exports = async (req, res) => {
    const {folderId, path, username} = req.body;
    await prisma.dir.delete({
        where:{
            id:parseInt(folderId)
        }
    })
    res.redirect(`/user/${username}/home/${path}`);
}