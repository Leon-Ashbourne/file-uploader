const { matchedData, body, validationResult } = require("express-validator");
const { updateFileName } = require("../../models/script");

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

module.exports = {
    editFileGet,
    editFilePost,
    redirectToLib,
    validation
}