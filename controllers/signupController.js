const { validationResult, body, matchedData } = require("express-validator");

const { addUser } = require("../models/script");

//validate and sanitize user details
const validate = [
    body("username").trim()
        .notEmpty().withMessage("please enter your username")
        .escape()
        .isLength({min: 4, max: 12}).withMessage(`username's length must be between 4-12`),

    body("password")
        .notEmpty().withMessage("please enter a password")
        .isLength({min: 6, max: 18}).withMessage("password's length must be between 6-12")
        .bail(),

    body("confirmPassword")
        .notEmpty().withMessage("please enter your password")
        .custom((value, { req }) => {
            const { password } = req.body;
            if(value === password) return true;
            return false;
        }).withMessage("password doesn't match your password")
]

//add user details to db
const signupPost = [
    validate,
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.render("/sign-up", {errors: errors});
            return;
        }
        next();
    },
    (req, res, next) => {
        const { password, username } = matchedData(req);
        addUser(password, username);
        res.redirect("/");
    }
]

//render sign up form
function signupRender(req, res) {
    res.render("signup/signup")
}

module.exports = {
    signupRender,
    signupPost
}