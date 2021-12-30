import { connectToDatabase } from "../../db/db"
const mongoose = require("mongoose");
const Site =require("../../models/sites");
export default async function  Sitesave(req, res) {
    if (req.method === 'POST') {
        try {
         
            var newSite =
             new Site({
                alias_name: req.body.alias_name,
                address:[{
                    first_line:req.body.first_line,
                    city:req.body.city,
                    state:req.body.state,
                    Country:req.body.Country,
                    pincode:req.body. pincode,
                    landmark:req.body. landmark,



                }],

                rent: req.body.rent,
                deposit:req.body.deposit,
                isOcuupied:req.body. isOcuupied,
                
    charges_param:[{
        electricity:req.body.electricity,
        water:req.body.water,
        food:req.body.food,
    }],
    type_site:req.body.type_site,
    alloted_tenant:req.body.alloted_tenant,
    history:req.body.history,


    
            })
           

            var site = await newSite.save();
            res.status(200).json(site);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
       else {
        res.status(200).json({ name: 'Site' });
        // Handle any other HTTP method
      }
 
  }
