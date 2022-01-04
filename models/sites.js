const mongoose = require("mongoose");
const {isDate} = require("validator")
const {isPostalCode} = require("validator")

const sitesSchema = new mongoose.Schema({
    landlord_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Landlord",
       required:true,
    },

    alias_name:{
        type:String,
        required:true
    },

    address:[{
        first_line:{
            type:String,
            required:[true,'Please enter your address'],
            
        },
        city:{
            type:String,
            required:[true,'Please enter your city']
        },
        state:{
            type:String,
            required:[true,'Please enter your state']
        },
        Country:{
            type:String,
            required:[true,'Please enter your country']
        },
        pincode:{
            type:String,
            required:[true,'Please enter your pincode'],
            
        },
        landmark:{
            type:String,
            //not setting required as true, keeping it optional
        }

    }],

    rent:{
        type:Number,
        required:[true,'Please enter rent']
    },

    deposit:{
        type:Number,
        required:[true,'Please enter deposit amount']
    },

    isOcuupied:{
        type:Boolean,
    },

    charges_param:{
type:Object,
required:true
    },

    type_site:{
        enum:['Room','Land','Shops'],
        type:String,
        required:true
    },

    alloted_tenant:{
        type:Array
    },

    date:{
        type:Date,
        required:[true,'Please generate date'],
        default:Date.now
    },

    history:{
        type:Array
    },
    current_tenant:{
        type:mongoose.Schema.Types.ObjectId,
        
       
    },
    requested_tenant:{
        type:mongoose.Schema.Types.ObjectId,
      
       
    }

},{timestamps:true});

module.exports = mongoose.models.Sites||mongoose.model("Sites",sitesSchema)