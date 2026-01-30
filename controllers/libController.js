const getFilesFromDB = require("../models/script").getFilesFromDB;

//files list
async function requestAllFiles(req, res, next) {
    try{
        const files = await getFilesFromDB(req.user.id);
        res.locals.files = files;
        next();
    }catch(err) {
        next(err);
    }
}

async function updateFileDetails(req, res, next) {
    const path = req.originalUrl;
    const files = res.locals.files
    res.locals.files = files.map(file => {
        file.url = path + "/files/" + file.OriginalName;
        return file;
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