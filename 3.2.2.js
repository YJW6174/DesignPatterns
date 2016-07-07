//3.2.2函数作为返回值输出
//1.判断数据的类型
var isType = function (type){
    return function(obj){
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    }
}


var isString = isType('string');
isString('aaa');

var Type = {};
for (var i = 0,type; type = [ 'String', 'Array', 'Number' ][i++];) {
    (function(type){
    Type[ 'is' + type] = function(){

    }
    })(type)
}

//2.getSingle 单例模式

var getSingle = function(fn){
    var ret;
    return function(){
        return ret || (ret = fn.apply(this,arguments));
    }
}

//看看效果
var getScript = getSingle(function(){
    return document.createElement('script');
})

var script1 = getScript();
var script2 = getScript();

script1 == script2 //true 单例模式,都是一个;


//3.高阶函数实现 AOP
 Function.prototype.before = function(beforeFn){
    var _self = this;
    return funciton(){
        beforeFn.apply( this, arguments);//执行 before 函数
        return _self.apply( this, arguments);//执行 原 函数
    }
 }

 Function.prototype.after = function(afterFn){
    var _self = this;
    return function(){
        var ret = _self.apply( this, arguments);//执行上面 return function(){before...} 的方法 因此before,
        afterFn.apply( this, arguments);
        return ret;
    }
 }  

 var func = function(){
    console.log(2);
 }

 func = func.before(function(){
    console.log(1);
 }).after(function(){
    console.log(3);
 })

 func();
