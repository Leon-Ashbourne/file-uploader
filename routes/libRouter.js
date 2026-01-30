const { Router } = require("express");

const libController = require("../controllers/libController");
const filesController = require("../controllers/filesController");
const authLibraryRouter = require("./auth/authLibraryRouter");
const folderController = require("../controllers/folderRouter");

const libRouter = Router();

libRouter.post("/files", filesController.filesPost);
libRouter.get("/files-{*splat}/:fileId", filesController.fileGet);
libRouter.post("/folder", folderController.folderGet);
libRouter.get("/", authLibraryRouter, libController.libGet);

module.exports = libRouter;