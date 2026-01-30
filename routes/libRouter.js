const { Router } = require("express");
const libController = require("../controllers/libController");
const filesController = require("../controllers/filesController");
const authLibraryRouter = require("./auth/authLibraryRouter");

const libRouter = Router();

libRouter.post("/files", filesController.filesPost);
libRouter.get("/", authLibraryRouter, libController.libRender);

module.exports = libRouter;