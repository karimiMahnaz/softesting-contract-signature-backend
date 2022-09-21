const express = require("express");
const { authenticate } = require("passport");

const Usercontroller = require("../controllers/user.controller") ;
const { ensureAuth, ensureGuest } = require("../middlewares/auth");
const router = express.Router();

let v_origin="";

if (process.env.NODE_ENV==='development') {
    v_origin="http://localhost:3000";
}else{
    v_origin="https://softestingca.com";
}

let coreOptions= {
     origin:v_origin,
     methods:['GET','POST'],
     optionsSuccessStatus:200
}
//cors(coreOptions), 

router.get("/",  Usercontroller.login);

router.get("/userRole", Usercontroller.userRole);

router.post("/reCaptcha", Usercontroller.reCaptcha);

router.post("/signIn", [ensureGuest], Usercontroller.signIn, Usercontroller.rememberMe);

router.get("/signUp", Usercontroller.signUp_get);

router.get("/signOut", [ensureAuth], Usercontroller.signOut)

router.post("/signUp", Usercontroller.signUp_post);


router.post("/resetPassword", Usercontroller.resetPassword);

router.post("/changePassword", Usercontroller.changePassword);

router.post("/profile", Usercontroller.profile);

router.get("/getProfile", Usercontroller.getProfile);

router.get("/getProfileImage", Usercontroller.getProfileImage);

router.post("/updateProfile", Usercontroller.updateProfile);

    // const validator = schema.isValid(req.body);
    // validator.then((result) => {
    //     console.log(result);
    //     if (result === true) res.send("All Good");
    //     else res.send("error");
    // });
    // console.log('ffffffffffffffffffffffffffffffff')
    // signUpSchema
    //     .validate(req.body)
    //     .then((result) => {
    //         console.log(result);
    //         res.redirect('/signIn');
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //        // res.send("Errors", { errors: err.errors });
    //        res.status(400).send({ error: err.errors })
    //     });


module.exports = router;
