const passport = require("passport");
const { Strategy } = require("passport-local");
const bcrypt = require("bcrypt");

const Usermodel = require("../models/user.model") ;


passport.use(
    new Strategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const user = await Usermodel.findOne({ email });
            if (!user) {
                return done(null, false, {
                    message:"This email address is not registered",
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return done(null, user); //req.user
            } else {
                return done(null, false, {
                    message: "Email address or password is not valid",
                });
            }
        } catch (err) {
            console.log(err);
        }
    })
);


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
