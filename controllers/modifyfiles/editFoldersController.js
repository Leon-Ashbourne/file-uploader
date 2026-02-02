const { validation, deleteFileFromSupabase } = require("./editFilesController");
const { validationResult, matchedData, body } = require("express-validator");
const { updateFolderName, getFolderFileSupabasePath, deleteFolder, deleteFilesFolder } = require("../../models/script");

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

//delete folder
function checkFolderUrl(req, res, next) {
    const folderId = parseInt(req.params.folderId);
    if(folderId) {
        res.locals.folderId = folderId;
        next();
    }
    else res.render("error");
}

async function reqFileSupabasePath(req, res, next) {
    const folderId = parseInt(req.params.folderId);
    const paths  = await getFolderFileSupabasePath(folderId);
    if(paths.length>0) {
        res.locals.paths = paths;
        next();
    }
    else reqDeleteEmptyFolder(req, res);
}

async function reqDeleteFolderAndFiles(req, res, next) {
    const folderId = res.locals.folderId;
    
    await deleteFilesFolder(folderId);
    await deleteFolder(folderId);

    next();
}

async function reqDeleteEmptyFolder(req, res) {
    const folderId = res.locals.folderId;
    await deleteFolder(folderId);
    redirectToCurrentPage(req, res);
}

function redirectToCurrentPage(req, res) {
    const folderId = res.locals.folderId;
    const redirectPath = `/library`;
    res.redirect(redirectPath);
}

const deleteFolderPost = [
    checkFolderUrl,
    reqFileSupabasePath,
    deleteFileFromSupabase,
    reqDeleteFolderAndFiles,
    redirectToCurrentPage,
]


module.exports = {
    editFolderGet,
    editFolderPost,
    deleteFolderPost,
}