const getFilesFromDB = require("../models/script").getFilesFromDB;
const getFoldersFromDB = require("../models/script").getFoldersFromDB;

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

async function updateFileDetails(req, res, next) {
    const path = req.originalUrl;

    const files = res.locals.files;
    res.locals.files = files.map(file => {
        file.url = path + "/files/" + file.OriginalName;
        return file;
    });

    const folders = res.locals.folders;
    res.locals.folders = folders.map(folder => {
        folder.url = path + "/d0f4e1548ad9e4f162300/" + folder.id;
        return folder;
    })
    res.locals.user = req.user;
    next();
}

function authSuccess(req, res) {
    res.render("library/library");
};

const libGet = [ requestAllFiles, updateFileDetails, authSuccess ]

module.exports = {
    libGet,
}