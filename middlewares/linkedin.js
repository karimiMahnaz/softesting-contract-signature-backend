const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const Usermodel = require("../models/user.model") ;


    passport.use(new LinkedInStrategy({
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL:"https://softestingca.com/signin"
   //   callbackURL: "http://localhost:8000/auth/linkedin/callback"
      },
       async (request, token, tokenSecret, profile, done) => {
      
        try {
          const linkedinUser = await Usermodel.findOne({ linkedinId : profile.linkedinId });
          console.log('googleUser',linkedinUser)
          if (!linkedinUser) {
            
                  //  return done(null, false, {
                  //      message:"TokenId is not registered",
                  //  });

                  await Usermodel.create({
                                
                    userName : profile.name,  //profile.name.givenName //profile.name.familyName
                    password : profile.password,   // profile.photos[0].value
                    linkdinId : profile.linkdinId,
                    googleId : '',
                    githubId :'',
                    facebookId: '',
                    email : profile.email
                  })

    } else 
    {
      return done(null, profile);
    }
} catch (err) {
  console.log('linkedin error', err );
   }
}

    ));



