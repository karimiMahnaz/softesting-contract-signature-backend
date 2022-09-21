const fs = require('fs');
  
module.exports = (req, res, next) => {
try{

    const folderName = `./src/uploaded-profile/${req.body.email}_profile`;

    if (!fs.existsSync(folderName)){
        fs.mkdirSync(folderName);
        }

const filePath = `./uploaded-files/${req.body.email}_profile/${req.body.imageName}`;
const filePathCopy = `./src/uploaded-profile/${req.body.email}_profile/${req.body.imageName}`;
    
fs.copyFile(filePath, filePathCopy, (err) => {
  if (err) throw err;
    
  console.log('File Copy Successfully.');
});

}catch(err){
    console.log(err);
  }
}