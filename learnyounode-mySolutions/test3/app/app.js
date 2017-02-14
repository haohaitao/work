var fs = require('fs');

var file = fs.readFileSync(process.argv[2]);//buffer对象

var str = file.toString();

var arr = str.split('\n');

console.log(arr.length - 1);