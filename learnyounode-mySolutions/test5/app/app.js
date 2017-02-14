
'use strict';

const dir = process.argv[2];

const targetname = process.argv[3];

var path = require('path');

var fs = require('fs');

fs.readdir(dir,(err,filesList)=>{
    if(err) throw err;
    console.log(filesList);
     var target = filesList.filter((item,index,array)=>{
            return path.extname(item)===("."+targetname)?true:false;
    });

    for(var file of target ){
         console.log(file);
    }

    return  target;
});


//official solution

var fs = require('fs')
var path = require('path')
 
var folder = process.argv[2]
var ext = '.' + process.argv[3]
 
fs.readdir(folder, function (err, files) {
  if (err) return console.error(err)
  files.forEach(function(file) {
      if (path.extname(file) === ext) {
          console.log(file)
      }
  })
})
