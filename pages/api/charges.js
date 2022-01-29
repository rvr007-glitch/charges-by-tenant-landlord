const mongoose = require("mongoose");
const Charge = require("../../models/Charge");
const Tenant = require("../../models/tenant")
const History = require("../../models/history")
const Site = require("../../models/site")
import connectMongoDb from "../../db/connect";
import constants from "../../helpers/constants";
import { sendError, sendSuccess } from "../../helpers/help";
import {auth} from "../../utility/auth"
export default async function Sitesave(req, res) {
  if (req.method === "POST") {
    var { site_id, tenant_id, description } = req.body;
    if (!site_id) {
      return sendError(res, "Site can not be null", 400);
    }
    if (!tenant_id) {
      return sendError(res, "Tenant id can not be null", 400);
    }
    if (!description) {
      return sendError(res, "Description can not be null", 400);
    }

    var landlord_id;
    auth(req, res, (err, authData)=>{
      if(err) return sendError(res, err.message, constants.JWT_ERROR)
      else{
        landlord_id = authData.id
      }
    })
    
    //check weather the tenant_id given is current tenant for the given site
    try {
      Site.findById(site_id, (err, siteData) => {
        if(err) return sendError(res, err.message, constants.SERVER_ERROR);
        else if(!siteData) return sendError(res, "No Site Found for the given ID..", constants.BAD_REQUEST);
        else {
          if(siteData.landlord_id != landlord_id ) return sendError(res, "UnAuth Access", constants.UNAUTHORIZE)
          else if(siteData.status !='2') return sendError(res, "Waiting for the Tenant's Response", constants.UPDATE_ERROR)
          var {history} = siteData;
          var lengthOfHistory = history.length;
          // console.log(history[0])
          var currentHistory;
          if(lengthOfHistory) currentHistory = history[lengthOfHistory-1];
          else return sendError(res, "There is No tenant for the site!", constants.NOT_FOUND);

          History.findById(currentHistory, (err, HistoryData) => {
            if(err) return sendError(res, err.message, constants.SERVER_ERROR);
            else if(!HistoryData) return sendError(res, "No History Found for the site", constants.NOT_FOUND);
            else{
              if(HistoryData.tenant_id != tenant_id) return sendError(res, "Wrong Tenant Id For the site", constants.BAD_REQUEST)
              else{
                //create the charges after its veirfied that the site is been alloted and the tenant is valid
                try {
                  var newCharges = new Charge({
                    site_id: req.body.site_id, 
                    tenant_id: req.body.tenant_id,
                    landlord_id,
                    isPaid: req.body.isPaid,
                    description: req.body.description,
                  });
                  newCharges.save((err, charges) => {
                    if(err) return sendError(res, err.message, constants.BAD_REQUEST)
                    return sendSuccess(res,charges, 200);
                  });
                } catch (err) {
                  return sendError(res, err.message, 500);
                }
              }
            }
          })
        }
      })
    } catch (error) {
      return sendError(res, error.message, constants.BAD_REQUEST)
    }
  }
  else if(req.method === "DELETE")
  {
    //delete the charges
    var landlord_id;
    auth(req, res,(err, authData)=>{
      if(err) return sendError(res, err.message, constants.JWT_ERROR);
      landlord_id = authData.id;
    })
    if(!req.body.chargesId) return sendError(res, "Missing History ID", constants.MISSING_FIELD_I)
    Charges.findById(req.body.chargesId, (err, charges) => {
      if(err) return sendError(res, err.message, constants.BAD_REQUEST);
      if(!charges) return sendError(res, "No Charges for the given Charges ID", constants.BAD_REQUEST);
      else{
        Site.findById(charges.site_id, (err, site) => {
          if(err) return sendError(res, err.message, constants.BAD_REQUEST);
          else if(site.landlord_id  != landlord_id) return sendError(res, "UnAuth Access", constants.UNAUTHORIZE);
          else{
            if(!charges.isPaid){
              Charge.findByIdAndDelete(charges._id, (err, history) => {
                if(err) return sendError(res, err.message, constants.BAD_REQUEST);
                else{
                  return sendSuccess(res, "DELETED");
                }
              })
            }else{
              return sendError(res, "Charge can't be Deleted as its already Paid, Please Contact Tenant", constants.CHARGES_ERROR)
            }
          }

        })
      }
    })
  }
  else{
    return sendError(res, "USE POST METHOD", constants.SERVER_ERROR)
  }
}
