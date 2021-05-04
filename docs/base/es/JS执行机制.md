# JS 的执行机制

## 提升（Hoisting）
```js
var name = 'js';
var fun = function() {
  console.log(1);
}
function fn() {
  console.log(2);
}
```
以上代码等同于:
```js
//fn 函数是完整的函数声明
function fn = function() {//声明
  console.log(2);
}
var name;//声明
name = 'js';//赋值
var fun;//声明
fun = function() {//赋值
  console.log(1);
  fn();
}
```
**变量提升**，指在 JS 代码执行过程中，（表面上）将变量的声明和函数的声明部分提升到代码开头。**变量提升后，会设置默认值 undefined**。实际上，**代码的位置并没有改变，而是在编译阶段被 JS 引擎放入内存中**。

```js
log(x);//undefined
var x = 'x';
function log(x){
  console.log(x);
}
/** 执行上下文中的变量环境
 * function log(x){ console.log(x) }
 * var x;
 */
/** 可执行代码
 * log(x);
 * x = 'x';
 */
```
**编译阶段**，JS 的代码会生成两部分内容：**执行上下文（Execution content）和可执行代码**。
**执行上下文是 JS 执行一段代码时的运行环境**，确定在执行时用到的 this、变量、对象以及函数等。执行上下文由**变量环境组件（Variable Environment）、词法环境组件（Lexical Environment）、this 绑定**3个组件组成。(变量环境组件和词法环境组件始终为词法环境对象)

**变量环境**，该对象中保存着变量提升的内容。一般来说，有3种情况:
+ 执行全局代码时，JS 引擎编译并创建全局执行上下文，整个页面的生存周期内只有一个。
+ 调用函数时，编译函数体内的代码并创建函数执行上下文，一般函数执行结束后就会被销毁。
+ 使用 eval 函数时，eval 的代码编译并创建执行上下文。

**执行阶段**，JS 引擎执行“可执行代码”，并按照顺序执行。在上面的代码中，先执行 log 函数，此时变量x没有赋值，取 undefined；接着执行赋值步骤，此时变量“x = 'x'”。

**注意**：
+ 如果有两个相同的函数，后定义的会覆盖之前定义的。
+ 函数提升在变量提升之前。
### 变量提升带来的问题
1. 变量覆盖
  ```js
  var name = 'global-name';
  function logName() {
    console.log(name); // undefined
    if (true) {
      var name = 'fn-name';
    }
    console.log(name); // 'fn-name'
  }
  logName();
  //在 logName 函数执行时，var name 变量声明提升至 logName 的函数执行上下文中，默认值为 undefined
  ```
2. 本应销毁的变量没有销毁
  ```js
  for(var i=0;i<5;i++){
    
  }
  console.log(i);// 5
  ```


## 调用栈（call Stack）
在执行上下文创建后，JS 引擎会用栈来管理执行上下文，这个栈即调用栈。
```js
var a = 1;
function plus(a，b) {
  console.trace();//打印栈结构
  return a + b;
}
function plusTen(a，b) {
  var x = 10;
  return plus(a，b) + x;
}
plusTen(1，5)
```
在上面代码中，调用栈变化如下:
1. 创建全局上下文，并压入栈底。变量 a，函数 plus、plusTen 都在变量环境对象中。（然后执行代码）
2. 调用 plusTen 时，JS 编译该函数并创建执行上下文，然后压入栈中。变量x在该执行上下文的变量环境中
3. 调用 plus 函数创建执行上下文并压入栈中。
4. 执行 plus 中代码后，返回结果6，并销毁 plus 函数的执行上下文。接着返回 plusTen 中的结果16，并销毁执行上下文。最后，剩下全局执行上下文。

**注意**：当分配的栈空间被占满时，会引起“栈溢出”的错误。

## 作用域（scope）
作用域是指在程序中定义变量的区域，决定了变量的生命周期。作用域就是变量和函数可访问的范围。
**全局作用域**中的对象在代码中的任何地方都能访问，生命周期伴随着页面的生命周期；
**函数作用域**就是在函数内部定义的变量或函数只能在函数内部被访问；
**块级作用域**就是使用大括号包含的一段代码，如：
```js
if(true){}//if块
function fn(){}//函数块
for(let i=0;i<2;i++){}//for循环块
```
ES6通过let和const实现块级作用域。
```js
var a = 1;
let b = 2;
{
  //console.log(a);//Cannot access 'a' before initialization
  let a = 11;
  var c = 3;
  let d = 4;
  console.log(a);//11
  console.log(b);//2
  console.log(c);//3
}
console.log(a);//1
console.log(b);//2
console.log(c);//3
console.log(d);//error:d is not defined
```
上面代码中，全局执行上下文变化如下:
1. 编译并创建执行上下文，将保存变量 a、c，将 b 保存在词法环境中，并压入栈底（var 声明的变量存放在变量环境中；let 和 const 声明创建的变量在词法环境中）
2. 执行代码，当执行到块里面的代码时，将块内的变量压到栈顶。
3. 当执行到 console.log(b) 时，在词法环境栈由上到下，查找变量 b，没有找到则往变量环境中查找。
4. 执行完对应的代码后，销毁对应的块级作用域。   

**作用域链（scope chain）** 即 JS 引擎查找某个变量的链条。

**词法作用域**：代码中由变量和函数声明位置决定的作用域（静态作用域）。