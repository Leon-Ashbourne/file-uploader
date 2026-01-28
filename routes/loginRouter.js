const { Router } = require("express");
const loginController = require("../controllers/loginController");

const loginRouter = Router();
loginRouter.get("/", loginController.loginRender);

module.exports = loginRouter;