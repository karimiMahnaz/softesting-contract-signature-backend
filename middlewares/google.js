





/* 
const passport =require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usermodel = require("../models/user.model") ;
//const mongoose = require("mongoose");
///console.log(process.env.GOOGLE_CLIENT_SECRET);
///console.log(process.env.GOOGLE_CLIENT_ID);
///module.exports = function (passport) {

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      ///  callbackURL: "https://softestingca.com/signin",
       /// callbackURL: "http://localhost:3000/signin",
       callbackURL: "http://localhost:8000/auth/google/callback",
         passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
        console.log('profile00000',profile);
        try {
        const googleUser = await Usermodel.findOne({ googleId : profile.googleId });
        console.log('googleUser',googleUser)
        if (!googleUser) {
    
                //  return done(null, false, {
                //      message:"TokenId is not registered",
                //  });

                await Usermodel.create({
                                
                                         userName : profile.name,  //profile.name.givenName //profile.name.familyName
                                         password : profile.password,   // profile.photos[0].value
                                         linkdinId : '',
                                         googleId : profile.googleId,
                                         githubId :'',
                                         facebookId: '',
                                         email : profile.email
                                       })

            } else{
                return done(null, profile);
            }
         } catch (err) {
            console.log('google error', err );
        }
      }
    ));

  
        
       

     
//                     return cb(null, Usermodel, {message : "User "});
                    
//                 } else {
//                     var username  = profile.displayName.split(' ');
//                     var userData = new Usermodel({
//                         name : profile.displayName,
//                         userName : username[0],  //profile.name.givenName //profile.name.familyName
//                         password : username[0],   // profile.photos[0].value
//                         linkdinId : '',
//                         googleId : profile.id,
//                         githubId :'',
//                         facebookId: '',
//                         email : profile.emails[0].value
//                     }
//                     // send email to user just in case required to send the newly created
//                     // credentails to user for future login without using google login
//                     userData.save(function (err, newuser) {
//                         if (err) {
//                             return cb(null, false, {message : err + " !!! Please try again"});
//                         }else{
//                             return cb(null, newuser);
//                         }
//                     }
//                 }
//   ));


// //}


//     // passport.use(new GoogleStrategy({
//     //     clientID: GOOGLE_CLIENT_ID,
//     //     clientSecret: GOOGLE_CLIENT_SECRET,
//     //     callbackURL: "http://www.example.com/auth/google/callback"
//     //   },
//     //   function(accessToken, refreshToken, profile, cb) {
//     //     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     //       return cb(err, user);
//     //     });
//     //   }
//     //   ));
// // app.get('/auth/google',
// //   passport.authenticate('google', { scope: ['profile'] }));
 
// // app.get('/auth/google/callback', 
// //   passport.authenticate('google', { failureRedirect: '/login' }),
// //   function(req, res) {
// //     // Successful authentication, redirect home.
// //     res.redirect('/');
// //   });


 */