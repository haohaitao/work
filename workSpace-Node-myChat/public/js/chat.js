$(document).ready(function(){

    var socket = io.connect();//连接本地服务器

    var from = $.cookie('user');//从cookie中读取用户名
    var to = "all";//默认接受为“所有人”
    //用户上线,向服务器端发射online事件，将用户名发过去
    socket.emit('online',{user:from});
    //接受服务器发送的online事件，并验证是否是新用户
    socket.on('online',function(data){
        //系统消息
        if (data.user != from) {
            //新用户
                 var sys = '<div style="color:#f00">系统(' + now() + '):' + '用户 ' + data.user + ' 上线了！</div>';
         } else {
            //已登录用户
                 var sys = '<div style="color:#f00">系统(' + now() + '):你进入了聊天室！</div>';
         }
         $("#contents").append(sys + "<br/>");
        //刷新用户在线列表
         flushUsers(data.users);
        //显示正在对谁说话
         showSayTo();

     });
     //接受服务器传过来的聊天信息
    socket.on('say',function (data) {
             //群聊
        if (data.to == 'all') {
             $("#contents").append('<div>' + data.from + '(' + now() + ')对 所有人 说：<br/>' + data.msg + '</div><br />');
         }
         //和你私聊
        if (data.to == from) {
            $("#contents").append('<div style="color:#00f" >' + data.from + '(' + now() + ')对 你 说：<br/>' + data.msg + '</div><br />');
        }
    })
    //其他用户下线
    socket.on('offline', function (data) {
      //显示系统消息
      var sys = '<div style="color:#f00">系统(' + now() + '):' + '用户 ' + data.user + ' 下线了！</div>';
      $("#contents").append(sys + "<br/>");
      //刷新用户在线列表
      flushUsers(data.users);
     //如果正对某人聊天，该人却下线了
      if (data.user == to) {
          to = "all";
      }
      //显示正在对谁说话
       showSayTo();
    });
     //服务器关闭
    socket.on('disconnect', function() {
        var sys = '<div style="color:#f00">系统:连接服务器失败！</div>';
        $("#contents").append(sys + "<br/>");
        $("#list").empty();
    });

    //重新启动服务器
    socket.on('reconnect', function() {
        var sys = '<div style="color:#f00">系统:重新连接服务器！</div>';
        $("#contents").append(sys + "<br/>");
        socket.emit('online', {user: from});
    });
    

     //刷新用户列表
     function flushUsers(users){
         //清空之前的用户列表,然后填一个“所有人”选项
         //因为你刚进去，默认是对着所有人讲话，然后把选项默认为灰色
         $('#list').empty().append('<li title="双击聊天" alt="all" class="sayingto" onselectstart="return false">所有人</li>');
         //遍历生成用户列表
         console.log(users);
         for (var i in users) {
             if (users.hasOwnProperty(i)) {
                  $("#list").append('<li alt="' + users[i] + '" title="双击聊天" onselectstart="return false">' + users[i] + '</li>');
             }
         }
         //双击聊天
         $("#list > li").dblclick(function() {
            //加一个判断，用户不能点自己
            if ($(this).attr('alt')!=from) {
                //设置被双击的用户为说话对象
                to = $(this).attr('alt');
                //清除之前的选中效果
                $('list>li').removeClass('sayingto');
                //给当前的用户添加
                $('list>li').addClass('sayingto');
                //刷新聊天状态
                showSayTo();
            };
         });
      }
        //显示正在对谁说话
        function showSayTo() {
             $("#from").html(from);
             $("#to").html(to == "all" ? "所有人" : to);
        }
        //获取当前时间
        function now() {
            var date = new Date();
            var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
            return time;
        }

        //发送聊天信息
        $('#say').click(function() {
            //拿到要发送的信息
            var $msg = $("#input_content").html();
            //判断消息是否为空
            if ($msg ==="") {
                return ;
            };
            //这里先把信息添加到自己的客户端页面显示出来
            if (to ==="all") {
                $("#contents").append('<div>你(' + now() + ')对 所有人 说：<br/>' + $msg + '</div><br />');
            } else {
                $("#contents").append('<div style="color:#00f" >你(' + now() + ')对 ' + to + ' 说：<br/>' + $msg + '</div><br />');
            }

            //发送聊天信息到客户端
            socket.emit('say',{from:from,to:to,msg:$msg});
            //清空输入框，获得焦点，以便继续输入
            $("#input_content").html('').focus();
        });

});