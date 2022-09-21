

const express = require("express");
const Usercontroller = require("../controllers/user.controller") ;
const { ensureAuth, ensureGuest } = require("../middlewares/auth");
const router = express.Router();


////router.post("/", [ensureGuest], Usercontroller.googleSignIn, Usercontroller.rememberMe);
router.post("/", Usercontroller.googleSignIn);
router.get("/callback", Usercontroller.googleCallback );
router.get("/success", Usercontroller.googleSuccess );
router.get("/failed", (req, res )=> {
    console.log('failed', req);
    res.status(405).send({error:'Google Login Failed'})
});
module.exports = router;