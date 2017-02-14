'use strict';

const url = process.argv[2];

var http = require('http');

http.get(url,(response)=>{
        var str='';
        response.setEncoding('utf8');
        response.on('data',(datablock)=>{
                str += datablock;
        })
        response.on('end',()=>{
                console.log(str.length);
                console.log(str);
        })
});