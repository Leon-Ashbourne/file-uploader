const Router = require("express").Router;
const signupController = require("../controllers/signupController")
const error = require("../controllers/errorController");

const signupRouter = Router();
signupRouter.get("/", signupController.signupRender)
signupRouter.post("/", signupController.signupPost)

signupRouter.use("/{*splat}", error);

module.exports = signupRouter;