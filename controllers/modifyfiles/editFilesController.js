const { matchedData, body, validationResult } = require("express-validator");
const { updateFileName, getSupabasePath, deleteFileFromDb } = require("../../models/script");
const { removeFiles } = require("../../models/supabase");

function editFileGet(req, res) {
    const { fileId } = req.params;
    res.locals.renameAction = `/library/files/f1e37rg840d1sfad4/${fileId}`;
    res.render("library/rename");
}

//validate
const validate = [
    body("name").trim()
        .notEmpty().withMessage("please enter a name.")
        .escape()
]

function checkId(req, res, next) {
    const { fileId } = req.params;
    const id = parseInt(fileId);

    if(id) next();
    else res.render("error");
}

function validateField(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.render("error");
    }

    else next();
}

const validation = [ checkId, validateField ];

async function sendFilename(req, res, next) {
    const { name } = matchedData(req);
    const {fileId} = req.params;
    const id = parseInt(fileId)

    await updateFileName(id, name);

    next();
}

function redirectToLib(req, res) {
    res.redirect("/library");
}

const editFilePost = [
    validate,
    validation,
    sendFilename, 
    redirectToLib 
]

//delete file
async function getSupabaseFilepath(req, res, next) {
    const { fileId } = req.params;
    const id = parseInt(fileId);
    if(id) {
        const filePath = await getSupabasePath(id);
        res.locals.path = filePath;
        next();
    }
    else res.render("error")
    
}

async function deleteFileFromSupabase(req, res, next) {
    const path = res.locals.path;
    const filePath = Array.isArray(path) ? path : [path];
    const error = await removeFiles([filePath]);
    if(error) {
        res.render("error");
    }
    else next();
};

async function reqDeleteFileFromDB(req, res, next) {
    const fileId = parseInt(req.params.fileId);
    await deleteFileFromDb(fileId);
    next();
}

function redirectToPresentPage(req, res) {
    const { fileId, folderId } = req.params;
    const fileID = parseInt(fileId);
    const folderID = parseInt(folderId);

    if(folderID) {
        const url = `/library/folder-d0f4e1548ad9e4f162300/${folderID}`;
        res.redirect(url);
    }
    else res.redirect("/library");
};

const deleteFilePost = [ getSupabaseFilepath, deleteFileFromSupabase, reqDeleteFileFromDB, redirectToPresentPage ];

module.exports = {
    editFileGet,
    editFilePost,
    redirectToLib,
    validation,
    deleteFilePost,
    deleteFileFromSupabase,
}