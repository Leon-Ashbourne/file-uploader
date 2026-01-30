const createFolder = require("../models/script").createFolder;

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

const folderGet = [ reqCreateFolder, backToLib ];

module.exports = {
    folderGet,
}