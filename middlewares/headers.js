
exports.setHeaders= (req,res,next) => {

    if (process.env.NODE_ENV==='development'){
        res.header("Access-Control-Allow-Origin","http://localhost:3000");
    } else{
        res.header("Access-Control-Allow-Origin","https://softestingca.com");
    }
   
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers","Content-Type, Authorization");
    res.header("Content-Security-Policy",
     "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self' https://softestingca.com  https://www.softestingca.com  https://api.softestingca.com  https://google.com https://apis.google.com https://www.linkedin.com https://api.linkedin.com; style-src 'self'; frame-src 'self' https://www.YouTube.com "
    );
    next();
};

//"https://softestingca.com"
//"http://localhost:3000"