const multer = require("multer");

const storage = (category) =>
  multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, `./uploaded-files/${category}`);
    },
    filename: (req, file, callback) => {
  
      if (category.substr(category.length-8,8)==='_profile' || category.substr(category.length-9,9)==='_contract' ){
        callback(null, file.originalname);
    
      }else{
        callback(null, Date.now() + "-" + file.originalname);
      }
    },
  });

const upload = (category, fileExtensions) =>
  multer({
    storage: storage(category),
    fileFilter: (req, file, callback) => {
      const isValidExtension = file.originalname
        .toLowerCase()
        .match(fileExtensions);

      if (!isValidExtension) {
        callback({ error: "Invalid file format!" }, false);
      } else {
        callback(null, true);
      }
    },
    limits: {
      fileSize: 100 * 1024 * 1024, // 100 MB
    },
  });

const handleErrors = (res, err) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      let errorMessage = "";

      switch (err.code) {
        case "LIMIT_FILE_SIZE": {
          errorMessage = "Invalid file size!";
          break;
        }
        case "LIMIT_UNEXPECTED_FILE": {
          errorMessage = "Invalid number of files!";
          break;
        }
        default: {
          errorMessage = "Uploading failed!"; // err.message
          break;
        }
      }

      return res.status(400).send({ error: errorMessage });
    }

    return res.status(400).send({ error: err.error });
  }
};

module.exports = {
  upload,
  handleErrors,
};
