const  mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { contractUISchema } = require("../secure/contractValidation");

const contractSchema = new Schema(
    {
        contractName: {
            type: String,
            normalize: true,
            trim: true,
            unique: true,
            required: true,
            lowercase:true,

        },
        email: {
            type: String,
            normalize: true,
            trim: true,
            required: true,
            lowercase:true,
        },
        sign: {
            type: Boolean,
            required: true,
            default: '0',
            minLength: 1,
            maxLength: 1,   
            ///1:signed  0:noSign
        },
        sendEmail:{
            type: Boolean,
            required: true,
            default: '0',
            minLength: 1,
            maxLength: 1,   
            ///1:send  0:notSend
        },
        signDate: {
            type: String,
            required: true,
            default: '0',
        },
          createDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
    }
);


contractSchema.statics.contractValidation = function (body) {
    return contractUISchema.validate(body, { abortEarly: false });
}

module.exports = mongoose.model("contract", contractSchema);