const { Router } = require("express");
const libController = require("../controllers/libController");

const libRouter = Router();
libRouter.get("/", libController.libRender);

module.exports = libRouter;