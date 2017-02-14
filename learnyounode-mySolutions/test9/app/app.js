'use strict';

const url = process.argv.slice(2);

var http = require('http');

var result = [];

var count = 0;

for(var i in url){
        http.get(url[i],(response)=>{
                response.setEncoding('utf8');
                response.on('data',(datablock)=>{
                        result[i] = datablock;
                })
                response.on('end',()=>{
                          count++;
                          if(count ===3 ){
                                
                          }
                })
                console.log(result[i]);
        });
}








