const express = require("express");
const path = require('path');

const fileManager = require("../routes/file-manager.route");
const sendEmail = require("../routes/send-email.route");
const user = require("../routes/user.route");
const dashboard = require("../routes/dashboard.route");
const post = require("../routes/cookie.route");
const google = require("../routes/google.route")
const linkedin = require("../routes/linkedin.route");
const sofTask = require("../routes/task.route");
const contract = require("../routes/contract.route");

module.exports = (app) => {

  app.use("/api/file", fileManager);
  app.use("/api/email",  sendEmail);
  app.use("/api/user",  user);
  app.use("/api/dashboard", dashboard);
  app.use("/api/post",  post);
  app.use("/auth/google",  google);
  app.use("/auth/linkedin",  linkedin);
  app.use("/api/task", sofTask);
  app.use("/api/contract",contract);

  //  app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname,'/build/index.html'))
  // });


/**
 * @swagger
 * tags:
 *  name: RootApi
 *  description: Root Get Api
 */

 /**
 *  @swagger
 * /:
 *  get: 
 *    summary: Base of routes
 *    tags: [RootApi]
 *    description: Get Root 
 *    parameters:
 *        -   out: header
 *            name: access-session
 *            example: Bearer Your Session...
 *    responses :
 *      200:
 *        description: success
 *      500:
 *        description: failed
 *      
 */
  app.get("/", (req, res) => {
    try{
    console.log('SESSION', req.session);
    console.log('SessionId', req.sessionID);
    console.log('USER', req.user);

      /// res.render("App", {pageTitle:"SofTesting"});
      console.log(`Session:${req.session.page_views}`);
       if(req.session.page_views) {
         req.session.page_views++;
         res.send(`Session:${req.session.page_views}`);
       }else{
         req.session.page_views=1;
         res.send('Welcome to this page!');
       }
       return 200;
      }
      catch(error){
        return error;
      } 
    });



  const dir = "./uploaded-files";
  const picturesDir = `${dir}/photos`;
  const documentsDir = `${dir}/documents`;

  app.use("/uploaded-files", express.static(dir));
  app.use("/pictures", express.static(picturesDir));
  app.use("/docs", express.static(documentsDir));

 
  
};
