
const stripe = require('stripe')('sk_test_51JPR10SAQv7kCWEsx2O4qgTHtZZLWbcFMxgmLHhfrhBFQkmlrXARzue8L7I2tPu7ZOnvhHkH9GqjCOP9TFRiPicr00wNiAMFQU')
const planModel = require("../Models/plansModel");
const userModel = require("../Models/usersModel");


async function createPaymentSesion(req,res){
    try{
        let userId = req.id;
     let {planId} = req.body;
    // console.log("planid",req.body);
     let plan = await planModel.findById(planId);
     let user = await userModel.findById(userId);
    //console.log("user",user);
     const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email:user.email,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: plan.name,
              },
              unit_amount: plan.price,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/',
        cancel_url: 'http://localhost:3000/',
      });
      res.status(200).json({session});
    }
    catch(error){
    console.log(error);
    }
    }

    module.exports.createPaymentSesion = createPaymentSesion;
    