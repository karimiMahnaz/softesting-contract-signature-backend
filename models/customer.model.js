const { mongoose } = require("mongoose");

const customerSchema = new mongoose.Schema({
    name:{type:String, default:''},
    email:{type:String, default:'' , lowercase:true},
    phone:{type:String, default:''},
    Description:{type:String, default:''},
},
);

const customer = mongoose.model('customer',customerSchema)

module.exports = customer;