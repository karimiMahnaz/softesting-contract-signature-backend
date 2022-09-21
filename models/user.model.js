const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const bcryptSalt = process.env.BCRYPT_SALT;

const { signUpSchema } = require("../secure/signUpValidation");

const userSchema = new Schema(
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
        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 30,

        },
        verificationCode:{
            type: String,
            minLength: 4,
            maxLength: 30,
        },
        role:{
            type: String,
            required: true,
            default: 'user',
        },
        googleId: {
            type: String,
            trim: true,
            default: '',
        },
        linkdinId: {
            type: String,
          //  trim: true,
            default: '',
        },
        githubId: {
            type: String,
          //  trim: true,
            default: '',
        },
        facebookId: {
            type: String,
        //    trim: true,
            default: '',
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

userSchema.pre("update", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
    this.password = hash;
    next();

});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
    this.password = hash;
    next();

});

userSchema.statics.userValidation = function (body) {
    return signUpSchema.validate(body, { abortEarly: false });
}
module.exports = mongoose.model("user", userSchema);