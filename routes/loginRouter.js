const { Router } = require("express");

const loginController = require("../controllers/loginController");
const passport = require("../passport/passport") 

const loginRouter = Router();
loginRouter.get("/", loginController.loginRender);
loginRouter.post("/", 
    passport.authenticate("local", { failureRedirect: "/log-in", failureMessage: true }), 
    loginController.loginPostReq 
);

module.exports = loginRouter;