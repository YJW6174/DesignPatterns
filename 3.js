//第3章 闭包和高阶函数
var func = function(){
    var a = 1;
    return function(){
        a++;
        console.log(a);
    }
}

var f = func();

var nodes = ['div1','div2','div3']
for (var i = 0 ,len = nodes.length; i < length; i++)  ,len = nodes.length{
    (function(i){
        nodes[i].onclick = function(){
            console.log(i);
            }
    })()
}


var Type = {};

for (var i = 0,type; type = ['String','Array','Number'][i++];) {
    (function(type){
        Type['is' + type ] = function(obj){
            return Object.prototype.toString.call(obj) == '[object ' + type + ']';
        }
    })(type)
}

Type['isArray']([]);


//闭包的作用 1.封装变量

var mult = function(){
    var a = 1;
    for (var i = 0; i < arguments.length; i++) {
        a = a * arguments[i];
    }
    return a;
}

var cache = {};
var mult2 = function(){
    var args = Array.prototype.join.call(arguments,',');
    if(cache[ args ]){
        return chache[ args ];
    }
    var a = 1 ;
    for (var i = 0; i <  arguments.length; i++) {
         a = a * arguments[i]
    }
    return cache[ args ] = a;
}
