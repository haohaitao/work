'use strict';

const url = process.argv[2];

var net = require('net');

function TimeUtils(){

};
TimeUtils.prototype.zeroFill = function(i){
        return (i<10?'0':'') + i;
}
TimeUtils.prototype.now = function(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var h = date.getHours();
        var m = date.getMinutes();
        var zerofill = TimeUtils.prototype.zeroFill;
        return (
                `${zerofill(year)}-${zerofill(month)}-${zerofill(day)} ${zerofill(h)}:${zerofill(m)}`
        );
};

var tcpServer = net.createServer((socket)=>{
        var datetime = TimeUtils.prototype.now();
        socket.end(datetime + '\n');
});

tcpServer.listen(Number(url));