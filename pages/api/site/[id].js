const Site = require("../../../models/sites");
import { sendError, sendSuccess } from "../../../helpers/help";
const Landlord=require("../../../models/landlord")
export default async function handler(req, res) {
    //get
    if (req.method == "GET") {
        Siteget(req, res)
    }

    // Delete
    if (req.method == "DELETE") {
        Sitedelete(req, res)

    }
    if (req.method == "PUT") {
        Siteput(req, res)
    }
}
const Siteget = async (req, res) => {

    try {
        const { id } = req.query;
        const data = id;
        if (data == null) {
            return sendError(res, "Query Fetchng Unsuccessful !!", 400);
        }
        console.log(data);

        const siteinfo = await Site.findById(data).populate('landlord_id');

        return sendSuccess(res, siteinfo);
    }

    catch (err) {
        return sendError(res, err.message, 400);
    }
}
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
            }
            else { return sendSuccess(res, "Site has been Deleted", 200); }
        });


    } catch (err) {
        sendError(res, "Deletion Failed", 500);
    }
}
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
                    $set: req.body,//not updating internal object elements
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
}
