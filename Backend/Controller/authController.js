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
function isAdmin(roles){

}
async function protectRoute(req,res,next){
  try{
    const token = req.header.authorization.split(" ").pop();
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
async function forgetPassword(req,res){
try{
  let {email} = req.body;
  let user = await userModel.findOne({email : email});
  console.log(user);
  if(user)
  {
    let token = user.createPwdToken();
    console.log(token);
    await user.save({validateBeforeSave:false});
    let resetlink = `http://localhost:3000/api/users/resetPassword/${token}`;
    res.status(200).json({
      message : "Reset Password",
      resetlink
    });
  }
  else{
  res.status(404).json({
    message : "User not registered"
  })
}}
catch(error){
  res.status(501).json({
    message : "Failed to forget password"
  })
}
}
async function resetPassword(req,res){
  try {
let {password,confirmPassword} = req.body;
let token = req.params.token;
const user = await userModel.findOne({
  pwdToken : token,
  tokenTime :{ $gt : Date.now()}
})
if(user)
{
user.resetPasswordHandler(password,confirmPassword);
user.save();
res.status(200).json({
  message :"Reset password Success"
})
}
else
{
  res.status(501).json({
    message :"link Expired..!!"
  })
}
  }
  catch(error){
    res.status(501).json({
      message :"Reset password failed..!!",
      error
    })
  }

}
module.exports.singup = singup;
module.exports.login = login;
module.exports.protectRoute = protectRoute;
module.exports.isAuthorized = isAuthorized;
module.exports.isAdmin = isAdmin;
module.exports.forgetPassword = forgetPassword;
module.exports.resetPassword = resetPassword;

