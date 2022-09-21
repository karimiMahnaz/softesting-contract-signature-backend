const express = require("express");
const router = express.Router();
const Usermodel = require("../models/user.model");
module.exports = (app) => {


  app.post("/setCookie",  (req, res) => {
    
    console.log('email', req.body.email);
    console.log('cookie',req.cookies);
    //expires: new Date(Date.now() + 600*60*1000),
    const {email} = req.body;
    const user =  Usermodel.findOne({email});
    
  if (email){
    res.cookie('email', email, {            
                        maxAge:600*60*1000,
                      });
                    }
   if (user.userName){
    res.cookie('userName', user.userName, {            
                        maxAge:600*60*1000,
                      });
                    }
     return res.send('Cookie has been sent')
 
 });
 
 app.get("/getCookie",  (req, res) => {
     var userEmail = req.cookies['email'];
     var userName = req.cookies['name'];
     console.log('userEmail', req.cookies['email'])
     if(userEmail){
       return res.send (userEmail, userName);
     }
        return res.send('No cookie found');
    });
 
    //  app.get("/setCookie", async (req, res) => {
    
    //      //// console.log(document.cookie);
    //     console.log(req.cookies);
    //     //expires: new Date(Date.now() + 600*60*1000),
    //     const {email} = req.body;
    //     const user = await Usermodel.findOne({email});

    //     res.cookie('email', email, {
                
    //               maxAge:600*60*1000,
            
    //                });
    //      return res.send('Cookie has been sent')
    
    // });
    
    // app.get("/getCookie", async (req, res) => {
        

    //   var userEmail = req.cookies['email'];
    //   if(userEmail){
    //     return res.send (userEmail);
    //   }
  
    //      return res.send('No cookie found');
         
    //  });

    app.get("/deletecookie",(req,res)=> {
        res.clearCookie("email").send({message:"cookie deleted"});
    })

  }


  