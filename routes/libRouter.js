const { Router } = require("express");

const libController = require("../controllers/libController");
const filesController = require("../controllers/filesController");
const authLibraryRouter = require("./auth/authLibraryRouter");
const folderController = require("../controllers/folderController");

const libRouter = Router();

libRouter.post("/files", filesController.filesPost);
libRouter.get("/files-{*splat}/:fileId", filesController.fileGet);
libRouter.get("/folder-{*splat}/:folderId", folderController.folderFilesGet)
libRouter.post("/folder", folderController.folderPost);
libRouter.get("/", authLibraryRouter, libController.libGet);

module.exports = libRouter;