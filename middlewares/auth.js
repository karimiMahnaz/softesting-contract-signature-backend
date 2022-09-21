





exports.fileAuth = (req, res, next) => {
  const { username, password } = req.body;

  //--- Check from database
  // if (!(username === "admin" && password === "12345678")) {
  //   return res.status(400).send({ error: "Unauthorized accesss!" });
  // }

  next();
};


  exports.ensureAuth =  (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
   } 

   res.redirect("/");
 
  }

  exports.ensureGuest = (req, res, next) =>{
    if (!req.isAuthenticated()) {
      return next();
     } 
  
     res.redirect("/dashboard");
  }

  