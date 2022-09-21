const cors = require("cors");
const compression = require("compression");
let bodyParser = require("body-parser");
//const cookieParser = require("cookie-parser");
const { setHeaders } = require("../middlewares/headers");

module.exports = (app) => {
  app.use(compression());
//  app.use(cors());

let v_origin="";

if (process.env.NODE_ENV==='development') {
  v_origin="http://localhost:3000";
}else{
  v_origin=['https://softestingca.com','https://api.softestingca.com','https://www.softestingca.com' ];
}

///app.options('*', cors());

app.use(
  cors({
     
        origin: v_origin,
        methods:['GET','POST'],
        optionsSuccessStatus:200
})
)

 /// app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended:true, limit: '50mb'}));
  app.use(bodyParser.json());
  app.use(setHeaders);
};
