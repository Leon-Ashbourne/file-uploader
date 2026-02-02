const { Router } = require("express");

const libController = require("../controllers/libController");
const filesController = require("../controllers/filesController");
const authLibraryRouter = require("./auth/authLibraryRouter");
const folderController = require("../controllers/folderController");
const error = require("../controllers/errorController");
const editController = require("../controllers/modifyfiles/editFilesController");
const editFolderController = require("../controllers/modifyfiles/editFoldersController");

const libRouter = Router();

//edit route
libRouter.get("/files-{*splat}/:fileId/edit", editController.editFileGet);
libRouter.get("/folder-{*splat}/:folderId/fe40lk77e1835qt00e/:fileId/edit", editController.editFileGet);
libRouter.get("/folder-{*splat}/:folderId/edit", editFolderController.editFolderGet);

libRouter.post("/files/f1e37rg840d1sfad4/:fileId", editController.editFilePost);
libRouter.post("/folder/k0y1o-9874ha48fdl/:fileId", editFolderController.editFolderPost);

libRouter.post("/files", filesController.filesPost);
libRouter.get("/files-{*splat}/:fileId", filesController.fileGet);

libRouter.get("/folder-{*splat}/:folderId/fe40lk77e1835qt00e/:fileId", filesController.folderFileDetailsGet)
libRouter.get("/folder-{*splat}/:folderId", folderController.folderFilesGet);
libRouter.post("/folder-d0f4e1548ad9e4f162300/:folderId", filesController.filesFromFolderPost);

libRouter.post("/folder", folderController.folderPost);
libRouter.get("/", authLibraryRouter, libController.libGet);

libRouter.use("/{*splat}", error);

module.exports = libRouter;