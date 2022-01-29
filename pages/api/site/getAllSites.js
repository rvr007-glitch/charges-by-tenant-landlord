const Site = require("../../../models/site");
import constants from "../../../helpers/constants";
import { sendError, sendSuccess } from "../../../helpers/help";
import { auth } from "../../../utility/auth";
const Landlord = require("../../../models/landlord");
const mongoose = require("mongoose")


export default async function handler(req, res) {
    //get
    if (req.method == "GET") {
      Siteget(req, res);
    }
  }


const Siteget = async (req, res) => {
    var landlord_id;
    auth(req, res, (err, data) => {
      if (err) return sendError(res, err.msg, constants.JWT_ERROR);
      else {
        landlord_id = data.id;
      }
    });
  
    try {
  
  
      Site.aggregate([
        { $match: { landlord_id: mongoose.Types.ObjectId(landlord_id) } },
              {
                $lookup: {
                  from: "histories",
                  localField: "history",
                  foreignField: "_id",
                  as: "history",
                },
              },
              {
                $lookup: {
                  from: "tenants",
                  localField: "history.tenant_id",
                  foreignField: "_id",
                  as: "current_tenant"
                }
              },
              // {
              //   $project: {
              //     _id: 1,
              //     landlord_id:1,
              //     alias_name: 1,
              //     rent: 1,
              //     deposit: 1,
              //     Type: 1,
              //     status: 1,
              //     current_tenant: 1,
              //     address: 1
  
              //   }
              // }
      ]).then(siteData => {
        if(!siteData[0]) return sendError(res, "No site Found", constants.BAD_REQUEST);
        console.log(siteData[0]?.landlord_id, landlord_id)
        if(siteData[0].landlord_id != landlord_id) return sendError(res, "UnAuthorize Access", 402)
        return sendSuccess(res, siteData)
      })
  
    } catch (err) {
      return sendError(res, err.message, 400);
    }
  };
  