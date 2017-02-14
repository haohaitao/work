'use strict';

const url = process.argv[2];

var http = require('http');

http.get(url,(response)=>{

        response.setEncoding('utf8');
        response.on('data',(datablock)=>{
                console.log(datablock);
        })
});