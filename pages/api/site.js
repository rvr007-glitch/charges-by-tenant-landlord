const mongoose = require("mongoose");
const Site = require("../../models/site");
import constants from "../../helpers/constants";
import { sendError, sendSuccess } from "../../helpers/help";
import {connectMongoDb} from "../../db/connect"
import { auth } from "../../utility/auth";
const Landlord = require("../../models/landlord")


///POST
export default async function Sitesave(req, res) {
  if (req.method === "POST") {
    var landlord_id;
    auth(req, res, (err, data) => {
      
      if(err) return sendError(res,err.message,500)
      landlord_id = data.id;
    });
    
    try {
      var { alias_name, rent, deposit, Type } = req.body;
      if (!alias_name) {
        return sendError(res, "Alias name is not provided", 400);
      }
      if (!rent) {
        return sendError(res, "Rent of the Site is not provided", 400);
      }
      if (!deposit) {
        return sendError(res, "Please Mention the Deposit", 400);
      }

      if (!Type) {
        return sendError(res, "Type of Site cant be left empty", 400);
      }
      var newSite = new Site({
        landlord_id, //token
        alias_name: req.body.alias_name,
        address: 
          {
            first_line: req.body.first_line,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            pincode: req.body.pincode,
            landmark: req.body.landmark,
          },
        rent: req.body.rent,
        deposit: req.body.deposit,
        isOcuupied: req.body.isOcuupied,
        charges_param: req.body.charges_params,
        Type: req.body.Type,
        alloted_tenant: req.body.alloted_tenant,
        history: req.body.history,
      });


      let siteData =  await newSite.save()
        if(!siteData) return sendError(res, "Site Creation Failed!", constants.BAD_REQUEST)
        Landlord.findByIdAndUpdate(siteData.landlord_id, {
          $push: { site_list: siteData._id },
        }, (err, data)=>{
          if(err) return sendError(res, "Pushing Site id in Landlord schema error", constants.UPDATE_ERROR)
          return sendSuccess(res, siteData)
        })
    

    } catch (err) {
      console.log(err);
      return sendError(res, err.message, 500);
    }
  } else {
    return sendError(res, "Route Not Found", 404);
    // Handle any other HTTP method
  }
}
