const express = require("express");
const viewsRouter = express.Router();
const {getDemoPage,getHomePage,getloginPage} = require("../Controller/viewsController");



viewsRouter.route("").get(getDemoPage);
viewsRouter.route("/home").get(getHomePage);
viewsRouter.route("/login").get(getloginPage);



module.exports = viewsRouter;