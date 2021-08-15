const plansModel = require("../Models/plansModel");

function getDemoPage(req, res) {
  //res.render("demo.pug",{title:"Demo Page"});
  res.render("base.pug");
}
function getHomePage(req, res) {
   res.render("home.pug", {name:req.name});
}
function getloginPage(req, res) {
  res.render("login.pug",{name:req.name});
}
function getSingUpPage(req, res) {
  res.render("signup.pug",{name:req.name});
}
async function getPlansPage(req,res){
  try { 
    let getplans = await plansModel.find();
    res.render("plans.pug",{plans:getplans, name:req.name});
  }
  catch(error){

  }
  
}

module.exports.getDemoPage = getDemoPage;
module.exports.getHomePage = getHomePage;
module.exports.getloginPage = getloginPage;
module.exports.getSingUpPage = getSingUpPage;
module.exports.getPlansPage = getPlansPage;
