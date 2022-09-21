const bcrypt = require("bcrypt");
const passport = require("passport");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const bcrypt1 = require("bcrypt");
const fs = require("fs");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const Usermodel = require("../models/user.model");
const userProfileSchema = require("../models/profile.model");
const userContractSchema = require("../models/contract.model");
let sendEmail = require("../email/sendEmail");

exports.userRole = async(req, res, next) => {
console.log('---------------role ')

  const {email} = req.query;
  
  const user = await Usermodel.findOne({email});

    res.send(user.role );
    
}

exports.login = async(req, res, next) => {
   //esignature app
   
  const { email } = req.body;
 try {
   const user = await Usermodel.findOne({ email });

   if (!user) {
    
     const error = new Error("Email was not found!");
     error.statusCode = 400;
     throw error;
   } else {
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "10h",
       const token = jwt.sign({ userId: user._id }, 'mfefkuhio3k2rjkofn2mbikbkwjhnkj', {
       expiresIn: "10h",
     });

         
     return res.status(200).send({ token: `${token}` 
      , email:`${email}`
      , userId:user._id  });
   }
 } catch (err) {
   
   next(err);
 }
   
};


exports.getProfileImage = async (req, res, next) => {
  try {
    // console.log('aaaaaaaaaaaaaaaa')
    // const buffer = fs.readFileSync(req.query.url);
    // console.log('buffer' , buffer);
    //  fs.writeFileSync('img', buffer);

    ////res.download(req.query.url);
    //   var imageAsBase64 = fs.readFileSync(req.query.url, 'base64');
    console.log(req.query.url);
    fs.existsSync(req.query.url, (err, data) => {
      if (err) throw err;
    });
    fs.readFile(req.query.url, (err, data) => {
      if (err) throw err;
      ////   res.writeHead(200,{'Content-type':'image/*'});
      console.log("data", data);
      return res.end(data);

      //      console.log('data',data)
      //      const json = JSON.stringify({ blob: data.toString("base64") });
      //      return json ;

      //    //    let binary = Buffer.from(data); //or Buffer.from(data, 'binary')
      //       // let imgData = new Blob(binary.buffer, { type: 'application/octet-binary' });
      //   return  fs.readFileSync("img") ;
      //fs.readFileSync("img") ;
      //res.json(req.query.url.split("/")[3]);
    });

    // const response = await fetch(req.query.url, {
    //     method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //     mode: 'cors', // no-cors, *cors, same-origin
    //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     headers: {
    //         'Content-Type': 'image/*'
    //     }
    // })
    // const blob = await response.blob();
    // let i =  URL.createObjectURL(blob);
    ////console.log('response', response)

    ///  return response;
  } catch (error) {
    console.error(`get: error occurred ${error}`);
    return error;
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    console.log(req.body.email);
    console.log(req.body.imageName);
    const filter = { email: req.body.email };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        imageName: req.body.imageName,
      },
    };

    const result = await userProfileSchema.updateOne(
      filter,
      updateDoc,
      options
    );

    //----copy

    // const folderName = `./public/uploaded-profile/${req.body.email}_profile`;

    //   if (!fs.existsSync(folderName)) {
    //       fs.mkdirSync(folderName);
    //   }

    //  const filePath = `./uploaded-files/${req.body.email}_profile/${req.body.imageName}`;
    //  const filePathCopy = `./public/uploaded-profile/${req.body.email}_profile/${req.body.imageName}`;

    //  fs.copyFile(filePath, filePathCopy, (err) => {
    //      if (err) throw err;

    console.log("File Copy Successfully.");
    // });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
 
  //esignature app && softesting
 
  try {
 //     var userEmail = req.cookies['email'];
  //    if (!userEmail) { userEmail = req.query.email }
      const userEmail = req.query.email.replaceAll('"', '');
      console.log('userEmail', userEmail)
      const userProfile = await userProfileSchema.findOne({ email: userEmail });
      if (userProfile) {
          console.log('profile', userProfile)
          res.json(userProfile);
      } else {
          const user = await Usermodel.findOne({ email: userEmail });
                console.log('user', user)
          res.json(user);
      }
  }
  catch (error) {
      console.log('error11111', error)
      next(error);

  }
}


exports.profile = async (req, res, next) => {
  let role;
  let teams;

  ///console.log('--------------profile method')
  try {
    await userProfileSchema.profileValidation(req.body);
    const {
      userName,
      phone,
      email,
      education,
      country,
      companyName,
      requester,
      provider,
      design,
      develop,
      security,
      qa,
    } = req.body;

    const Profile = await userProfileSchema.findOne({ email });
    role = "0000000000";

    if (requester) {
      role = "1" + role.substring(1);
    } else {
      role = "0000000000";
    }
    if (provider) {
      role = role.substring(0, 1) + "1" + "00000000";
    } else {
      role = role.substring(0, 1) + "0" + "00000000";
    }
    teams = "0".repeat(30);

    if (design) {
      teams = "1" + "0".repeat(29);
    } else {
      teams = "0".repeat(30);
    }
    if (develop) {
      teams = teams.substring(0, 1) + "1" + "0".repeat(28);
    } else {
      teams = teams.substring(0, 1) + "0".repeat(29);
    }
    if (security) {
      teams = teams.substring(0, 2) + "1" + "0".repeat(27);
    } else {
      teams = teams.substring(0, 3) + "0".repeat(27);
    }
    if (qa) {
      teams = teams.substring(0, 3) + "1" + "0".repeat(26);
    } else {
      teams = teams.substring(0, 3) + "0".repeat(27);
    }

    if (!Profile) {
      ///  console.log('not exists--------------profile method')
      console.log("role", role);
      console.log("teames", teams);
      console.log("req.body.pictureName", req.body);
      await userProfileSchema.create({
        userName: req.body.userName,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
        education: req.body.education,
        companyName: req.body.companyName,
        role: role,
        teams: teams,
        imageName: req.body.pictureName,
      });
    } else {
      console.log("------------------profile exits");

      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          userName: req.body.userName,
          phone: req.body.phone,
          country: req.body.country,
          education: req.body.education,
          companyName: req.body.companyName,
          role: role,
          teams: teams,
          imageName: req.body.pictureName,
        },
      };

      const result = await userProfileSchema.updateOne(
        filter,
        updateDoc,
        options
      );

      // const error = new Error("Error in update!");
      // error.statusCode = 400;
      // error.message = "Error in update!"
      // throw error;
    }
    // const appLink = "softestingca.com/appDownLoad";

    // const subject = "SofTesting SignUp";
    // const payload = { name: userName , link: appLink};
    // const template = "signUpWelcome.html";

    //  sendEmail(email, subject, payload, template);

    return res.status(200).send("Is Done.");
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};


exports.reCaptcha = async (req, res, next) => {
  try {
    if (
      !req.body["reCaptcha"] ||
      req.body["reCaptcha"] === undefined ||
      req.body["reCaptcha"] === null
    ) {
      /// res.status(400).message("ReCaptcha is not valid.");
      const error = new Error("ReCaptcha is not valid.");
      error.statusCode = 400;
      error.message = "ReCaptcha is not sent.";
      throw error;
    }

    const secretKey = process.env.LOCAL_SECRET_KEY;
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body["reCaptcha"]}
    &remoteip=${req.connection.remoteAddress}`;

    //   credentials: 'same-origin',
    //    redirect: 'follow',
    //    agent: null,
    ///  console.log(req.connection.remoteAddress);

    const response = await fetch(verifyUrl, {
      method: "post",

      Headers: {
        Accept: "application/json",
        "Content-Type": "application/'json'; charset=utf-8",
      },
    });

    const json = await response.json();
    ///    console.log(json);
    if (json.success) {
    } else {
      ///  res.status(400).json({ message: "ReCaptcha is not valid." });
      const error = new Error("ReCaptcha is not valid.");
      error.statusCode = 422;
      error.message = "ReCaptcha is not valid.";
      throw error;
    }

    return res.status(200).send({ message: "ReCaptcha is valid." });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    if (
      !req.body.email ||
      req.body.email === undefined ||
      req.body.email === null
    ) {
      const error = new Error("Data is not valid.");
      error.statusCode = 401;
      throw error;
    } else {
      ///      console.log("passport user", req.body.email);
      passport.authenticate("local", {
        ///  successRedirect: "/",
        //    failureRedirect: "/",
        failureFlash: true,
      })(req, res, next);

      res.cookie("email", req.body.email, {
        maxAge: 600 * 60 * 1000,
      });
    }
  } catch (error) {
    next(error);
  }
};

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}

exports.googleSignIn = async (req, res, next) => {
  try {
    const users = [];

    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    ///console.log(ticket.getPayload());
    const { name, email, sub } = ticket.getPayload();
    upsert(users, { userName: name, email, googleId: sub });
    res.status(201);
    res.json({ name, email });

    const googleUser = await Usermodel.findOne({ email });
    console.log("googleUser", googleUser);
    if (!googleUser) {
      await Usermodel.create({
        userName: name, //profile.name.givenName //profile.name.familyName
        password: "123456789", // profile.photos[0].value
        linkdinId: "",
        googleId: sub,
        githubId: "",
        facebookId: "",
        email: email,
        phone: "123456789",
      });
    }
    // passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

exports.googleCallback = (req, res, next) => {
  passport.authenticate("google", {
    failureMessage: "Google Login Failed",
    failureRedirect: "https://localhost:3000/signin",
  }),
    //  failureRedirect: 'https://softestingca.com/signin' }),
    (req, res) => {
      res.redirect("https://localhost:3000/signin");
      // res.redirect('https://softestingca.com/signin');
    };
  next();
};

exports.googleSuccess = (req, res) => {
  res.send(`Welcome ${req.email}`);
};

exports.linkedinSignIn = (req, res, next) => {
  try {
    passport.authenticate("linkedin", { scope: ["profile", "email"] })(
      req,
      res,
      next
    );
  } catch (error) {
    next(error);
  }
};

exports.linkedinCallback = (req, res, next) => {
  passport.authenticate("linkedin", {
    failureMessage: "linkedin Login Failed",
    failureRedirect: "/auth/linkedin/failed",
  }),
    (req, res) => {
      res.redirect("auth/linkedin/success");
    };
  next();
};

exports.linkedinSuccess = (req, res) => {
  res.send(`Welcome ${req.email}`);
};

exports.getUserCredentials = (req, res) => {
  const user = {};
  const code = req.query.code;
  const accessToken = getAccessToken(code);
  const userProfile = getUserProfile(accessToken);
  const userEmail = getUserEmail(accessToken);
  let resStatus = 400;
  if (!(accessToken === null || userProfile === null || userEmail === null)) {
    user = userBuilder(userProfile, userEmail);
    resStatus = 200;
  }
  // Here, you can implement your own login logic
  // to authenticate new user or register him
  signUp_post(user);
  res.status(resStatus).json({ user });
};

const getAccessToken = (code) => {
  let accessToken = null;
  const config = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };
  const parameters = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.REDIRECT_URI,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  };
  // axios
  //   .post(
  //     "https://www.linkedin.com/oauth/v2/accessToken",
  //     qs.stringify(parameters),
  //     config
  //   )
  //   .then((response) => {
  //     accessToken = response.data["access_token"];
  //   })
  //   .catch((err) => {
  //     console.log("Error getting LinkedIn access token");
  //   });
  return accessToken;
};

const getUserProfile = (accessToken) => {
  let userProfile = null;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  // axios
  //   .get(
  //     "https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))",
  //     config
  //   )
  //   .then((response) => {
  //     userProfile.firstName = response.data["localizedFirstName"];
  //     userProfile.lastName = response.data["localizedLastName"];
  //     userProfile.profileImageURL =
  //       response.data.profilePicture[
  //         "displayImage~"
  //       ].elements[0].identifiers[0].identifier;
  //     // I mean, couldn't they have burried it any deeper?
  //   })
  //   .catch((error) => console.log("Error grabbing user profile"));
  return userProfile;
};

const getUserEmail = (accessToken) => {
  const email = null;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  // axios
  //   .get(
  //     "https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))",
  //     config
  //   )
  //   .then((response) => {
  //     email = response.data.elements[0]["handle~"];
  //   })
  //   .catch((error) => console.log("Error getting user email"));

  return email;
};

const userBuilder = (userProfile, userEmail) => {
  return {
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    profileImageURL: userProfile.profileImageURL,
    email: userEmail,
  };
};

exports.rememberMe = (req, res, next) => {
  if (req.body.remember) {
    req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000; //1 day 24
  } else {
    req.session.cookie.expire = null;
  }
  return res.status(200).send({ message: "SignIn Done." });
  //res.redirect("/")
};

exports.signUp_get = (req, res) => {
  res.send("Hello  signUp ");
};

exports.signUp_post = async (req, res, next) => {
  const errors = [];

  try {
    await Usermodel.userValidation(req.body);
    const { userName, phone, email, password } = req.body;

    const user = await Usermodel.findOne({ email });
    if (!user) {
      await Usermodel.create(req.body);
    } else {
      if (
        (user.googleId !== "" ||
          user.linkdinId !== "" ||
          user.githubId !== "" ||
          user.facebookId !== "") &&
        user.phone === "123456789"
      ) {
            await Usermodel.updateOne({email} , {phone});
    
            const bcryptSalt1 = process.env.BCRYPT_SALT;

            const hash = await bcrypt1.hash(password, Number(bcryptSalt1));
            const q = await Usermodel.findOneAndUpdate(
              { email },
              { password: hash }
            );

      } else {
        errors.push({ message: "You are already registered!" });
        ///  return res.errors;
        const error = new Error("You are already registered!");
        error.statusCode = 400;
        error.message = "You are already registered!";
        error.data = errors;
        throw error;
      }
    }
    const appLink = "https://softestingca.com";

    const subject = "SofTesting SignUp";
    const payload = { name: userName, link: appLink };
    const template = "signUpWelcome.html";

    sendEmail(email, subject, payload, template);

    return res.status(200).send("Is Done.");
  } catch (error) {
    next(error);
    // err.inner.forEach(e => {
    //     errors.push
    //         ({
    //             name: e.path,
    //             message: e.message
    //         })
    // })
  }
};

exports.resetPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await Usermodel.findOne({ email });

    if (!user) {
      // req.flash("error", "Email is not found");
      //  return res.status(400).message({ error: "Email is not found" });
      const error = new Error("Email was not found!");
      error.statusCode = 400;
      throw error;
    } else {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "10h",
      });

      const uniqueCode = Math.random().toString(36).substring(2, 8);
      const q = await Usermodel.findOneAndUpdate(
        { _id: user._id },
        { 
          verificationCode:uniqueCode
        }
      )

      let resetLink = "";

      if (process.env.NODE_ENV === "development") {
        resetLink = `http://localhost:3000/user/changepassword/:${token}`;
      } else {
        resetLink = `https://softestingca.com/user/changepassword/:${token}`;
      }

      const subject = "Change Password In Softesting ";
      const payload = { name: user.userName, link: resetLink, verificationCode:uniqueCode };
      const template = "requestResetPassword.html";
      sendEmail(user.email, subject, payload, template);
      return res.status(200).send({ token: `${token}` });
    }
  } catch (err) {
    console.log("popopo", err);
    next(err);
  }
};

 
exports.changePassword = async (req, res, next) => {
  const token = req.body.token; //req.params.token;
  const { currentPassword, newPassword } = req.body.data;
  console.log("changePassword", req.body.token);
  console.log("currentPassword", currentPassword);
  console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET, {
      complete: true,
    });
    console.log("decodedToken", decodedToken);
    if (!decodedToken) {
      return res.status(401).send({message:"You don't have permission to change password!"});
     // error.statusCode = 401;
     // throw error.statusCode;
    }
    if (currentPassword === newPassword) {
        return res.status(422).send({message:"New Password is not valid."});
     // const error = new Error("Password confirm is not valid!");
     // error.statusCode = 422;
     // throw error.statusCode;
    }
    console.log(decodedToken.payload.userId);
    const user = await Usermodel.findOne({ _id: decodedToken.payload.userId });
    if (!user) {
       return res.status(404).send({ message: "User is not Found." });
      //const error = new Error("User was not Found!");
      //error.statusCode = 404;
      // return error.statusCode;
    }else{
      if (currentPassword !== user.password  && 
          currentPassword !== user.verificationCode){

            return res.status(405).send({message:"current password or verification code is invalid!"});
          //  error.statusCode = 405;
          //  throw error.statusCode;
          }
    }

    const bcryptSalt1 = process.env.BCRYPT_SALT;

    ////  Usermodel.password = newPassword;
    const hash = await bcrypt1.hash(newPassword, Number(bcryptSalt1));
    const q = await Usermodel.findOneAndUpdate(
      { _id: decodedToken.payload.userId },
      { 
        password: hash ,
        verificationCode:''
      }
    );

    //     function(err, result){
    //     if (err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log(result);
    //     }
    // });
    return res.status(200).send({ message: " Password Reset is Done." });
  } catch (err) {
    console.log("error", err.statusCode);
    // if (!decodedToken) {
    //   return res.status(403).send({ error: "Token is not valid." });
    // }
    next(err);
  }
};

exports.signOut = (req, res, next) => {
  req.session = null;
  req.logout();
  //// req.flash("success_msg", "LogOut");
};
