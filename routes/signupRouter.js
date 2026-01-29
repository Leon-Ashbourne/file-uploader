const Router = require("express").Router;
const signupController = require("../controllers/signupController")

const signupRouter = Router();
signupRouter.get("/", signupController.signupRender)
signupRouter.post("/", signupController.signupPost)

module.exports = signupRouter;