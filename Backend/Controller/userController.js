
const userModel = require("../Models/usersModel");

async function createUser(req, res) {
  try{
    let newUser = req.body;
    let user = await userModel.create(newUser);
    res.status(200).json({
      message: "User created successfuly",
      data: user
      })
  }
  catch(error){
    res.status(501).json({
    message: "User creation failed..!!",
    error: error.errors.discount.message
    });
  }};
 
async function getAllUsers(req, res) {
  try{
    let users = await userModel.find({})
    res.status(200).json({
      message: "Got All Users successfuly",
      data: users
      })
  }
  catch(error){
    res.status(404).json({
      message: "No Users found..!!",
      error: error
      });
  }}

async function getUsersById(req, res) {
  try{
    let { id } = req.params;
    let user = await userModel.findById(id);
    res.status(200).json({
      message: "Result found",
      data: user,
    });
  }
  catch
  {
    res.status(404).json({
    message: "Result not found",
    });
  }
}
  
async function deleteUser(req, res) {
  try{
    let { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.status(200).json({
      message:"Delete Successful",
      
    })
  }
  catch{
      res.status(404).json({
      message: "Delete Failed..",
    });
  }}
  
  
async function updateUser(req, res) {
  try{
  let { id } = req.params;
  let updateOb = req.body;
  let updatedUser = await userModel.findByIdAndUpdate(id,updateOb,{new:true})
  res.status(200).json({
    message: "Successfully updated",
      });
  }
  catch{
    res.status(501).json({
    message: "Failed..to update User",
    
    });
  }
}
  
module.exports.getAllUsers = getAllUsers;
module.exports.getUsersById = getUsersById;
module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
