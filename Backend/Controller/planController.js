const plans = require("../Models/plansModel.json");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const planspath = path.join(__dirname,"..","Models","plansModel.json");

function getAllPlans(req, res) {
    if (plans.length) {
      res.status(200).json({
        message: "Success",
        data: plans,
      });
    } else {
      res.status(404).json({
        message: "No plans found",
      });
    }
  }
  function getPlansById(req, res) {
    let { id } = req.params;
    let filteredPlan = plans.filter(function (plan) {
      return plan.id == id;
    });
    if (filteredPlan.length) {
      res.status(200).json({
        message: "Result found",
        data: filteredPlan[0],
      });
    } else {
      res.status(404).json({
        message: "Result not found",
      });
    }
  }
  function createPlan(req, res) {
    let newPlan = req.body;
    newPlan.id = uuidv4();
    plans.push(newPlan);
    fs.writeFileSync(planspath, JSON.stringify(plans));
  
    res.status(201).json({
      message: "Successfully inserted",
    });
  }
  function deletePlan(req, res) {
    let { id } = req.params;
    let filteredplans = plans.filter(function (plan) {
      return plan.id != id;
    });
    if (filteredplans.length == plans.length) {
      res.status(404).json({
        message: "Id not found",
      });
    } else {
      fs.writeFileSync(planspath, JSON.stringify(filteredplans));
  
      res.status(201).json({
        message: "Successfully deleted",
      });
    }
  }
  function updatePlan(req, res) {
    let { id } = req.params;
    let updateOb = req.body;
  
    let filteredplans = plans.filter(function (plan) {
      return plan.id == id;
    });
    if (filteredplans.length) {
      let plan = filteredplans[0];
  
      for (key in updateOb) plan[key] = updateOb[key];
      fs.writeFileSync(planspath, JSON.stringify(plans));
  
      res.status(201).json({
        message: "Successfully updated",
      });
    } else {
      res.status(404).json({
        message: "Failed..id not found",
      });
    }
  }

  module.exports.getAllPlans = getAllPlans;
  module.exports.getPlansById = getPlansById;
  module.exports.createPlan = createPlan;
  module.exports.deletePlan = deletePlan;
  module.exports.updatePlan = updatePlan;