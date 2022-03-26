const Site = require("../../../models/site");
import constants from "../../../helpers/constants";
import { sendError, sendSuccess } from "../../../helpers/help";
import { auth } from "../../../utility/auth";
const Landlord = require("../../../models/landlord");
const mongoose = require("mongoose")

export default async function handler(req, res) {
  //get
  if (req.method == "GET") {
    Siteget(req, res);
  }

  // Delete
  if (req.method == "DELETE") {
    Sitedelete(req, res);
  }
  if (req.method == "PUT") {
    Siteput(req, res);
  }
}
const Siteget = async (req, res) => {
  var landlord_id;
  auth(req, res, (err, data) => {
    if (err) return sendError(res, err.msg, constants.JWT_ERROR);
    else {
      landlord_id = data.id;
    }
  });

  try {
    const { id } = req.query;
    const data = id;
    if (data == null) {
      return sendError(res, "Site Id can't be NULL it should be a valid MongoId", 400);
    }

    console.log(data)

    //aggreagting using site id
    Site.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(data) } },
            {
              $lookup: {
                from: "histories",
                localField: "history",
                foreignField: "_id",
                as: "history",
              },
            },
            {
              $lookup: {
                from: "tenants",
                localField: "history.tenant_id",
                foreignField: "_id",
                as: "tenantsDetails",
              },
            }
    ]).then(siteData => {
      if(!siteData[0]) return sendError(res, "No site Found", constants.BAD_REQUEST);
      // console.log(siteData[0]?.landlord_id, landlord_id)
      if(siteData[0].landlord_id != landlord_id) return sendError(res, "UnAuthorize Access", 402)
      return sendSuccess(res, siteData)
    })

  } catch (err) {
    return sendError(res, err.message, 400);
  }
};





const Sitedelete = async (req, res) => {
  try {
    const { id } = req.query;
    const data = id;
    if (data == null) {
      return sendError(res, "Query Fetchng Unsuccessful !!", 400);
    }

    Site.findByIdAndRemove(data, function (err, docs) {
      if (!err) {
        console.log("Deleted", docs);
      }
      if (!docs) {
        return sendError(res, "Site Alredy Deleted", 400);
      } else {
        return sendSuccess(res, "Site has been Deleted", 200);
      }
    });
  } catch (err) {
    sendError(res, "Deletion Failed", 500);
  }
};
const Siteput = async (req, res) => {
  try {
    const { id } = req.query;
    const data = id;
    if (data == null) {
      return sendError(res, "Query Fetchng Unsuccessful !!", 400);
    }

    if (data === req.body.landlord_id) {
      const updatedSite = await Site.findByIdAndUpdate(
        data,
        {
          $set: req.body, //not updating internal object elements
        },
        { new: true }
      );
      sendSuccess(res, "Site has been Updated");
    } else {
      return sendError(res, "You can update only your own site !!", 403);
    }
  } catch (err) {
    return sendError(res, "Site Updation Failed!!", 500);
  }
};
