const Router = require("express").Router;
const authentication = require("../../controllers/auth/authLibController");

const authLibraryRouter = Router();
authLibraryRouter.use(authentication);

module.exports = authLibraryRouter;