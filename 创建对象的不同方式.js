//延续变量寿命
var report = function( src ){
    var img = new Image();
    img.src = src;
}
report('http://xxx.com/getUserInfo');
//image 对象经常用于数据上报,但会丢失.原因是调用结束后, img 局部变量随即被销毁,此时或许没来得及发出 HTTP 请求,所以会丢失

var report = (function (src) {
    var imgs = [];
    return function(src){
        var img = new Image();
        imgs.push(img);
        img.src =src;
    }
})()
////////////////////////
////////////////////////
//闭包和面向对象设计
//闭包实现
var extent = function(){
    var value = 0;
    return {
        call:function(){
            console.log(value++)
        }
    }
}

var extent = extent();
extent.call();
extent.call();
extent.call();
//面向对象
var extent = {
    value:1,
    call: function(){
        console.log(this.value++)
    }
};
extent.call();
extent.call();
extent.call();

//改进的面向对象实现方法
var Extent = function(){
    this.value = 0;
}

Extent.prototype.call = function(){
    console.log(this.value++);
}

var extent = new Extent();
extent.call();
extent.call();
extent.call();


//3.1.5 使用闭包实现命令模式

var Tv = {
    open:function(){
        console.log('openTv');
    },
    close:function(){
        console.log('closeTv');
    }
}

var OpenCommand = function(receiver){//构造函数
    this.receiver = receiver;
}

OpenCommand.prototype.execute = function(){
    this.receiver.open();
}

OpenCommand.prototype.undo = function(){
    this.receiver.close()
}

var setCommand = function(command){
    document.getElementById('execute').onclick = function(){
        command.execute();
    }
    document.getElementById('undo').onclick = funciton (){
        command.undo();
    }
}

setCommand(new OpenCommand(Tv))

//使用闭包实现
var Tv = {
    open:function(){
        console.log('openTv');
    },
    close:function(){
        console.log('closeTv');
    }
}


var createCommand = function( receiver ){
    var execute = function(){
        return receiver.open();
    }
    var undo = function(){
        return receiver.close();
    }
    return {
        execute:execute,
        undo:undo
    }
    // return {
    //     execute:receiver.open();
    //     undo:receiver.close();
    // }
}

var setCommand = function(command){
    document.getElementById('execute').onclick = function(){
        command.execute();
    }
    command.execute();
    document.getElementById('undo').onclick = function(){
        command.undo()
    }
};

setCommand(createCommand(Tv));

