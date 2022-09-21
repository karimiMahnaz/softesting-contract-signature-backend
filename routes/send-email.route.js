const express = require("express");
const router = express.Router();
const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

//var transporter = nodemailer.createTransport({
 // service: 'gmail',
//  host: 'smtp.gmail.com',
var transporterDetails = smtpTransport({
  host:  '5.9.116.157',  ///  'smtp-de-01.runflare.com',    ////'mail.softestingca.com',
  port: '587',   ///587, 465
  ////secure: true, // use SSL
  auth: {
    user: 'no-reply@softestingca.com',
    pass: 'Mah13861392'
  },
  tls:{
    rejectUnauthorized:false,
  }
});

const transporter = nodeMailer.createTransport(transporterDetails);

transporter.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready To Send Email");
  }
});

router.post("/", (req, res, next) => {
  const customerName = req.body.customerName;
  const customerMail = req.body.customerMail;
  const customerMessage = req.body.customerMessage;
  const phone = req.body.phone;
  // const s__filename = req.body.files[0].orginalname;
  // const s__filepath = req.body.files[0].path;

  // console.log('s__filename', req.body.files[0].orginalname);
  // console.log('__dirname',req.body.files[0].path);
  console.log(`<p>Name: ${customerName}</p><p>Email: ${customerMail}</p><p>Phone: ${phone}</p><p>Message: ${customerMessage}</p>`);
  const mail = {
    from: customerMail,
    to: "hello@softestingca.com",
    subject: "Contact Form Message",
    html: `<p>Name: ${customerName}</p><p>Email: ${customerMail}</p><p>Phone: ${phone}</p><p>Message: ${customerMessage}</p>`,
   
  };
  transporter.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});
module.exports = router;