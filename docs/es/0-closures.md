# 闭包/Closure

## 闭包的定义
### MDN 的闭包定义
> A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.  
> 一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。

### JS 高级程序设计第 4 版的闭包定义
> The terms anonymous functions and closures are often incorrectly used interchangeably. Closures are functions that have access to variables from another function’s scope.  
> 匿名函数经常被人误认为是闭包（closure）。闭包指的是那些引用了另一个函数作用域中变量的函数。  

（上面两种说法中的共同点就是闭包可以访问到外层作用域。在 JS 中，函数内部是能直接读取全局变量的，从这点上来说，JS 中的函数和闭包是一起出现的。）
### 其他定义
> 在 JavaScript 中，根据词法作用域规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，这些变量的集合称为闭包。比如外部函数是 foo，那么这些变量的集合就称为 foo 函数的闭包。

> ECMAScript中，闭包指的是：  
> 1. 从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。  
> 2. 从实践角度：以下函数才算是闭包：  
      i. 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）  
      ii. 在代码中引用了自由变量

（https://github.com/mqyqingfeng/Blog/issues/9）

## 闭包的应用
### 1. 柯里化函数
```js
function add(a) {
  return function (b) {
    return a + b
  }
}
const c = add(1)(2) // 3
```