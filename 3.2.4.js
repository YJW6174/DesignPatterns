//高阶函数的其他应用
//1.柯理化函数

var currying = function( fn ){
    var args = [];

    return function(){
        if (arguments.length ===  0 ){
            return fn.apply(this,args);
        } else {
            [].push.apply( args,arguments );
            return arguments.callee;
        }
    }
}

var cost = (function(){
    var money = 0;
    console.log('money' + money);
    console.log('arguments' + arguments);
    return function(){
        for (var i = 0; i < arguments.length; i++) {
            money += arguments[i]
        }
        return money
    }
})()

var cost = currying(cost);
cost(100);
cost(200);
cost(300);
cost();

//2.反柯理化
//curring 让对象去借用一个原本不属于他的方法;

Function.prototype.uncurrying = function(){
    var self = this;
    return function(){
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj,arguments);
    }
}

var push = Array.prototype.push.uncurrying();

