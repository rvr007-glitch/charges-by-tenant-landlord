import { sendSuccess, sendError } from "../../../helpers/help";
var constants = require("../../../helpers/constants");
import connectMongoDb from "../../../db/connect";
var Site = require("../../../models/site")
var Landlord = require("../../../models/landlord");
var Transaction = require("../../../models/transaction")
var Charge = require("../../../models/Charge")
const { isMongoId } = require("validator");
// const jwt = require("jsonwebtoken");

// const bcrypt = require("bcrypt");
// const config = require("../../../config/config");
import { auth } from "../../../utility/auth";

export default async function handler(req, res){
    if(req.method === "POST"){
        var siteId = req.body.siteId
        var landlordId;

        if(!siteId) return sendError(res, "siteId not available", 500)

        if(!isMongoId(siteId)) return sendError(res, "invalid siteId", 500)

        auth(req, res, (err, authData) => {
            if(err)return sendError(res, err.message, 500)
            landlordId = authData.id
        })
        Site.findById(siteId, function(err, siteData){
            if(err)return sendError(res, err.message, 500)
            else{
                if(siteData.landlord_id == landlordId){
                    Charge.find({site_id: siteId}).populate({ path: 'tenant_id',select: 'firstName lastName'}).exec(function(err, data){
                        if(err)return sendError(res, err.message, 500)
                        else{
                            return sendSuccess(res, data)
                        }
                    })
                }
                else{
                    return sendError(res, "access denied", 500)
                }
            }
        })

    }
    else{
        return sendError(res, "ROUTE NOT FOUND", constants.NOT_FOUND)
    }
}