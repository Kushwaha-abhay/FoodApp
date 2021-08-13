const express = require("express");
const userRouter = express.Router();

const {getAllUsers,getUsersById,createUser,deleteUser,updateUser} = require("../Controller/userController");
const {singup,login, protectRoute,forgetPassword,resetPassword} = require("../Controller/authController");

userRouter.post("/signup",singup);
userRouter.post("/login",login);
userRouter.post("/forgetPassword", forgetPassword);
userRouter.patch("/resetPassword/:token", resetPassword);
// userRouter
// .route("")
// .get(getAllUsers)
// .post(createUser);

userRouter
.route("")
.get(protectRoute,getUsersById)
.patch(protectRoute,updateUser)
.delete(protectRoute,deleteUser);


module.exports = userRouter;