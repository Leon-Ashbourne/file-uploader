const { Router } = require("express");
const homeController = require("../controllers/homeController");
const error = require("../controllers/errorController");

const homeRouter = Router();

homeRouter.get("/", homeController.homeRender);
homeRouter.use("/{*splat}", error);

module.exports = homeRouter;