'use strict';

const dir = process.argv[2];

const targetname = process.argv[3];

var printFile = require('./util');

printFile(dir,targetname,(err,list)=>{
    
        if(err) throw err;

        list.forEach((item)=>{
            console.log(item);
        });
});
