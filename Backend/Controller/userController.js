const users = require("../Models/usersModel.json");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const userspath = path.join(__dirname,"..","Models","usersModel.json");

function getAllUsers(req, res) {
    if (users.length) {
      res.status(200).json({
        message: "All users found",
        data: users,
      });
    } else {
      res.status(404).json({
        message: "No user found",
      });
    }
  }
  function getUserById(req, res) {
    let { id } = req.params;
    let user = users.filter(function (user) {
      return user.id == id;
    });
    if (user.length) {
      res.status(200).json({
        message: "User Found",
        data: user[0],
      });
    } else {
      res.status(404).json({
        message: "User not Found",
      });
    }
  }
  function createUser(req, res) {
    let newUser = req.body;
    newUser.id = uuidv4();
    users.push(newUser);
    fs.writeFileSync(userspath, JSON.stringify(users));
  
    res.status(201).json({
      message: "Successfully inserted",
    });
  }
  function updateUser(req, res) {
    let { id } = req.params;
    let userOb = req.body;
    let filteredUser = users.filter(function (user) {
      return user.id == id;
    });
    if (filteredUser.length) {
      let user = filteredUser[0];
      for (key in userOb) user[key] = userOb[key];
  
      fs.writeFileSync(userspath, JSON.stringify(users));
      res.status(200).json({
        message: "user updated",
      });
    } else {
      res.status(404).json({
        message: "user not found",
      });
    }
  }
  function deleteUser(req, res) {
    let { id } = req.params;
    let filteredUser = users.filter(function (user) {
      return user.id != id;
    });
    if (filteredUser.length != users.length) {
      fs.writeFileSync(userspath, JSON.stringify(filteredUser));
  
      res.status(201).json({
        message: "Successfully deleted",
      });
    } else {
      res.status(404).json({
        message: "user not found",
      });
    }
  }

  module.exports.getAllUsers = getAllUsers;
  module.exports.getUserById = getUserById;
  module.exports.createUser = createUser;
  module.exports.updateUser = updateUser;
  module.exports.deleteUser = deleteUser;