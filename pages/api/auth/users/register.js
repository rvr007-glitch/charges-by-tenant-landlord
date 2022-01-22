import { connectToDatabase } from "../../../../db/connect";
import { sendError } from "../../../../helpers/help";
import { sendSuccess } from "../../../../helpers/help";
import { send } from "../../../../utility/sendMail";
var constants = require("../../../../helpers/constants");
const bcrypt = require("bcrypt");
var Landlord = require("../../../../models/landlord");
const { isEmail, isAlpha, isNumeric } = require("validator");
//var nodemailer = require("nodemailer");

export default async function handler(req, res) {
  var PASSWORD = generatePassword();
  console.log("Password::::" + PASSWORD);

  if (req.method === "POST") {
    if (!req.body.email || !req.body.contact || !req.body.name) {
      return sendError(res, "Missing fields", constants.MISSING_FIELD_I);
    }

    if (!isEmail(req.body.email)) {
      return sendError(res, "Email invalid", constants.INVALID_EMAIL);
    }

    if (!isAlpha(req.body.name)) {
      return sendError(res, " Name invalid", constants.INVALID_FNAME);
    }

    if (!isNumeric(req.body.contact)) {
      return sendError(res, "Name invalid", constants.INVALID_CONTACT);
    }

    const newUser = new Landlord({
      name: req.body.name,

      email: req.body.email,
      contact: req.body.contact,
      username: emailUsername(req.body.email),
      password: PASSWORD,
    });

    var { email } = newUser;

    Landlord.findOne({ email }, function (err, data) {
      if (err) {
        return sendError(res, "Email Error", constants.EMAIL_ERROR);
      } else if (data) {
        return sendError(res, "Account already exist", constants.ACCOUNT_EXIST);
      }
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return sendError(res, "Bcrypt error", constants.BAD_REQUEST);
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) return sendError(res, err, constants.HASH_PASSWORD);
        newUser.password = hash;
        newUser.save(function (err, data) {
          if (err) {
            return sendError(res, err.message, constants.REGISTER_ERROR);
          } else {
            send(
              data.email,
              "Confirmation Mail with Password",
              `Your current password for login is: <h1>${PASSWORD}</h1>.`
            );
            return sendSuccess(res, data);
          }
        });
      });
    });
  } else {
    return sendError(res, "server error", 500);
  }
}

function generatePassword() {
  //create a function to create a password and send it to the registered mail
  return Math.random().toString(36).slice(-8);
}

function emailUsername(EMAIL) {
  return EMAIL.match(/^(.+)@/)[1];
}
