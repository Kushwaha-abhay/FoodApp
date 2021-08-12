const express = require("express");
const app = express();

const planRouter = require("./Routers/plansRouter");
const userRouter = require("./Routers/usersRouter");

/*------MiddleWares---------*/
//It tracks incoming requests and if there is data in request => feeds the data in req body
app.use(express.json());

//custom middleware
// app.use(function (req, res, next) {
//   // console.log("middleware 1");
//   next();
// });

app.use("/api/plans",planRouter);
app.use("/api/users",userRouter);




//sever
app.listen(3000, function () {
  console.log("server started at 3000");
});
