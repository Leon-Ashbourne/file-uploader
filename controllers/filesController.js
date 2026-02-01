const multer = require("multer");
const { decode } = require("base64-arraybuffer");

const { addFileDetailsToDB, getFileDetailsById, createFilesFromFolder } = require("../models/script");
const { uploadFile } = require("../models/supabase");
//configure multer 
const storage = multer.memoryStorage();

const validFileTypes = [ //valid file types
    "image/jpg",
    "image/jpeg",
    "image/svg",
    "application/pdf",
    "image/webp",
    "application/doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/png"
]

function validateFiles(req, file, cb) {
    try {
        const mimetype = file.mimetype;
        const results = validFileTypes.includes(mimetype);
        if(results) cb(null, true);
        else cb(null, false);
    }catch(err) {
        cb(err);
    }
}

const upload = multer({ 
    storage: storage,
    fileFilter: validateFiles 
});

function generateFileName(fieldname, originalname) {
    const filename = fieldname + "-" + Math.random()*1e12 + "-" + originalname; 
    return filename;
}

async function sendFileToSupabase(req, res, next) {
    const file = req.file;

    const filename = generateFileName(file.fieldname, file.originalname);
    const filePath = `files/${filename}`;
    const contentType = file.mimetype;

    const fileData = decode(file.buffer.toString("base64"));

    const error = await uploadFile(filePath, fileData, contentType);

    if(error) res.locals.supabaseError = error;

    next();
}

async function handleSupabaseErrors(req, res, next) {
    const supabaseError = res.locals.supabaseError;

    if(supabaseError) { 
        const message = "Something went wrong. we couldn't upload your file, please try again.";
        alert(message);
        res.redirect("/library");
    }
    else next()
}

async function extractFiles(req, res, next) {
    const file = req.file;
    const userId = req.user.id;

    const { originalname, size, fieldname } = file;
    const filename = generateFileName(fieldname, originalname);

    await addFileDetailsToDB(originalname, filename, size, userId);

    next();
}

async function redirectToLib(req, res) {
    res.redirect("/library");
}

const filesPost = [
    upload.single("files"),
    sendFileToSupabase,
    handleSupabaseErrors,
    extractFiles,
    redirectToLib
]

//file details
async function requestFileDetails(req, res, next) {
    const { fileId } = req.params;
    const id = parseInt(fileId);

    if(id) {
        const details = await getFileDetailsById((id));
        res.locals.details = details;
        next();
    }
    else res.render("error");
}

async function sendFileDetails(req, res) {
    res.locals.user = req.user;
    res.render("library/view/file", { href: "/library" });
}

const fileGet = [ requestFileDetails, sendFileDetails ]

//post files under the folder
async function checkFolderUrl(req, res, next) {
    const { folderId } = req.params;
    const id = parseInt(folderId);
    if(id) {
        res.locals.folderId = id;
        next();
    }
    else res.render("error");
};

async function extractFolderFiles(req, res, next) {
    const files = req.files;
    const userId = req.user.id;
    const folderId = res.locals.folderId;

    for( const file of files ) {
    const { originalname, filename, size, path } = file;

    await createFilesFromFolder(folderId, originalname, filename, size, path, userId);
    }

    next();
}

async function redirectToFolderFiles(req, res) {
    res.locals.user = req.user;
    const folderId = res.locals.folderId;
    res.redirect(`/library/folder-d0f4e1548ad9e4f162300/${folderId}`);
}

const filesFromFolderPost = [ 
    upload.array("folderfiles"),
    checkFolderUrl,
    extractFolderFiles,
    redirectToFolderFiles
]

//file details from folder
async function sendFolderFileDetails(req, res) {
    res.locals.user = req.user;
    const { folderId } = req.params;
    const href = `/library/folder-d0f4e1548ad9e4f162300/${folderId}`

    res.render("library/view/file", { href })
}


const folderFileDetailsGet = [ requestFileDetails, sendFolderFileDetails ]


module.exports = {
    filesPost,
    fileGet,
    filesFromFolderPost,
    folderFileDetailsGet
}