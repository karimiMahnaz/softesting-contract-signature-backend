const fs = require("fs");

const Usermodel = require("../models/user.model");
const userProfileSchema = require("../models/profile.model");
const userContractSchema = require("../models/contract.model");
let sendEmail = require("../email/sendEmail");

exports.writeContract = async (req, res, next) =>{
  
   try{
    const { path, pdf, email, fileName } = req.body;
    // var iconv = require('iconv-lite');
    // var Iconv  = require('iconv').Iconv;

    console.log('path', path );
   // console.log('req.body.pdf',req.body.pdf );
  
  // let content = buff.toString("utf-8");
  // const detectCharacterEncoding = require('detect-file-encoding-and-language');

  // detectCharacterEncoding("./uploaded-files/karimimahnaz122@gmail.com_contract/beta_test_agreement.pdf") 
  // .then(fileInfo => console.log("encoding2" ,  fileInfo.encoding))
  //   .catch(err => console.log(err));

  //   const chardet = require('chardet');
  //   console.log('chardet.detectFile', await chardet.detectFile("./uploaded-files/karimimahnaz122@gmail.com_contract/Condominium Form.pdf").then(encoding => console.log('encoding file', encoding)));


   const content = pdf;
   const {Base64} = require('js-base64');
   const bufferContent2 = Base64.atob(content);
   fs.writeFileSync(req.body.path, bufferContent2 , 'binary' );

   
  //  const user = await Usermodel.findOne({ email });
   
  //   const appLink = path;

  //   const subject = "SofTesting - signed document";
  //   const payload = { name: user.userName, link: appLink  };
  //   const template = "signedContract.html";

  //   sendEmail(email, subject, payload, template, fileName);

    res.status(200).send("File is written .");
  // const bufferContent = new Buffer.from(content, 'base64');
 //  const bufferContent2 = bufferContent.toString('ascii');
    
  //const bufferContent = iconv.encode (content, "utf-8");
 // const bufferContent2 = iconv.decode (bufferContent, "UTF-8");
  // let buff = fs.readFileSync("./uploaded-files/karimimahnaz122@gmail.com_contract/Condominium Form.pdf");
  //  const bufferContent =  new Iconv ('base64', 'ascii' )
  //  .convert(new Buffer.from(buff))
  //  .toString();
  //  const bufferContent2 =  Iconv ('ISO-8859-1', 'windows-1252' )
  //  .convert(bufferContent)
  //  .toString();
  /////const bufferContent2 = iconv('UTF-8','windows-1252')
  ///.convert(bufferContent)
 

   // if (iconv.encodingExists("UTF-8") === true){
   //   const decodeContent = iconv.decode (bufferContent2, "UTF-8");
     /// console.log('bufferContent',bufferContent)
     /// console.log('decodeContent',decodeContent)
  //  }
  
    
  //    console.log('bufferContent', bufferContent)
 //     console.log('decodeContent', decodeContent)

   
  ///    console.log('readfile',fs.readFileSync(req.body.path ))

  }
  catch(err){
    console.log(err);
  }
 
};

exports.readContractBase64 = async (req, res, next) =>{
  try{

  fs.existsSync(req.query.url, (err, data) => {
    if (err) throw err;
  });
  /////let buff = fs.readFileSync(req.query.url);
  ////let pdfAsBase64 = buff.toString('base64');
  
  let pdfAsBase64 = fs.readFileSync(req.query.url, 'base64');
   
   return res.end(pdfAsBase64) ;

}
  catch (error) {
    console.error(`get: error occurred ${error}`);
    return error;
  }
};
exports.readContractBuffer = async (req, res, next) =>{
  try{

  fs.existsSync(req.query.url, (err, data) => {
    if (err) throw err;
  });

  // var pdfAsBuffer =  await fs.readFileSync(req.query.url);
  // return res.end(pdfAsBuffer) ;
  await fs.readFile(req.query.url, (err, data) => {
    if (err) throw err;
    ////   res.writeHead(200,{'Content-type':'image/*'});
    console.log("data", data);
    return res.end(data);
  })

}
  catch (error) {
    console.error(`get: error occurred ${error}`);
    return error;
  }
};
exports.updateContract = async (req, res, next) => {
    try {
      console.log(req.body.email);
      console.log(req.body.contractName);
       const{email , contractName} = req.body;
      const contract = await userContractSchema.findOne({$and:[{ contractName}, {email}]});
     ///.findOne({ contractName, email});
      if (!contract) {
        const error = new Error("Document is not find!");
        error.statusCode = 440;
        error.message = "Document is not find!";
        return error;
    
      } else{
      const filter = { contractName };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          contractName: req.body.contractName,
          sign: req.body.sign,
          signDate:req.body.signDate,
          sendEmail:req.body.sendEmail

        },
      };
  
      const result = await userContractSchema.updateOne(
        filter,
        updateDoc,
        options
      );
     // console.log("Contract Is Edited Successfully.", result);
      return res.status(200).send("contractName is updated.");

    
      }

    } catch (error) {
      console.log("error", error);
      next(error);
    }
  };

  exports.getContracts = async (req, res, next) => {
   
    //esignature app && softesting
  
    try {
         userEmail = req.query.email.replace(/"/g, '');
        contractName = req.query.contractName;///  .replaceAll('"', '');
    
        const userContract = await userContractSchema.find({ email: userEmail });
        if (userContract) {
            res.status(200).json(userContract);
        } else {
             res.status(440).send('userContract was not existed');
          ///   console.log('userContract was not existed'); 
        }
    }
    catch (error) {
        console.log('error', error);
        next(error);
    }
  }
  
  
  exports.contract = async (req, res, next) => {
   
    try {
      await userContractSchema.contractValidation(req.body);
      const {
        contractName,
        email
      } = req.body;

      const user = await Usermodel.findOne({ email });
      if (user.role !== 'admin') {
        const error = new Error("Access Denied!");
        error.statusCode = 455;
        error.message = "Access Denied!";
        return error;
     
      }
    //  { $or: [{title: regex },{description: regex}] }
  //----copy

    const folderName = `./public/uploaded-profile/${email}_contract`;

      if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName);
      }

     const filePath = `./uploaded-files/${email}_contract/${contractName}`;
     const filePathCopy = `./public/uploaded-profile/${email}_contract/${contractName}`;

     fs.copyFile(filePath, filePathCopy, (err) => {
         if (err) throw err;
     })
    console.log("File Copy Successfully.");
   

      const contract = await userContractSchema.findOne({$and:[{ contractName}, {email}]});
      if (!contract) {
        console.log('not exists--------------contract method')
        
        console.log("req.body.contractName", req.body);
        await userContractSchema.create({
          contractName: req.body.contractName,
          email: req.body.email,
          sign: req.body.sign,
          signDate:req.body.signDate,
          sendEmail:req.body.sendEmail
        });

        if(req.body.sendEmail){

          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "10h",
          });
    
          let appLink = "";
    
          if (process.env.NODE_ENV === "development") {
            appLink = `http://localhost:3000/contract/signature/:${token}`;
          } else {
            appLink = `https://softestingca.com/contract/signature/:${token}`;
          }
         
          const subject = "SofTesting - Document To Sign";
          const payload = { name: user.userName , link: appLink  };
          const template = "contractEmail.html";
         
          sendEmail(email, subject, payload, template);
        }
    
  
        return res.status(200).send("Insert Is Done.");

      } else {
        console.log("------------------contract exits");
  
        const filter = { contractName };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
             contractName: req.body.contractName,
             email: req.body.email,
             sign: req.body.sign,
             signDate: req.body.signDate,
             sendEmail:req.body.sendEmail
          },
        };
  
        const result = await userContractSchema.updateOne(
          filter,
          updateDoc,
          options
        );
  
        
        if(req.body.sendEmail){

          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "10h",
          });
    
          let appLink = "";
    
          if (process.env.NODE_ENV === "development") {
            appLink = `http://localhost:3000/contract/signature/:${token}`;
          } else {
            appLink = `https://softestingca.com/contract/signature/:${token}`;
          }
         
          const subject = "SofTesting - Document To Sign";
          const payload = { name: user.userName , link: appLink  };
          const template = "contractEmail.html";
          
          sendEmail(email, subject, payload, template);
        }
    
  
        return res.status(202).send("Update Is Done.");
      }
      

    } catch (error) {
      console.log("error", error);
      next(error);
    }
  };