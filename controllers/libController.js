const { getFilesFromDB, getFoldersFromDB } = require("../models/script");

//files list
async function requestAllFiles(req, res, next) {
    try{
        const files = getFilesFromDB(req.user.id);
        const folders = getFoldersFromDB(req.user.id);
        Promise.all([files, folders])
            .then(([val1, val2]) => {
                res.locals.files = val1;
                res.locals.folders = val2;
                next();
            })
    }catch(err) {
        next(err);
    }
}

function modifyFileDetails(files, path) {
    const modifiedFiles = files.map(file => {
        const url = path + "/files-d0e1sd15af6e6rt" + file.OriginalName + "/" + file.id;
        file.url = url;
        file.editFileLink = url + "/edit";
        return file;
    });

    return modifiedFiles;
}

function modifyFolderDetails(folders, path) {
    const modifiedFolders = folders.map(folder => {
        const url = path + "/folder-d0f4e1548ad9e4f162300/" + folder.id;
        folder.url = url;
        folder.editFolderLink = url + "/edit";
        return folder;
    })

    return modifiedFolders;
}

async function updateFileWithHref(req, res, next) {
    const path = req.originalUrl;

    const files = res.locals.files;
    res.locals.files = modifyFileDetails(files, path);

    const folders = res.locals.folders;
    res.locals.folders = modifyFolderDetails(folders, path);

    res.locals.user = req.user;
    next();
}

function authSuccess(req, res) {
    res.render("library/library");
};

const libGet = [ requestAllFiles, updateFileWithHref, authSuccess ]

module.exports = {
    libGet
}