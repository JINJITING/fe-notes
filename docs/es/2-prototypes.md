# 原型和原型链

## 构造函数-原型对象-实例的关系
函数 function（非箭头函数）都有一个 prototype 属性指向原型对象。默认情况下，所有的原型对象自动获得一个 constructor 属性，指向关联的构造函数。构造函数可以给原型对象添加其他的属性和方法。每次调用构造函数创建新的实例，这个是实例内部的[[Prototype]]属性指向原型对象。**实例与构造函数原型之间有直接的联系，但实例与构造函数之间没有** 

+ `__proto__` 可以访问对象的原型
+ Object.getPrototypeOf() 会返回 [[Prototype]] 的值 
+ 可以使用 isPrototypeOf() 方法确定实例与原型对象之间的关系
+ `instanceof` 可以检查实例的原型链中是否包含构造函数的原型

```js
function Constructor() {}
Constructor.prototype.constructor === Constructor // true，Constructor.prototype 为构造函数的原型对象
let instance = new Constructor()
let instance1 = new Constructor()

console.log(instance, '__instance')
/**
 * Constructor {
 *   __proto__: Object
 * }
 */

console.log(Object.getPrototypeOf(instance))
/**
 * {
 *   constructor: f Constructor()
 *   __proto__: Object
 * }
 */

console.log(Constructor.prototype.isPrototypeOf(instance)) // true
console.log(Object.getPrototypeOf(instance) === Constructor.prototype) // true

// 构造函数、原型对象、实例是完全不同的
console.log(instance !== Constructor) // true
console.log(instance !== Constructor.prototype) // true
console.log(Constructor.prototype !== Constructor) // true

/**
 * 实例通过 __proto__ 链接到原型对象（指向[[Prototype]]）；
 * 构造函数通过 prototype 属性链接到原型对象；
 * 实例通过原型链访问原型对象上的 constructor 属性
 */
console.log(instance.__proto__ === Constructor.prototype) // true
console.log(instance.__proto__.constructor === Constructor) // true

// 同一个构造函数创建的实例共享原型对象
console.log(instance1.__proto__ === instance.__proto__, 'instance share a prototype') // true

console.log(instance instanceof Constructor) // true
```

## 原型链
原型对象实际上也是 Object 构造函数的实例，所以这个原型对象也有一个内部指针指向另一个原型，这样就在实例和原型之间形成了一条原型链。调用实例的属性和方法时，会顺着原型链一直往上查找。  

```js
function Constructor() {}
let instance = new Constructor()

console.log(Constructor.prototype.__proto__ === Object.prototype) // true
console.log(Constructor.prototype instanceof Object) // true
console.log(instance instanceof Object) // true

// 原型链的尽头是 null => 表示没有对象
console.log(Object.prototype.__proto__ === null) // true
```