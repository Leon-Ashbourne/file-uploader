const { createClient } = require("@supabase/supabase-js");
require("dotenv/config")

const supbaseUrl = process.env.SUPABASE_URL;
const supbaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supbaseUrl, supbaseKey);

async function uploadFile(path, file, contentType) {
    const { data, error } = await supabase
    .from("files")
    .upload(path, file, { contentType });
}

module.exports = {
    uploadFile
}