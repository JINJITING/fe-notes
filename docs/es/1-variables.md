# 变量/Variables
ES 变量包含两种不同类型的数据：原始值（primitive value，即简单的数据）和引用值（reference value，多个值构成的对象）。保存原始值的变量是**按值**（by value）访问的，操作的是存储在变量中的实际值；引用值是保存在内存中的对象，操作的是对该对象的引用，即**按引用**（by reference）访问的。  

## 动态属性
对于引用值，可以随时添加、修改和删除其属性和方法。  
```js
let str0 = 'string'
let str1 = new String('string obj')
str0.name = 'test0'
str1.name = 'test1'
console.log(str0.name) // undefined
console.log(str1.name) // test1
console.log(typeof str0) // string
console.log(typeof str1) // object
```

## 复制
原始值复制的变量相互独立；复制引用值时，实际复制的是一个指针，两个变量都指向同一个对象。  
```js
let n0 = 0
let n1 = n0
n1 = 1
console.log(n0, n1) // 0 1

let obj0 = new Object()
let obj1 = obj1
obj0.num = 0
console.log(obj1.num) // 0
```

## 参数传递
所有的参数都是按值传递的。在按值传递参数时，值会被复制到一个局部变量（即 arguments 对象中的一个槽位）。

```js
// 函数的参数是局部变量
function addName(obj) {
  obj.name = 'name0'
  obj = {}
  obj.name = 'name1'
}

let p0 = new Object()
addName(p0)
console.log(p0.name) // name0
/**
 * 如果变量按引用传递，p0 应该是 name 属性为 name1 的对象。
 * 当 obj 在函数内部被重写时，它变成了一个指向本地对象的指针。而本地对象在函数执行结束时就被销毁了
 */
```