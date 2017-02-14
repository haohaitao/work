'use strict';

const url = Number(process.argv[2]);

var http = require('http');

var fs = require('fs');

var httpserver =  http.createServer((req,res)=>{

        res.writeHead(200,{'content-type':'text/plain'});

        var stream = fs.createReadStream(process.argv[3]).pipe(res);

});

httpserver.listen(url);







