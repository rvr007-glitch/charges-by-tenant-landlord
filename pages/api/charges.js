const mongoose = require("mongoose");
const Charges = require('../../models/charges')
import connectMongoDb from "../../db/connect";
import { sendError, sendSuccess } from "../../helpers/help";
export default async function Sitesave(req, res) {
    if (req.method === 'POST') {
        var { site_id, tenant_id, isPaid, description } = req.body;
        if (!site_id) {
            return sendError(res, "Site can not be null", 400);
        }
        if (!tenant_id) {
            return sendError(res, "Tenant id can not be null", 400);
        }
        if (!description) {
            return sendError(res, "Description can not be null", 400);
        }

        try {
            var newCharges =
                new Charges({
                    site_id: req.body.site_id,//token
                    tenant_id: req.body.tenant_id,


                    isPaid: req.body.isPaid,
                    description: req.body.description,

                })
            const charges=await newCharges.save();
            return sendSuccess(res,"Charges has been Created",200);
        }
        catch (err) {
            
            return sendError(res, "Charges Creation failed !!!!!",500);
        }
        
      
    }
}