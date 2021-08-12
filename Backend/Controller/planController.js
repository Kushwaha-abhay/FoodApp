//const plans = require("../Models/plansModel.json");
//const { v4: uuidv4 } = require("uuid");
//const fs = require("fs");
//const path = require("path");
//const planspath = path.join(__dirname,"..","Models","plansModel.json");
const planModel = require("../Models/plansModel");

async function createPlan(req, res) {
  try{
    let newPlan = req.body;
    let plan = await planModel.create(newPlan);
    res.status(200).json({
      message: "Plan created successfuly",
      data: plan
      })
  }
  catch(error){
    res.status(501).json({
    message: "Plan creation failed..!!",
    error: error.errors.discount.message
    });
  }};
 


async function getAllPlans(req, res) {
  try{
    let plans = await planModel.find({})
    res.status(200).json({
      message: "Got All Plans successfuly",
      data: plans
      })
  }
  catch(error){
    res.status(404).json({
      message: "No Plans found..!!",
      error: error
      });
  }}

async function getPlansById(req, res) {
  try{
    let { id } = req.params;
    let plan = await planModel.findById(id);
    res.status(200).json({
      message: "Result found",
      data: plan,
    });
  }
  catch
  {
    res.status(404).json({
    message: "Result not found",
    });
  }
}
  
async function deletePlan(req, res) {
  try{
    let { id } = req.params;
    await planModel.findByIdAndDelete(id);
    res.status(200).json({
      message:"Delete Successful",
      
    })
  }
  catch{
      res.status(404).json({
      message: "Delete Failed..",
    });
  }}
  
  
async function updatePlan(req, res) {
  try{
  let { id } = req.params;
  let updateOb = req.body;
  let updatedPlan = await planModel.findByIdAndUpdate(id,updateOb,{new:true})
  res.status(200).json({
    message: "Successfully updated",
      });
  }
  catch{
    res.status(501).json({
    message: "Failed..to update Plan",
    
    });
  }
}
  
module.exports.getAllPlans = getAllPlans;
module.exports.getPlansById = getPlansById;
module.exports.createPlan = createPlan;
module.exports.deletePlan = deletePlan;
module.exports.updatePlan = updatePlan;
