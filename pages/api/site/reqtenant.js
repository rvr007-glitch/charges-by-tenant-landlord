import { sendSuccess, sendError } from "../../../helpers/help";
var constants = require("../../../helpers/constants");
const mongoose = require("mongoose");
var Tenant = require("../../../models/tenant");
var Site = require("../../../models/site");
var History = require("../../../models/history");
import { auth } from "../../../utility/auth";
const jwt = require("jsonwebtoken");
const {isEmail, isMongoId} = require("validator")
const bcrypt = require("bcrypt");
const config = require("../../../config/config");

export default async function handler(req, res) {

  
  if(req.method == "POST"){
    var siteId = req.body.siteId
    var email = req.body.email

    if(!siteId || !email){
      return sendError(res,"pleasee enter all details",500)
    }

    if(!isEmail(email)){
      return sendError(res,"invalid email",500)
    }

    if(!isMongoId(siteId)){
      return sendError(res,"invalid mongo id", 500)
    }

    Site.findById(siteId, function(err,siteData){
      if(err)return sendError(res,err.message,500)
      else{
            var landlord_id;
            auth(req, res, (err, Data) => {

              if(err) return sendError(res,err.message,500)
              landlord_id = Data.id;
            });

            if(landlord_id == siteData.landlord_id){
              if(siteData.status === "0"){
                Tenant.find({email:email}, function(err, TenantData){
                  if(err){return sendError(res,err.message,500)}
                  else{
                  if(TenantData[0]?._id){
                    var newHist = new History({
                      tenant_id: TenantData[0]._id,
                      site_id: siteId,
                      requested_at: Date.now()
                    })
  
                    newHist.save(function(err, histData){
                      if(err){return sendError(res,err.message, 500)}
                      Site.findByIdAndUpdate(siteId, {$set:{status:"1"}, $push:{history:histData._id}}, function(err,updateSData){
                        if(err)return sendError(res,err.message,500)
                        Tenant.findByIdAndUpdate(TenantData[0]._id, {$push:{history:histData._id}}, function(err,updateTData){
                          if(err)return sendError(res,err.message,500)
                          else{
                            Site.findById(siteId, function(err,data){
                              if(err)return sendError(res,err.message,500)
                              else{
                                return sendSuccess(res,data)
                              }
                            })
                          }
                        })
                      })
                    })
                  }
                  else{
                    return sendError(res,"No such tenant",500)
                  }
                }
                })
              }
              else{
                return sendError(res,"can't send request",500)
              }
            }
            else{
              return sendError(res,"not authorize",500)
            }
          }
      })
  }
}

