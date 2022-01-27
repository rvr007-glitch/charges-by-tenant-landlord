const mongoose = require("mongoose");
const { isDate, isPostalCode } = require("validator");
const sitesSchema = new mongoose.Schema(
  {
    landlord_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    alias_name: {
      type: String,
      required: true,
    },

    address: {
      first_line: {
        type: String,
        required: [true, "Please enter your address"],
      },
      city: {
        type: String,
        required: [true, "Please enter your city"],
      },
      state: {
        type: String,
        required: [true, "Please enter your state"],
      },
      country: {
        type: String,
      },
      pincode: {
        type: String,
      },
      landmark: {
        type: String,
      },
    },

    rent: {
      type: Number,
      required: [true, "Please enter rent"],
    },

    deposit: {
      type: Number,
      required: [true, "Please enter deposit amount"],
    },

    status: {
      type: String,
      default: "0",
      required:true
    },

    charges_param: {
      type: Object,
      required: true
    },
    Type: {
      enum: ["Room", "Land", "Shops"],
      type: String,
      required: true,
    },

    history: {
      type: Array,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.models.Site || mongoose.model("Site", sitesSchema);
