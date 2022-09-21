const fs = require("fs");

module.exports = (req, res, next) => {
  const {
    category: headerCategory,
    extensions: headerExtensions,
    delete_file_name: headerDeleteFileName,
    delete_file_category: headerDeleteFileCategory,
  } = req.headers;

  //---
  const folderName = `./uploaded-files/${headerCategory}`;
  
  try{
    //  if (fs.existsSync(folderName)){
    //   if (folderName.substr(folderName.length-8,8)==='_profile'){
    //     fs.rm(folderName, { recursive: true }, (err) => { 
    //       if (err) { 
    //       ///  console.log(err); 
    //       } 
    //     }); 
    //   }
    // }
     if (!fs.existsSync(folderName)){
        fs.mkdirSync(folderName);
        }
      
   
  }catch(err){
    console.log(err);
  }

  const category = headerCategory || "";

  if (headerCategory) {
    const dir = `./uploaded-files/${category}`;

    if (!fs.existsSync(dir)) {
      return res.status(400).send({ error: "Inavild file group!" });
    }
  }

  req.category = category;

  //---.pdf, .jpeg, .jpg, .png, .zip

  const validExtensions = headerExtensions || "png|pdf|jpeg|jpg|zip";

  const fileExtensions = new RegExp(`\.(${validExtensions})$`);

  req.fileExtensions = fileExtensions;

  //---

  if (headerDeleteFileName) {
    const deleteCategory = headerDeleteFileCategory || category;

    const filePath = `./uploaded-files/${deleteCategory}/${headerDeleteFileName}`;

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  //---

  next();
};
