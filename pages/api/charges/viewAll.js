import { sendSuccess, sendError } from "../../../helpers/help";
var constants = require("../../../helpers/constants");
import connectMongoDb from "../../../db/connect";

var Landlord = require("../../../models/landlord");
var Transaction = require("../../../models/transaction")
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

        var data = await Transaction.find({landlord_id: landlordId}).populate('charge_id')
        if(data){
            return sendSuccess(res, data)
        }
        else{
            return sendError(res, "error in finding paid data", 500)
        }
    }
    else{
        return sendError(res, "ROUTE NOT FOUND", constants.NOT_FOUND)
    }
}