const express = require("express");
const userRouter = express.Router();

const {getAllUsers,getUsersById,createUser,deleteUser,updateUser} = require("../Controller/userController");

userRouter.route("").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUsersById).patch(updateUser).delete(deleteUser);



module.exports = userRouter;