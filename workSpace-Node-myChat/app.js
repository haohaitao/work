'use strict';

var express = require("express");
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var users = {};//存储在线用户列表的对象

app.get('/',function(req,res){
    if(req.cookies.user == null){
        res.redirect('/signin');
    }else{
        res.sendfile('views/index.html');
    }
});

app.get('/signin',function(req,res){
        res.sendfile('views/signin.html');
});

app.post('/signin',function(req,res){
        if (users[req.body.name]) {
            alert('用户名已存在,请重新填写用户名');
            res.redirect('/signin');
        } else {
            res.cookie("user",req.body.name,{maxAge: 1000*60*60*24*30});
            res.redirect('/');
        }
});

var server = http.createServer(app);

var io = require('socket.io').listen(server); 

io.sockets.on('connection',function(socket){
        //有客户端上线了
        socket.on('online',function(data){
            //将上线的用户名存储为 socket 对象的属性，以区分每个 socket 对象，方便后面辨别连接到服务器的不同用户
            socket.name = data.user;
            //users 对象中不存在该用户名则插入该用户名
            if (!users[data.user]) {
                users[data.user] = data.user;
            }
            //向所有用户广播该用户上线信息
            io.sockets.emit('online', {users: users, user: data.user});
        });
        //客户端传来了聊天信息
        socket.on('say',function (data) {
            if (data.to === 'all') {
                //判断是否该客户端是否是跟所有人进行聊天,群聊
                socket.broadcast.emit('say',data);
            } else {
                //向特定用户发送会话信息
                //clients是一个里面存储了所有连接对象的数组，私聊
                var clients = io.sockets.clients();
                clients.forEach(function (client) {
                    if (client.name ===data.to) {
                        client.emit('say',data);
                    }
                })
            }
        })
        //服务端接收到有用户下线
        socket.on('disconnect',function () {
            //如果users里有下线用户名
            if (users[socket.name]) {
                delete users[socket.name];
                //向其他用户广播该用户下线消息
                socket.broadcast.emit('offline',{users: users, user: socket.name});
            }
        })

})

server.listen(app.get('port'),function () {
    console.log("app is running");
})