const { createFolder, getFilesFromFolderById } = require("../models/script");

async function reqCreateFolder(req, res, next) {
    try{
        await createFolder(req.user.id);
        next();
    }catch(err) {
        next(err);
    };
}

function backToLib(req, res) {
    res.redirect("/library");
};

const folderPost = [ reqCreateFolder, backToLib ];

//get file from the folder
async function requestFilesFromFolder(req, res, next) {
    const { folderId } = req.params;
    const id = parseInt(folderId);
    if(id) {
        const files = await getFilesFromFolderById(id);
        res.locals.files = files;
        next();
    }
    else res.render("error");
}

async function updateFileWithHref(req, res, next) {
    const files = res.locals.files;
    res.locals.files = files.map(file => {
        file.url = path + "/fe40lk77e1835qt00e/" + file.id;
        return file;
    })
    next();
}

async function renderFilesFromFolder(req, res) {
    res.locals.user = req.user;
    res.render("library/view/folder");
}

const folderFilesGet = [ requestFilesFromFolder, updateFileWithHref, renderFilesFromFolder ];

module.exports = {
    folderPost,
    folderFilesGet
}