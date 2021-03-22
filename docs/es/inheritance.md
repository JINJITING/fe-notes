# 继承（Inheritance）
ES 继承只支持实现继承，依靠**原型链**实现。

构造函数、原型、实例的关系：每个构造函数都有一个原型对象，原型对象有一个属性指向构造函数，实例有一个内部指针指向原型。  
```js
// 代码描述
function Constructor() {}
Constructor.prototype.constructor === Constructor // true
let instance = new Constructor()
instance.__proto__ === Constructor.prototype // true
instance.constructor === Constructor // true
```

## 1. 原型链/Prototype Chaining
基本思想：通过原型继承多个引用类型的属性和方法。将原型指向另一个类型的实例，这个原型就有一个内部指针指向另一个原型，另一个原型也有一个指针指向另一个构造函数。

**注意**：用对象字面量创建原型方法，会重写原型链。
```js
function SuperType() {
  this.property = true
}
SuperType.prototype.getSuperValue = function() {
  return this.property
}
function SubType() {
  this.subProperty = false
}
SubType.prototype = new SuperType() // 继承 SuperType，将 SubType 的原型指向 SuperType 的实例，重写了 SubType 最初的原型，SuperType 实例可以访问的所有属性、方法都存在于 SubType.prototype 

SubType.prototype.getSubValue = function () {
  return this.subProperty
}
let instance = new SubType()
/**
 * SubType.prototype.__proto__ === SuperType.prototype
 * SubType.prototype.constructor === SuperType
 * instance.__proto__ === SubType.prototype
 * instance.constructor === SuperType
 * 
 * getSuperValue() 在 SuperType.prototype 对象上，property 在 SubType.prototype 对象上（方法在原型上，属性在实例上）
 */
```
### 1.1 原型与实例的关系：instanceof、isPrototypeOf()
```js
instance instanceof Object // true
instance instanceof SuperType // true
instance instanceof SubType // true

Object.prototype.isPrototypeOf(instance) // true
SuperType.prototype.isPrototypeOf(instance) // true
SubType.prototype.isPrototypeOf(instance) // true
```
### 1.2 问题
+ 原型中包含的引用类型的值会在所有实例间共享。
    ```js
    function SuperType() {
      this.nums = [1, 2, 3]
    }
    function SubType(params) {
      this.name = params
    }
    SubType.prototype = new SuperType()
    let instance = new SubType()
    let instance1 = new SubType()
    instance.nums.push(4)
    console.log(instance.nums) // [1, 2, 3, 4]
    console.log(instance1.nums) // [1, 2, 3, 4]
    console.log(SubType.prototype.nums) // [1, 2, 3, 4]
    ```
+ 子类在实例化时不能给父类的构造函数传参。无法在不影响所有对象实例的情况下，把参数传进父类的构造函数。

## 2. 盗用构造函数/Constructor Stealing
为了解决原型包含引用值共享的问题，也叫“对象伪装”、“经典继承”。
基本思路：在子类构造函数中调用父类构造函数。使用 apply() 和 call() 方法以新创建的对象为上下文执行构造函数。

```js
function SuperType(name) {
  this.name = name
  this.nums = [1]
  this.logSuperName = function() {
    console.log(this.name)
  }
}
function SubType(name = 'subType', type) {
  SuperType.call(this, name) // 继承 SuperType
  this.type = type
  this.logSubType = function() {
    console.log(this.type)
  }
}
let instance0 = new SubType()
let instance1 = new SubType()
instance0.nums.push(2)
console.log(instance0.nums) // [1, 2]
console.log(instance1.nums) // [1]
```
### 2.1 优点和问题
优点：
+ 避免了原型中的引用类型的值被所有实例共享。
+ 可以在子类构造函数中向父类构造函数传参。**注意**：这个参数会在实例上定义一个属性，为了避免父类构造函数不会覆盖子类构造函数的属性，可以在调用父类构造函数后再给子类实例添加额外的属性。

问题：
+ 必须在构造函数中定义方法，每次实例化对象都要重新创建一遍方法，因此函数不能复用。
+ call 子类不能访问父类原型上定义的方法。

## 3. 组合(Combination)继承
也叫伪经典继承，集合了原型链和盗用构造函数。  
基本思路：使用原型链继承原型上的属性和方法，通过盗用构造函数继承实例属性。

```js
function SuperType(name) {
  this.name = name
  this.nums = [1]
}
SuperType.prototype.showName = function() {
  console.log(this.name)
}
function SubType(name, age) {
  SuperType.call(this, name) // 继承属性，调用父级构造函数
  this.age = age
}
SubType.prototype = new SuperType() // 继承方法，调用父级构造函数
SubType.prototype.showAge = function() {
  console.log(this.age)
}

let instance0 = new SubType('instance0', 0)
let instance1 = new SubType('instance1', 1)
instance0.nums.push(2) // instance0.nums log[1, 2]; instance1.nums log[1]
instance0.showName() // instance0
instance1.showName() // instance1
instance0.showAge()  // 0
instance1.showAge()  // 1
```

### 3.1 优缺点
优点：
+ 方法被共享，不用在构造函数上声明（原型链的优点）
+ 避免了原型中的引用类型的值被所有实例共享，可以给父类构造函数传参（盗用构造函数的优点）
+ 保留了 instanceof、isPrototypeOf() 识别合成对象的能力

缺点：
+ 会调用两次父类构造函数：一次在修改子类构造函数的原型，一次在子类构造函数内部
## 4. 原型式(Prototypal)继承
```js
function object(obj) { // 
  function F() {}
  F.prototype = obj
  return new F()
}
```
基本思想：用上面的 object() 创建一个临时构造函数，将传入的对象赋值给这个构造函数的原型，然后返回这个构造函数的实例。本质上，是对传入对象进行了一次浅复制。在只有一个参数时，object() 与 Object.create() 效果相同。

```js
let objOrigin = {
  name: 'origin',
  nums: [1],
}
let objCopy0 = object(objOrigin)
let objCopy1 = object(objOrigin)
let objCreate0 = Object.create(objOrigin)
objCopy0.name = 'copy0'
objCopy0.nums.push(2)
console.log(objCopy1.name) // 'origin'
console.log(objCopy1.nums) // [1, 2]
console.log(objCreate0.nums) // [1, 2]
let objCreate1 = Object.create(objOrigin, {
  name: {
    value: 'objCreate1',
  }
})
objCreate1.nums.push(3)
console.log(objCopy1.nums) // [1, 2, 3]
```
### 4.1 适用性与问题
+ 适用性：适用于不需要单独创建构造函数，但需要在对象间共享信息的场合。
+ 问题：属性中的引用值会被共享

## 5. 寄生式(Parasitic)继承
基本思路：创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。
```js
function createAnother(origin) {
  let clone = Object.create(origin) // 实现继承的函数，只要返回新对象即可
  clone.logName = function() { // 增强
    console.log('clone')
  }
  return clone
}

let objOrigin = {
  name: 'origin',
  nums: [0],
}

let clone0 = createAnother(objOrigin)
```
### 5.1 适用性与问题
+ 适用主要关注对象，而不在乎类型和构造函数的场景
+ 问题：给对象添加方法，每次都要重新创建方法，函数不能复用

## 6. 寄生组合(Parasitic Combination)继承
基本思路：不通过调用父类构造函数给子类原型赋值，而是取父类原型的一个副本。（使用寄生式来继承父类原型，然后将返回的新对象赋值给子类原型）
```js
function inheritPrototype(subType, superType) {
  let prototype = Object.create(superType.prototype) // 创建对象，创建父类原型的一个副本
  subType.prototype = prototype // 赋值对象
  prototype.constructor = subType // 增强对象，解决由于重写原型导致默认 constructor 丢失的问题
}
// inheritPrototype 实现来寄生式组合继承的核心逻辑

function SuperType(name) {
  this.name = name
  this.nums = [0]
}
SuperType.prototype.logName = function() {
  console.log(this.name)
}
function SubType(name, type) {
  SuperType.call(this, name)
  this.type = type
}
SubType.prototype.logType = function() {
  console.log(this.type)
}
inheritPrototype(SubType, SuperType)
```

### 6.1 优点
+ 只调用一次父类构造函数（组合继承）
+ 避免来子类构造函数的原型上不必要的属性
+ instanceof 和 isPrototypeOf() 有效