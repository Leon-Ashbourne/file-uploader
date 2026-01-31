const multer = require("multer");
const { addFileDetailsToDB, getFileDetailsById, createFilesFromFolder } = require("../models/script");
const fs = require("fs");
const path = require("node:path")

//configure multer 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const mediaPath = path.join(__dirname, 'uploads');
        const fieldname = file.fieldname;
        cb(null, `${mediaPath}/${fieldname}`);
    },
    filename: function(req, file, cb) {
        const filename = file.fieldname + "-" + Math.random()*1e12 + "-" + file.originalname;
        cb(null, filename);
    }
})

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


async function extractFiles(req, res, next) {
    const files = req.files;
    const userId = req.user.id;

    for( const file of files ) {
    const { originalname, filename, size, path } = file;

    await addFileDetailsToDB(originalname, filename, size, path, userId);
    }

    next();
}

async function redirectToLib(req, res) {
    res.redirect("/library");
}

const filesPost = [
    upload.array("files"),
    (req, res, next) => {
        console.log(req.files);
        next();
    },
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