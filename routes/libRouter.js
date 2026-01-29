const { Router } = require("express");
const libController = require("../controllers/libController");
const authLibraryRouter = require("./auth/authLibraryRouter");

const libRouter = Router();

libRouter.get("/", authLibraryRouter, libController.libRender);

module.exports = libRouter;