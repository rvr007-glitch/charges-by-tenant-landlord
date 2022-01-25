const mongoose = require("mongoose");
const Site = require("../../models/sites");
import { sendError, sendSuccess } from "../../helpers/help";
import { auth } from "../../utility/auth";

///POST
export default async function Sitesave(req, res) {
  if (req.method === "POST") {
    var landlord_id;
    auth(req, res, (err, data) => {
      
      if(err) return sendError(res,err.message,500)
      landlord_id = data.id;
    });
    
    try {
      var { alias_name, rent, deposit, charges_param, type_site } = req.body;
      if (!alias_name) {
        return sendError(res, "Alias name is not provided", 400);
      }
      if (!rent) {
        return sendError(res, "Rent of the Site is not provided", 400);
      }
      if (!deposit) {
        return sendError(res, "Please Mention the Deposit", 400);
      }

      if (!type_site) {
        return sendError(res, "Type of Site cant be left empty", 400);
      }
      var newSite = new Site({
        landlord_id, //token
        alias_name: req.body.alias_name,
        address: [
          {
            first_line: req.body.first_line,
            city: req.body.city,
            state: req.body.state,
            Country: req.body.country,
            pincode: req.body.pincode,
            landmark: req.body.landmark,
          },
        ],

        rent: req.body.rent,
        deposit: req.body.deposit,
        isOcuupied: req.body.isOcuupied,

        charges_param: req.body.charges_params,
        type_site: req.body.type_site,
        alloted_tenant: req.body.alloted_tenant,
        history: req.body.history,
      });


      newSite.save(function(err, siteData){
        
        Landlord.findByIdAndUpdate(siteData.landlord_id, {
          $push: { site_list: siteData._id },
        }, (err, data)=>{
          if(err) return sendError(res, "Pushing Site id in Landlord schema error", constants.UPDATE_ERROR)
          return sendSuccess(res, siteData)
        })
      });

    } catch (err) {
      console.log(err);
      return sendError(res, err.message, 500);
    }
  } else {
    return sendError(res, "Route Not Found", 404);
    // Handle any other HTTP method
  }
}
