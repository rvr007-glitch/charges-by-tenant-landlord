import { sendSuccess, sendError } from "../../../helpers/help";
var constants = require("../../../helpers/constants");
import connectMongoDb from "../../../db/connect";

var Landlord = require("../../../models/landlord");
const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const config = require("../../../config/config");
//const {isEmail} = require("validator");
//var nodemailer = reuire("nodemailer");

export default async function handler(req, res) {
  if (req.method == "POST") {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        //error beacuse new password was unable to hash
        return sendError(res, err, constants.HASH_PASSWORD);
      }
    }
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
        else {
          try {
            var { occupation, verification, address, account } = req.body;
            console.log(account.acc_num);

            if (!verification) {
              return sendError(res, "Verification field empty", 500);
            }
            if (!address.city) {
              return sendError(res, "City can't be empty", 500);
            }
            if (!address.state) {
              return sendError(res, "State can't be empty", 500);
            }
            if (!address.first_line) {
              return sendError(res, "firstline of address can't be empty", 500);
            }
            if (!address.Country) {
              return sendError(res, "Country of address can't be empty", 500);
            }
            if (!address.pincode) {
              return sendError(res, "Pincode of address can't be empty", 500);
            }
            if (!occupation) {
              return sendError(
                res,
                "Occupation of address can't be empty",
                500
              );
            }
            if (!account.acc_num) {
              return sendError(res, "Account no. can't be empty", 500);
            }
            if (!account.ifsc) {
              return sendError(res, "ifsc code  can't be empty", 500);
            }

            /**
             * validate required fields occ , accn, uid(empty,string),address
             *  find by id and update landlord
             * if(!addresss.city)
             *   */

            Landlord.findByIdAndUpdate(
              authData.id,
              {
                address: {
                  first_line: req.body.first_line,
                  city: req.body.address.city,
                  state: req.body.address.state,
                  Country: req.body.address.Country,
                  pincode: req.body.address.pincode,
                  landmark: req.body.address.landmark,
                },
                DOB: req.body.DOB,
                occupation: req.body.occupation,
                verification: req.body.verification,

                account: {
                  acc_num: req.body.account.acc_num,
                  ifsc: req.body.account.ifsc,
                },
              },
              (err, data) => {
                return sendSuccess(res, data);
              }
            );
          } catch (err) {
            console.log(err);
            return sendError(res, err.message, 500);
          }
        }
      });
    } else {
      // Forbidden
      //currently not possible because we are loged in and token is available to us
      return sendError(res, "token not availanle", constants.NULL_TOKEN);
    }
  } else if (req.method === "PUT") {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        //error beacuse new password was unable to hash
        return sendError(res, err, constants.HASH_PASSWORD);
      }
    }
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
        else {
          Landlord.findByIdAndUpdate(
            authData.id,
            { $set: req.body },
            function (err, data) {
              if (err)
                return sendError(res, err.message, constants.UPDATE_ERROR);
              else if (data) return sendSuccess(res, data);
            }
          );

          return sendSuccess(res, constants.OK);
        }
      });
    } else {
      // Forbidden
      //currently not possible because we are loged in and token is available to us
      return sendError(res, "token not availanle", constants.NULL_TOKEN);
    }
  }
}
