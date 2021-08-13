const express = require("express");
const userRouter = express.Router();

const {getAllUsers,getUsersById,createUser,deleteUser,updateUser} = require("../Controller/userController");
const {singup,login, protectRoute} = require("../Controller/authController");

// userRouter
// .route("")
// .get(getAllUsers)
// .post(createUser);

userRouter
.route("")
.get(protectRoute,getUsersById)
.patch(protectRoute,updateUser)
.delete(protectRoute,deleteUser);

userRouter.post("/signup",singup);
userRouter.post("/login",login);

module.exports = userRouter;