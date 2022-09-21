
const express = require("express");
const Usercontroller = require("../controllers/user.controller") ;
const { ensureAuth, ensureGuest } = require("../middlewares/auth");
const router = express.Router();


router.post("/", [ensureGuest], Usercontroller.linkedinSignIn, Usercontroller.rememberMe);
router.get("/callback", Usercontroller.linkedinCallback );
router.get("/success", Usercontroller.linkedinSuccess );
router.get("/failed", (req, res )=> {
    console.log('failed', req);
    res.status(405).send({error:'linkedin Login Failed'})
});

router.get('/getUserCredentials', Usercontroller.getUserCredentials);

module.exports = router;