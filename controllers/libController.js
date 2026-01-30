const getFilesFromDB = require("../models/script").getFilesFromDB;

//files list
async function requestAllFiles(req, res, next) {
    try{
        const files = await getFilesFromDB(req.user.id);
        res.locals.files = files;
        res.locals.user = req.user
        next();
    }catch(err) {
        next(err);
    }
}

function authSuccess(req, res) {
    res.render("library/library");
};

const libGet = [ requestAllFiles, authSuccess ]

module.exports = {
    libGet,
}