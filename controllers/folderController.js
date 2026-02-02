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
        res.locals.folderId = id;
        res.locals.files = files;
        next();
    }
    else res.render("error");
}

function modifyFolderFileDetails(files, baseUrl) {
    const modifiedFolderFiles = files.map(file => {
        const url = baseUrl + "/fe40lk77e1835qt00e/" + file.id;
        file.url = url;
        file.editFileLink = url + "/edit";
        file.fileDeleteAction = url + "/delete";
        return file;
    });

    return modifiedFolderFiles;
}

async function updateFileWithHref(req, res, next) {
    res.locals.action = `/library/folder-d0f4e1548ad9e4f162300/${res.locals.folderId}`;

    const files = res.locals.files;
    const baseUrl = req.originalUrl

    res.locals.files = modifyFolderFileDetails(files, baseUrl);

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