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

async function downloadFile(filePath) {
    const { data } = supabase.storage
    .from("files")
    .getPublicUrl(filePath, {
        download: true,
    });
    
    return data.publicUrl;
}

module.exports = {
    uploadFile,
    downloadFile
}