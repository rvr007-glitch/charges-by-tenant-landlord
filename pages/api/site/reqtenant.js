import { sendSuccess, sendError } from "../../../helpers/help";
var constants = require("../../../helpers/constants");
const mongoose = require("mongoose");
var Tenant = require("../../../models/tenant");
var Sites = require("../../../models/sites");
var History = require("../../../models/history");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const config = require("../../../config/config");

export default async function handler(req, res) {
  if (req.method === "POST") {
    var siteId = "61d887d294331617558a91c3";
    var siteData = await Sites.findById(siteId);
    if (siteData) {
      if (siteData.status === "0") {
        var tenantData = await Tenant.find({ email: req.body.email });
        if (tenantData) {
          var newHist = new History({
            site_id: siteId,
            tenant_id: tenantData[0]._id,
            requested_at: Date.now(),
          });

          var histData = await newHist.save();

          if (histData) {
            console.log(histData);
            var data = await Sites.findByIdAndUpdate(histData.site_id, {
              $set: { tenant: histData.tenant_id, status: "1" },
              $push: { history: histData._id },
            });
            if (data) {
              return sendSuccess(res, { data });
            } else {
              return sendError(res, "some error", constants.SERVER_ERROR);
            }
          } else {
            return sendError(
              res,
              "error in saving history data",
              constants.SERVER_ERROR
            );
          }
        } else {
          return sendError(res, "no such tenant exist", constants.SERVER_ERROR);
        }
      } else {
        return sendError(
          res,
          "can't send request as status is not 0",
          constants.SERVER_ERROR
        );
      }
    } else {
      return sendError(res, "no such site exist", constants.SERVER_ERROR);
    }
  }
}
