const express = require("express");
const viewsRouter = express.Router();
const {getHomePage,getloginPage,getSingUpPage,getPlansPage} = require("../Controller/viewsController");
const {isLoggedIn,logout} = require("../Controller/authController");

viewsRouter.use(isLoggedIn);
viewsRouter.route("").get(getHomePage);
viewsRouter.route("/login").get(getloginPage);
viewsRouter.route("/logout").get(logout);
viewsRouter.route("/signup").get(getSingUpPage);
viewsRouter.route("/plans").get(getPlansPage);



module.exports = viewsRouter;