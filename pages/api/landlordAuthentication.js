// const mongoose = require("mongoose")
// require("../../models/Landlord")
// var Landlord = mongoose.model("Landlord")

// import connectMongoDb from "../../db/db"

// connectMongoDb()

// export default async function handler(req, res) {

//     if (req.method === 'POST') {

//       //processing the POST request
//       try {
//         //take the input from the users
//         var {name, email, username, contact} = req.body;

//         //for the email check weather the eamil is already registered or not in the validator or over here
//         var password = "q2345678" //create a function that creates a random password
//         var landlord = new Landlord({
//           name, email, username, contact, password
//         });

//         await landlord.save()
//         return sendSuccess(res, landlord)

//       } catch (error) {
//         console.log(error)
//         return res.status(500).json({msg: error.message});
//       }
//       } else if(req.method == 'GET') {
//         // Handle any other HTTP method
//         res.json("the request has been recieved");
//       }

// }
