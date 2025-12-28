const { prisma } = require("../lib/prisma");

module.exports = async (req, res) => {
    const {dir_name, parent_id, path} = req.body;
    const {username, id} = req.user;
    await prisma.dir.create({
        data:{
            name:dir_name,
            userId:id,
            parentId:parseInt(parent_id),
        }
    })
    res.redirect(`/user/${username}${path}`)
}