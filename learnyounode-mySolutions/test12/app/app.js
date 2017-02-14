'use strict';

const port = process.argv[2];

var http = require('http');

var map = require('through2-map');

var server = http.createServer((req,res)=>{
        if(req.method !== "POST"){
           return res.end('method is not POST\n');
        }
        req.pipe(map(function(chunk){
            return chunk.toString().toUpperCase()
        })).pipe(res)
});

server.listen(port);


