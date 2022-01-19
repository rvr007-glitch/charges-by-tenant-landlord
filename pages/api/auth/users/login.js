import { connectToDatabase } from "../../../../db/connect";
import { sendError } from "../../../../helpers/help";
import { sendSuccess } from "../../../../helpers/help";
var constants = require("../../../../helpers/constants");
var Landlord = require("../../../../models/landlord");
const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const config = require("../../../../config/config");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const bearerHeader = req.headers["authorization"];
    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
      // Split at the space
      const bearer = bearerHeader.split(" ");
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      jwt.verify(req.token, config.SECRET_KEY, (err, authData) => {
        if (err) return sendError(res, err, constants.JWT_VERIFY);
        Landlord.findById(authData.id, function (err, data) {
          if (err) {
            return sendError(res, err, constants.SERVER_ERROR);
          } else if (!data) {
            return sendError(
              res,
              "No Account Exist",
              constants.ACCOUNT_NOT_EXIST
            );
          }
          authData.profile = data;
          return sendSuccess(res, authData);
        });
      });
    } else {
      return sendError(res, "Token not provided", constants.NULL_TOKEN);
    }
  } else {
    return sendError(res, "server error", 500);
  }
}
