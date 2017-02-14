'use strict';

var path = require('path');

var fs = require('fs');

function printFile(dir_name,ext_name,callback){

    fs.readdir(dir_name,(err,filesList)=>{

    if(err) {
        return callback(err);
    }
    
     filesList = filesList.filter((item,index,array)=>{
            return path.extname(item)===("."+ext_name)?true:false;
     });

     callback(null,filesList);
  });
};

module.exports = printFile;
