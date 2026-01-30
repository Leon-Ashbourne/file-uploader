const multer = require("multer");
const { addFileDetailsToDB, getFileDetailsById } = require("../models/script");
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
    res.render("library/view/file");
}

const fileGet = [ requestFileDetails, sendFileDetails ]

const filesPost = [
    upload.array("files"),
    (req, res, next) => {
        console.log(req.files);
        next();
    },
    extractFiles,
    redirectToLib
]


module.exports = {
    filesPost,
    fileGet
}