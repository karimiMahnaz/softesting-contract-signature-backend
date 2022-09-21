const fs = require("fs");
const xml2js = require('xml2js');

///const taskModel = require("../models/task.model");

exports.getSitemap = async (req, res, next) => {
    try {
        console.log('tttttttest');
        console.log('__dirname' , __dirname);
        
        var parser = new xml2js.Parser();
      
        fs.readFile(__dirname + '/sitemap.xml', function (err, data) {
            parser.parseString(data, function (err, result) {
                console.dir(result);
                console.log('Done');

                return result;
            });
        });
    }
    catch (error) {
        console.error(`get: error occurred ${error}`);
        return error;
    }
}   