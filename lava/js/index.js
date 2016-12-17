$(function() {
		$('.hiddenbox1').mouseover(function(event) {
			$('div.a.hiddenlist').css('display', 'block');
		});
		$('.hiddenbox1').mouseout(function(event) {
			$('div.a.hiddenlist').css('display', 'none');
		});
		$('.hiddenbox2').mouseover(function(event) {
			$('div.b.hiddenlist').css('display', 'block');
		});
        $('.hiddenbox2').mouseout(function(event) {
        	$('div.b.hiddenlist').css('display', 'none');
        });
        //轮播
        var i=0;
		var clone =  $('.banner .imgs li').first().clone();
		$(".banner .imgs").append(clone);
		var size = $(".banner .imgs li").size();
       
        for(var j=0;j<size-1;j++){
        	$(".banner .number").append('<li></li>');
        };

        $(".banner .number li").first().addClass('on');
        //鼠标划入原点
        $('.banner .number li').hover(function() {
        	var index = $(this).index();
        	i=index;
        	$('.banner .imgs').stop().animate({left: -index*1000}, 500);
			$("this").addClass('on').siblings().removeClass('on');
        });
        //自动轮播
        var t = setInterval(moveL,2000);
        //操作定时器
        $(".banner").hover(function() {
        	clearInterval(t);
        }, function() {
 			t = setInterval(moveL, 2000);
        });
        function moveR () {
        	i++;
			if (i===size) {
				$('.banner .imgs').css('left', '0');
				i = 1;
			};
			$(".banner .imgs").stop().animate({left: -i*1000}, 500);
			if (i===size-1) {
				$(".banner .number li").eq(0).addClass('on').siblings().removeClass('on');
			} else{
				$(".banner .number li").eq(i).addClass('on').siblings().removeClass('on');
			};
			
        };
        function moveL () {
        	i--;
       		if (i===-1) {
       			$('.banner .imgs').css('left', -(size-1)*1000);
       			i=size - 2;
       		};
       		$(".banner .imgs").stop().animate({left: -i*1000}, 500);
			$(".banner .number li").eq(i).addClass('on').siblings().removeClass('on');
			
        }
		$(".banner .btn_l").click(function(event) {
			moveL();
		});
        $(".banner .btn_r").click(function(event) {
       		moveR();
        });

	});