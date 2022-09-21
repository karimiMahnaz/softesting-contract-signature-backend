const { upload, handleErrors } = require("./upload-config");

module.exports = (req, res, next) => {
  const { category, fileExtensions } = req;
  const handler = upload(category, fileExtensions).array("myFiles", 3);

  handler(req, res, (err) => {
    handleErrors(res, err);

    next();
  });
};
