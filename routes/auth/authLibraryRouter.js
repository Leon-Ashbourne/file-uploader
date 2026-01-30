const Router = require("express").Router;
const checkUSerSession = require("../../controllers/auth/authLibController").checkUSerSession;

const authLibraryRouter = Router();
authLibraryRouter.use(checkUSerSession);

module.exports = authLibraryRouter;