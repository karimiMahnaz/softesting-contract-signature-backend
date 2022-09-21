const  mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { profileUISchema } = require("../secure/profileValidation");

const userProfileSchema = new Schema(
    {
        userName: {
            type: String,
            trim: true,
            required: true,

        },
        email: {
            type: String,
            normalize: true,
            trim: true,
            unique: true,
            required: true,
            lowercase:true,
        },
        phone: {
            type: String,
            trim: true,
            required: true
        },
        country: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 50,

        },
        education: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 100,

        },
        companyName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 100,

        },
        role: {
            type: String,
            required: true,
            default: '0000000000',
            minLength: 10,
            maxLength: 10,   
            ///1:requestor  2:provider

        },
        teams: {
            type: String,
            required: true,
            default: '0'.repeat(30),
            minLength: 30,
            maxLength: 30,
         // 1:UI/UX Design 2: developmnt 3:security 4:QA
        },
        imageName: {
            type: String,
            default: '',
            maxLength: 50,

        },
        Description: {
            type: String,
            default: '',
            maxLength: 500,
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
    




userProfileSchema.statics.profileValidation = function (body) {
    return profileUISchema.validate(body, { abortEarly: false });
}

module.exports = mongoose.model("profile", userProfileSchema);