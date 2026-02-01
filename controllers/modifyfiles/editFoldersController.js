const { validation } = require("./editFilesController");
const { validationResult, matchedData, body } = require("express-validator");
const { updateFolderName } = require("../../models/script");

function editFolderGet(req, res) {
    const { folderId } = req.params;
    res.locals.renameAction = `/library/folder/k0y1o-9874ha48fdl/${folderId}`;
    res.render("library/rename");
}

//validate and sanitize
const validate = [
    body("name").trim()
        .notEmpty().withMessage("please enter a name.")
        .escape()
]

//send foldername 
async function sendFolderName(req, res, next) {
    const { name } = matchedData(req);
    const {fileId} = req.params;
    const id = parseInt(fileId);

    await updateFolderName(id, name);

    next();
}

function redirectToLib(req, res) {
    res.redirect("/library");
}


const editFolderPost = [
    validate,
    validation,
    sendFolderName,
    redirectToLib
]

module.exports = {
    editFolderGet,
    editFolderPost
}