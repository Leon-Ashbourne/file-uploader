const { createClient } = require("@supabase/supabase-js");
require("dotenv/config")

const supbaseUrl = process.env.SUPABASE_URL;
const supbaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supbaseUrl, supbaseKey);

async function uploadFile(path, file, contentType) {
    const { data, error } = await supabase.storage
    .from("files")
    .upload(path, file, {contentType});

    if(error) return error;
}

module.exports = {
    uploadFile
}