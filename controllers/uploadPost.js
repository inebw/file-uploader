const supabase = require("../config/supabaseClient");

module.exports = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file" });
    const { originalname, buffer, mimetype } = req.file;
    const filename = `${Date.now()}_${originalname}`;
    const bucket = "user_uploads";
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filename, buffer, { contentType: mimetype, upsert: false });
    if (error) {
      console.error("Upload error", error);
      return res.status(500).json({ error: error.message });
    }

    // Optionally create a public URL or a signed URL
   const publicURL = supabase.storage.from(bucket).getPublicUrl(data.path).data.publicUrl
    // publicURL always returned; bucket must allow public access
    console.log(publicURL)
    return res.json({ path: data.path, publicURL });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
