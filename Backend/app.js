const express = require("express");
const app = express();
const plans = require("./dB/plans.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
//const users = require("./dB/users.json");
app.use(express.json());
//get all plans
app.get("/api/plans", function (req, res) {
  if (plans.length) {
    res.status(200).json({
      message: "Success",
      data: plans,
    });
  } else {
    res.status(200).json({
      message: "No plans found",
    });
  }
});
//get by id
app.get("/api/plans/:id", function (req, res) {
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
  //for(let )
});

//create a plan
app.post("/api/plans", function (req, res) {
  let newPlan = req.body;
  newPlan.id = uuidv4();
  plans.push(newPlan);
  fs.writeFileSync("./dB/plans.json", JSON.stringify(plans));

  res.status(201).json({
    message: "Successfully inserted",
  });
});
//delete a plan
app.delete("/api/plans/:id",function(req,res){
    let {id} = req.params;
    let filteredplans = plans.filter(function(plan){
        return plan.id != id;
    })
    if(filteredplans.length == plans.length)
    {
        res.status(404).json({
        message: "Id not found",
          });
    }
    else
    {
    fs.writeFileSync("./dB/plans.json", JSON.stringify(filteredplans));

  res.status(201).json({
    message: "Successfully deleted",
  });
}
})
//update a plan
app.patch("/api/plans/:id", function(req,res){
    let {id} = req.params;
    let updateOb = req.body;

    let filteredplans = plans.filter(function(plan){
        return plan.id == id;
    })
    if(filteredplans.length)
    {
        let plan = filteredplans[0];
       
        for(key in updateOb)
        plan[key] = updateOb[key];
        fs.writeFileSync("./dB/plans.json", JSON.stringify(plans));

  res.status(201).json({
    message: "Successfully updated",
  });
 }
    else
    {
        res.status(404).json({
            message: "Failed..id not found",
          });
    }
   
    
})
app.listen(3000, function () {
  console.log("server started at 3000");
});
