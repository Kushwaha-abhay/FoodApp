const express = require("express");
const app = express();
const plans = require("./dB/plans.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
//const users = require("./dB/users.json");
// mongoose = require("mongoose");
const userModel = require("../../Backend/Models/usersModel");
/*------MiddleWares---------*/
//It tracks incoming requests and if there is data in request => feeds the data in req body
app.use(express.json());

app.post("/api/users/login",async function(req,res){
  try{
    let {email,password} = req.body;
  }
  catch(error{

  }
})
//custom middleware
app.use(function (req, res, next) {
  // console.log("middleware 1");
  next();
});
// mongoose
//   .connect(
//     "mongodb+srv://admin:admin@cluster0.tayec.mongodb.net/test?retryWrites=true&w=majority",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then((db) => console.log(db));

  // let planschema = new mongoose.Schema({
  //   name:String,
  //   price:Number
  // });
  // const planModel = mongoose.model("planCollection" , planschema);
  // planModel.create({
  //   name:"Ram",
  //   price:1234
  // }).then(
  //   (plan) =>{
  //     console.log(plan)
  //   }).catch(
  //   (error)=>{
  //     console.log(error);
  //   }
  // )
/*---------------users--------*/
//get all users
app.get("/api/users", function (req, res) {
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
});
//get user by id
app.get("/api/users/:id", function (req, res) {
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
});
//create a user
app.post("/api/users", function (req, res) {
  let newUser = req.body;
  newUser.id = uuidv4();
  users.push(newUser);
  fs.writeFileSync("./dB/users.json", JSON.stringify(users));

  res.status(201).json({
    message: "Successfully inserted",
  });
});
//update a user
app.patch("/api/users/:id", function (req, res) {
  let { id } = req.params;
  let userOb = req.body;
  let filteredUser = users.filter(function (user) {
    return user.id == id;
  });
  if (filteredUser.length) {
    let user = filteredUser[0];
    for (key in userOb) user[key] = userOb[key];

    fs.writeFileSync("./dB/users.json", JSON.stringify(users));
    res.status(200).json({
      message: "user updated",
    });
  } else {
    res.status(404).json({
      message: "user not found",
    });
  }
});

app.delete("/api/users/:id", function (req, res) {
  let { id } = req.params;
  let filteredUser = users.filter(function (user) {
    return user.id != id;
  });
  if (filteredUser.length != users.length) {
    fs.writeFileSync("./dB/users.json", JSON.stringify(filteredUser));

    res.status(201).json({
      message: "Successfully deleted",
    });
  } else {
    res.status(404).json({
      message: "user not found",
    });
  }
});

/*---------------plans--------*/
//get all plans
app.get("/api/plans", function (req, res) {
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
app.delete("/api/plans/:id", function (req, res) {
  let { id } = req.params;
  let filteredplans = plans.filter(function (plan) {
    return plan.id != id;
  });
  if (filteredplans.length == plans.length) {
    res.status(404).json({
      message: "Id not found",
    });
  } else {
    fs.writeFileSync("./dB/plans.json", JSON.stringify(filteredplans));

    res.status(201).json({
      message: "Successfully deleted",
    });
  }
});
//update a plan
app.patch("/api/plans/:id", function (req, res) {
  let { id } = req.params;
  let updateOb = req.body;

  let filteredplans = plans.filter(function (plan) {
    return plan.id == id;
  });
  if (filteredplans.length) {
    let plan = filteredplans[0];

    for (key in updateOb) plan[key] = updateOb[key];
    fs.writeFileSync("./dB/plans.json", JSON.stringify(plans));

    res.status(201).json({
      message: "Successfully updated",
    });
  } else {
    res.status(404).json({
      message: "Failed..id not found",
    });
  }
});

//sever
app.listen(3000, function () {
  console.log("server started at 3000");
});
