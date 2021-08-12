const express = require("express");
const planRouter = express.Router();
const {
  getAllPlans,
  createPlan,
  getPlansById,
  deletePlan,
  updatePlan,
} = require("../Controller/planController");
planRouter.route("").get(getAllPlans).post(createPlan);
planRouter.route("/:id").get(getPlansById).patch(updatePlan).delete(deletePlan);

module.exports = planRouter;
