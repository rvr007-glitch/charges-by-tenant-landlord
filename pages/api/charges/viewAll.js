import { sendSuccess, sendError } from "../../../helpers/help";
var constants = require("../../../helpers/constants");
import connectMongoDb from "../../../db/connect";

var Landlord = require("../../../models/landlord");
var Transaction = require("../../../models/transaction")
var Site = require("../../../models/site")
var Tenant = require("../../../models/tenant")
var Charge = require("../../../models/Charge")
// const { isEmail } = require("validator");
// const jwt = require("jsonwebtoken");

// const bcrypt = require("bcrypt");
// const config = require("../../../config/config");
import { auth } from "../../../utility/auth";

export default async function handler(req, res){
    if(req.method === "GET"){
        var landlordId;
        auth(req, res, (err, authData) => {
            if(err) return sendError(res, err.message, 500)
            landlordId = authData.id
        })

         Transaction.find({landlord_id: landlordId}).populate({
             path: 'charge_id',
             populate: {
                 path: 'site_id',
                 model: 'Site',
                 select: 'alias_name address rent'
             }
         }).populate({
             path: 'tenant_id',
             select: 'firstName lastName email'
         }).exec((err, data) => {
            if(data){
                return sendSuccess(res, data)
            }
            else{
                return sendError(res, "error in finding paid data", 500)
            }
        })
    }
    else{
        return sendError(res, "ROUTE NOT FOUND", constants.NOT_FOUND)
    }
}