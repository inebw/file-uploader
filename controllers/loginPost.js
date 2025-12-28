const { prisma } = require("../lib/prisma")

module.exports = async (req, res) => {
    const {username} = req.user;
    res.redirect(`/user/${username}/home/`)
}