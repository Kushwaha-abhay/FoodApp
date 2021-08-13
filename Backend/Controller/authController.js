const userModel = require("../Models/usersModel");
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config/secrets");

async function singup(req, res) {
  try {
    let user = req.body;
    let newUser = await userModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      role: user.role,
    });
    res.status(201).json({
      message: "Singup Success",
      user: newUser,
    });
  } catch (error) {
    res.status(501).json({
      message: "Failed to Singup..!!",
      error,
    });
  }
}
async function login(req, res) {
  try {
    let { email, password } = req.body;
    let presentUser = await userModel.find({email: email});
    
    
    if (presentUser.length) {
      let loggedInuser = presentUser[0];
      
      if (loggedInuser.password == password) {
        //token creation
        
        let token = jwt.sign({id : loggedInuser["_id"]},SECRET_KEY)
        res.status(200).json({
          message: "Login Success",
          data: presentUser[0],
          token
        });
      } else {
        res.status(501).json({
          message: "Id/password did n't match",
        });
      }
    } else {
      res.status(501).json({
        message: "Login failed..",
      });
    }
  } catch (error) {
    res.status(501).json({
      message: "Login failed.catch.",
      error,
    });
  }
}
async function protectRoute(req,res,next){
  try{
    const {token} = req.body;
    const payload = jwt.verify(token,SECRET_KEY);
    
    if(payload)
    {
      req.id = payload.id;
      
      next();
    }
     else
    {
      res.status(501).json({
        message :"Please login"
      })
    }
  }
  catch(error){
    res.status(501).json({
      message :"Please login"
    })
  }
}
async function isAuthorized(req,res,next){
try{
let id = req.id;
let user = await userModel.findById(id);
if(user.role == "admin")
next();
else
res.status(),json({
  mesaage : "You dont have admin rights..!!"
})
}
catch(error){
  res.status(501).json({
    message : "unauthorized"
  })

}
}

module.exports.singup = singup;
module.exports.login = login;
module.exports.protectRoute = protectRoute;
module.exports.isAuthorized = isAuthorized;
