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

export default async function handler(req,res){
    if(req.method == "POST"){
        var siteId = req.body.siteId

        if(!siteId){
            return sendError(res,"siteId is not provided",500)
        }

        if(!isMongoId(siteId)){
            return sendError(res,"invalid siteId",500)
        }

        Site.findById(siteId,function(err,siteData){
            if(err)return sendError(res,err.message,500)
            else{
                var landlord_id
                auth(req, res, (err, Data) => {
                    if(err) return sendError(res,err.message,500)
                    landlord_id = Data.id;
                })

                if(landlord_id == siteData?.landlord_id){
                    //removing only those tenant that are living on site, not those whose request are pending
                    if(siteData.status === "2"){
                        var historyId = siteData.history[siteData.history.length - 1]
                        
                        Site.findByIdAndUpdate(siteId, {$set:{status:"0"}}, function(err,siteNewData){
                            if(err){
                                return sendError(res,err.message,500)
                            }
                            else{
                                History.findByIdAndUpdate(historyId, {$set:{status:"2", left_at: Date.now()}}, function(err,data){
                                    if(err){
                                        return sendError(res,err.message,500)
                                    }
                                    else{
                                        return sendSuccess(res,data)
                                    }

                                })
                            }
                        })
                    }
                    else{
                        return sendError(res,"no one to remove",500)
                    }
                }
                else{
                    return sendError(res,"not authorize",500)
                }
            }
        })
    }
}