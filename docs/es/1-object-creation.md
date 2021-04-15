# 创建对象/Object Creation

## 1. 构造函数和对象字面量
```js
const obj0 = {} // 对象字面量
const obj1 = new Object()
```
使用 Object 构造函数和对象字面量可以创建对象，但是创建具有同样接口的多个对象时会有很多重复代码。

## 2. 工厂模式
工厂模式（The Factory Pattern）：用函数来封装以特定接口创建对象的细节。  

```js
function createPerson(name, age) {
  let o = new Object()
  o.name = name
  o.age = age
  o.sayName = function() {
    console.log(this.name);
  }
  return o 
}
let p1 = createPerson('first', 1)
let p2 = createPerson('second', 2)
```
### 2.1 问题
+ 返回结果是对象，没有解决对象标识问题，即无法判断创建的对象是什么类型

## 3. 构造函数模式
构造函数模式（The Function Constructor Pattern）：以函数的形式为自己的对象类型定义属性和方法。

**注意**：函数首字母大写。
```js
function Person(name, age) {
  this.name = name
  this.age = age
  this.sayName = function() {
    console.log(this.name)
  }
}
let person1 = new Person('p1', 1)
let person2 = new Person('p2', 2)
console.log(person1 instanceof Object) // true
console.log(person1 instanceof Person) // true
console.log(person2 instanceof Object) // true
console.log(person2 instanceof Person) // true
console.log(person1.sayName === person2.sayName) // false
```
new 执行的操作：
1. 在内存中创建一个新对象  
2. 新对象内部的[[Prototype]]指针被赋值为构造函数的 prototype 属性   
3. this 指向新对象  
4. 执行构造函数内部的代码  
5. 如果构造函数返回为空，返回该对象；否则，返回新对象   

### 3.1 优缺点
+ 优点：可以识别对象的类型。  
+ 缺点：定义的方法会在每个实例上都创建一遍，虽然函数可以放到全局作用域，但是也会污染全局作用域。  

## 4. 原型模式/The Prototype Pattern
函数有一个 prototype 属性，这个属性是一个对象，这个对象包含应该由特定引用类型的实例共享的属性和方法，这
个对象就是调用 constructor 创建的对象原型。  
```js
function Person() {}
Person.prototype.name = 'person'
Person.prototype.age = 0
Person.prototype.nums = []
Person.prototype.sayName = function() {
  console.log(this.name)
}
let person1 = new Person()
let person2 = new Person()
person1.nums.push(1)
console.log(person1.sayName == person2.sayName) // true
console.log(person2.nums) // [1]
```
### 4.1 优缺点
+ 定义的方法只创建一遍，都在原型上，由实例共享（优点）
+ 定义的属性由所有实例共享（缺点）

## 5. 组合模式
组合使用构造函数模式和原型模式：实例属性在构造函数中定义,实例共享属性 constructor 和方法在原型中定义。  
```js
function Person(name, age){
  this.name = name
  this.age = age
}
Person.prototype = {
  constructor: Person,
  sayName: function (){
    console.log(this.name)
  }
}
const p0 = new Person('p0', 0)
console.log(p0 instanceof Person) // true
```
### 5.1 优点
+ 可以使用 instanceof 确定对象类型。
+ 不会多次创建函数

## 6. 动态原型模式
**注意**:不能使用对象字面量重写原型。  
```js
let count = 0
function Person(name, age) {
  this.name = name
  this.age = age
  if(typeof this.sayName !== 'function'){ // if 内的代码只会在初次调用构造函数时执行
    count += 1
    Person.prototype.sayName = function() {
      console.log(this.name)
    }
  }
}
const p0 = new Person('p0', 0)
const p1 = new Person('p1', 1)
console.log(p0 instanceof Person) // true
console.log(count) // 1
```
### 6.1 优点
+ 可以使用 instanceof 确定对象类型。
+ 不会多次创建函数

## 7. 寄生构造函数模式
寄生构造函数基本思想：创建一个函数来封装创建对象的代码，然后返回新创建的对象。除了使用 new 操作符，并把包装函数叫做构造函数，其他与工厂模式一致。  
**注意：**返回的对象与构造函数或者构造函数的原型没有关系。   
```js
function Person(name, age) {
  let o = new Object()
  o.name = name
  o.age = age
  o.sayName = function() {
    console.log(this.name)
  }
  return o
}
let person1 = new Person('person1', 1)
person1.sayName()

function SpecialArray() {
  let values = new Array()
  values.push.apply(values, arguments)
  values.toPipedString = function() {
    return this.join('|')
  }
  return values
}
let colors = new SpecialArray('red', 'blue', 'green')
console.log(colors.toPipedString()) //'red|blue|green'
```
### 7.1 问题
+ 与工厂模式一样，返回的对象无法用 instanceof 确定对象类型。

## 8. 稳妥构造函数模式
稳妥对象（durable objects）：没有公共属性，方法不引用 this 的对象。  
与寄生构造函数的不同:
+ 新创建对象的实例方法不引用 this
+ 不使用 new 操作符调用构造函数
```js
function Person(name) {
  let o = new Object()
  o.sayName = function() {
    console.log(name)
    return name
  }
  return o
}
let friend = Person('x', 1)
friend.sayName() // 'x'
// 这种模式创建的对象中，除了使用 sayName 方法，其他办法不能访问 name 的值
```
### 8.1 优点与问题
+ 优点：除了调用属性的方法，没有别的方法能访问传入到构造函数的原始数据。
+ 问题：无法使用 instanceof 确定对象类型。
