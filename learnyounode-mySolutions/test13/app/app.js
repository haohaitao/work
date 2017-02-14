'use strict';

var url = require('url');

var http = require('http');

const port = Number(process.argv[2]);

var timeUtils = (function(mine){

    mine.timeDealers = function(time){
        return {
            hour:time.getHours(),
            minute:time.getMinutes(),
            second:time.getSeconds()
        };
    }

    mine.unixTime = function(time){
         return {
             unixtime: time.getTime()
         };
    }
    return mine;

})(timeUtils||{});


var server = http.createServer((req,res)=>{

         var pathname = url.parse(req.url).pathname;
         var query = url.parse(req.url,true).query;//parse方法第二个参数有坑
         var time = new Date(query.iso);
         var result;

         console.log(query.iso);

         if(pathname === '/api/parsetime'&&req.method === "GET"){
             result = timeUtils.timeDealers(time);
         }else if(pathname === '/api/unixtime'&&req.method === "GET"){
             result = timeUtils.unixTime(time);
         }

         if(result){
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify(result));
         }else{
             res.writeHead(404);
             res.end();
         }

});

server.listen(port);