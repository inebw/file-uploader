const supabase = require("../config/supabaseClient");
const { prisma } = require("../lib/prisma");

module.exports = async (req, res) => {
  const { path, username, fileId, filePath } = req.body;

  await prisma.file.delete({
    where: {
      id: parseInt(fileId),
    },
  });

  await supabase.storage.from("user_uploads").remove([filePath]);
  res.redirect(`/user/${username}/home/${path}`);
};
