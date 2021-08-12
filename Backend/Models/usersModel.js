const mongoose = require("mongoose");
const dblink = require("../Secrets/secrets");
mongoose
  .connect(dblink, { useNewUrlParser: true, useUnifiedTopology: true }
  ).then((db) => console.log("users dB connected..!!"));

let userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: [40, "Your  name is more than 40 characters"]
  },
  Email: {
    type: String,
    required: true,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
    minlength:[6,"Password must be greater than 6 characters"]
  },
  confirmPassword :{
    type: String,
    required: true,
    minlength:[6,"Password must be greater than 6 characters"],
    validate : {
        validator :function(){
          return this.confirmPassword == this.password;
        },
        message:"Password didn't match..!!"
      }
  
  },
  role : {
    type :String,
    enum:["admin","user","resturant owner","delivery boy"],
    default : "user"
}});

let userModel = mongoose.model("userCollection",userschema);
module.exports = userModel;