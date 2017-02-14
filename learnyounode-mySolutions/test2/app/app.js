'use strict'

var argvArr = process.argv.slice(2);

var newArr = argvArr.map(function(item,index,array){
        return Number(item);
});

var sum = newArr.reduce(function(prev,cur,index,array){
        return prev + cur;
});

console.log(sum);

//官方答案
var result = 0;
for(var i = 2;i<process.argv.length;i++){
        result += Number(process.argv[i]);
}

console.log(result);