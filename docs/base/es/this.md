# this 指向
this 是一个指针，指向调用函数的对象。this 指向是根据调用函数时根据执行上下文所动态确定的。
+ 在函数体中，简单调用该函数时（非显式/隐式绑定下），严格模式下this绑定到undefined，否则绑定到全局对象 window/global。
+ 一般构造函数 new 调用，绑定到新创建的对象上。
+ 一般由 call/apply/bind 方法显式调用，绑定到指定参数的对象上。
+ 一般由上下文对象调用，绑定在该对象上。
+ 箭头函数中，根据外层上下文绑定的 this 决定 this 指向。  

```js
var name = 'global';

var obj = {
  name: "obj-name",
  sayName: function(){
    console.log(this.name)
  },
  logName: logName,
  aSayName: function(){
    setTimeout(function(){
      console.log('async');
      console.log(this.name);
    },100)
  }
}

function logName(type){
  console.log(`${type}+`,this.name);
}
//                   type    browser-log      browser-this     node-log      node-this
// logName('A');//      A      'global'         window          undefined     Object[global]
/*A---默认绑定，指向全局对象;在 node 环境中，name 不挂在全局对象下；执行上下文对象是全局对象*/

// obj.sayName();//     B      'obj-name'        obj对象        'obj-name'      obj对象
// obj.logName('C');//  C      结果同B
/*B/C---隐式绑定，指向 obj；执行上下文对象是 obj*/

// let sayName0 = obj.sayName;
// sayName0();//        D      结果同A
/*D---obj.sayName 赋给了一个变量 sayName0；执行上下文是全局对象*/

// obj.aSayName();//    E      结果同A
// setTimeout(obj.sayName,200);//F 结果同A
// setTimeout(function(){
//   obj.sayName();
// },300);//            G      结果同B
/**
 * E---setTimeout 是全局对象的方法；执行上下文对象是全局对象
 * F---obj.sayName 作为变量，赋给了 setTimeout 的第一个参数；执行上下文对象是全局对象
 * G---隐式绑定，指向 obj；执行上下文对象是 obj
 */

// let say = obj.sayName;
// say.call(obj);//     H      结果同B
// let say1 = function(fn){
//   fn();
// }
// say1.call(obj,obj.sayName);//I  结果同A
// let say2 = function(fn){
//   fn.call(this);
// }
// say2.call(obj,obj.sayName);//J  结果同B
/**
 * H---显式绑定
 * I---obj.sayName 作为变量，赋给参数 fn，执行上下文对象是全局对象
 * J---say2 将 obj 传递给作为参数的函数
 */

function Super(){
  this.name = 'super-name';
  console.log(this);
  console.log(this.name);
}
//let Sub = new Super();//K   'super-name'        Sub对象         'super-name'        Sub对象
/**
 * new 调用函数时，执行了以下操作：
 * 1.创建一个新对象
 * 2.将this指向新对象
 * 3.执行构造函数的代码
 * 4.返回新对象
 * 
 * K---new 绑定，当函数有返回对象时，this指向这个返回的对象（执行上下文对象）
 */

var obj2 = {
  name: 'obj2-name',
  sayName:function(){
    console.log(this);
    console.log(this.name);
    return ()=>{
      console.log(this);
      console.log(this.name);
    }
  },
  say:function(){
    console.log(this);
    console.log(this.name);
    return function(){
      console.log(this);
      console.log(this.name);
    }
  },
  arrowSay:()=>{
    console.log(this);
    console.log(this.name);
  }
}
function Obj3(){
  this.name = 'obj3-name';
  var sayName = (function(){
    console.log(this);
    console.log(this.name);
  })()
  var arrowSay = (()=>{
    console.log(this);
    console.log(this.name);
  })();
}
// var obj2SayName = obj2.sayName();//L   'obj2-name'    obj2对象      'obj2-name'    obj2对象
// obj2SayName();                   //M      结果同L
// var obj2Say = obj2.say();        //N      结果同L
// obj2Say();                       //O     'global'     window对象     undefined     Object[global]
//obj2.arrowSay();                 //P      'global'     window对象       undefined      {}
//var obj3 = new Obj3();           //Q      
/**
 * L---obj2.sayName 中 this 执行 obj2 对象
 * M---obj2SayName 是箭头函数，继承上层的 this
 * N---同 B
 * O---同 D
 * P---在浏览器环境中，因为 obj2 没有自己的 this（不是通过构造函数来创建的），所以往上查找到的是全局对象；
 *     在 node 环境中，指向的是一个空对象(此处存疑)
 * Q---闭包中的 this 指向的是 window 对象，箭头函数的 this 在定义时确定
 */

```

## 默认绑定
通常是独立函数的调用，形式 fun()。  
在浏览器环境中，非严格模式下，this指向全局对象；严格模式下，this 指向 undefined。  
## 隐式绑定
函数的调用在某个对象上触发，形式 x.fun()。  
**对象属性链中只有最后一层会影响调用位置**
```javascript
function fun(){}
var x1 = x.fun;//将 x.fun 赋值给一个变量（或作为函数参数）时，绑定丢失
x1();
```

## 显式绑定
使用 call/apply/bind 的方式，显式的指定 this 指向的对象（第一个参数）。call 和 apply 会执行对应的参数，bind 不会。  
**传入的参数为null或者undefined时，采用默认绑定。**

## new绑定
使用 new 调用函数时，函数的 this 会指向新对象。  
**当函数有返回对象时，this 指向这个返回的对象（执行上下文对象）**

## 注意点
+ 绑定优先级：new绑定 > 显式绑定 > 隐式绑定 > 默认绑定
