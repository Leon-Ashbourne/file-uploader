const Router = require("express").Router;
const signupRender = require("../controllers/signupController").signupRender

const signupRouter = Router();
signupRouter.get("/", signupRender)

module.exports = signupRouter;