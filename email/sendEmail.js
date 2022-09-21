const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const fs = require("fs");
var handlebars = require('handlebars');
const path = require("path");

 const transporterDetails = smtpTransport({
     host: '5.9.116.157' ,   ////'smtp-de-01.runflare.com',       ///process.env.EMAIL_HOST,
     port: '587',   //'587', 465 ////188.40.16.3:31720
  ///secure:true,
  // const transporterDetails = nodeMailer.createTransport({
  //   service:'gmail',
  //   auth: {
  //    type:"OAuth2",
  //    user: process.env.EMAIL_USER,
  //    pass: process.env.EMAIL_PASS, // naturally, replace both with your real credentials or an application-specific password
  //    clientId: process.env.GOOGLE_CLIENT_ID,
  //    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
  //    refreshToken:process.env.REFRESH_TOKEN
  // },
  auth: {
    user: 'no-reply@softestingca.com',
    pass: 'Mah13861392'
  },
  tls:{
    rejectUnauthorized:false,
  }
});

module.exports = sendEmail =  (email, subject, payload, template) => {
    console.log('2', email);
   /// console.log('2', fileName);
    console.log('2', subject);
    console.log('2', payload);
    console.log('2', template);
  try {
     
     const transporter = nodeMailer.createTransport(transporterDetails);
     
     const source = fs.readFileSync(path.join(__dirname, template), "utf8");
     const compiledTemplate = handlebars.compile(source);
   
    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html:  compiledTemplate(payload),  
        attachments: [
          // {
          //    filename: fileName,
          //    path: path.join(__dirname, '/uploaded-files/'+email+'/'+fileName),
          //    contentType: 'application/pdf',
          // }
         ]
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        return error;
      } else {
        return ;
      }
    });
  } catch (error) {
    console.log("sendEmail", error)
    return error;
  }
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

////module.exports = sendEmail;