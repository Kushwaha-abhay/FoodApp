const express = require("express");
const userRouter = express.Router();

const {getAllUsers,getUserById,createUser,deleteUser,updateUser} = require("../Controller/userController");

userRouter.route("").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

















module.exports = userRouter;