const mongoose = require("mongoose");
const Site = require("../../models/sites");
import { sendError, sendSuccess } from "../../helpers/help";

///POST
export default async function Sitesave(req, res) {
  if (req.method === "POST") {
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
        landlord_id: req.body.landlord_id, //token
        alias_name: req.body.alias_name,
        address: [
          {
            first_line: req.body.first_line,
            city: req.body.city,
            state: req.body.state,
            Country: req.body.Country,
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

      const site = await newSite.save();
      return sendSuccess(res, "Site has been Created", 200);
    } catch (err) {
      console.log(err);
      return sendError(res, "Site Creation failed !!!!!", 500);
    }
  } else {
    res.status(200).json({ name: "Site " });
    // Handle any other HTTP method
  }
}
