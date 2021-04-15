# 类/Class
是新的基础性语法糖结构，实际上使用的是原型和构造函数概念。

## 1. 类定义：类声明和类表达式
```js
class Person {} // 类声明
const Plant = class {} // 类表达式
```
与函数表达式类似，类表达式在被求值前不能引用。函数声明可以提升，但类定义不能：
```js
console.log(funcExpression) // undefined
var fucExpression = function () {}
console.log(funcExpression) // function () {}

console.log(funDeclaration) // function funcDeclaration() {}
function funcDeclaration() {}

console.log(ClassExpression) // undefined
var ClassExpression = class {}
console.log(ClassExpression) // class {}

console.log(ClassDeclaration) // ReferenceError: ClassDeclaration is not defined
class ClassDeclaration {}
console.log(ClassDeclaration) // class ClassDeclaration {}
```

### 1.1 类的构成
类可以包含构造函数方法、实例方法、获取函数、设置函数和静态类方法（都不是必需的），默认情况下，类定义中的代码都在严格模式下执行。
```js
class Person {
  constructor() {} // 构造函数方法
  get getFunc() {} // 获取函数
  static staticFuc() {} // 静态函数
}

// 类表达式的名称可选，可以通过 name 属性获取，但不能在作用域外部访问
let Plant = class PlantName {
  logName() {
    console.log(Plant.name)
    console.log(PlantName.name)
  }
}
let p = new Plant()
p.logName() // PlantName, PlantName
console.log(Plant.name) // PlantName
console.log(PlantName) // ReferenceError: PlantName is not defined
```

## 2. 类构造函数
constructor 会告诉解释器在使用 new 操作符创建类的新实例时，应该调用这个函数。不定义义构造函数相当于将构造函数定义为空函数。

### 2.1 实例化
类构造函数必须使用 new 操作符。（普通构造函数不使用 new 调用，会以全局的 this 作为内部对象）。实例化之后，它会成为普通的实例方法（但仍然要使用 new 调用）。  
使用 new 调用类的构造函数会执行如下操作：  
1. 在内存中创建一个新对象  
2. 新对象内部的[[Prototype]]指针被赋值为构造函数的 prototype 属性   
3. this 指向新对象  
4. 执行构造函数内部的代码  
5. 如果构造函数返回为空，返回该对象；否则，返回新对象   

```js
function Plant() {
  console.log(this)
}
class Person { 
  constructor(override) { 
    this.foo = 'foo'
    if (override) { 
      return { 
        bar: 'bar' 
      }
    } 
  } 
}

let pl0 = Plant() // 在浏览器中，this => window
let pe0 = Person() // TypeError: Class constructor Person cannot be invoked without 'new'
let pe1 = new Person()
pe1.constructor() // TypeError: Class constructor Person cannot be invoked without 'new'
let pe2 = new p1.constructor() // 使用对类构造函数的引用创建一个新实例

let p1 = new Person()
let p2 = new Person(true)
console.log(p1) // Person{ foo: 'foo' } 
console.log(p1 instanceof Person) // true 
console.log(p2) // { bar: 'bar' } 
console.log(p2 instanceof Person) // false
// p2 是构造函数返回的，原型指针没有修改
```

### 2.2 类是特殊函数
类具有与普通构造函数一样的行为（也有普通函数的行为）：
+ 类标识符有 prototype 属性，而这个原型也有 constructor 属性指向类自身。  
+ 可以使用 instanceof 操作符检查一个对象与类构造函数，以确定这个对象是不是类的实例。  
**注意**：类的 constructor 不会被当成构造函数，使用 instanceof 操作符时会返回 false。（但在创建实例时直接将类构造函数当成普通构造函数来使用，那么 instanceof 操作符返回 true）  
```js
class Person {}
console.log(typeof Person) // function
console.log(Person.prototype.constructor === Person) // true

let p0 = new Person()
console.log(p0.constructor === Person) // true
console.log(p0 instanceof Person) // true
console.log(p0 instanceof Person.constructor) // false

let p1 = new Person.constructor()
console.log(p1.constructor === Person) // false
console.log(p1 instanceof Person) // false
console.log(p1 instanceof Person.constructor) // true
```

## 3. 实例、原型和类成员
### 3.1 实例成员
通过 new 调用类标识符时，会执行类构造函数。在类构造函数内部，可以为新创建的实例（this）添加“自有”属性。（构造函数执行结束后，可以继续给实例添加属性）  
每个实例都对应一个唯一的成员对象，不会在原型上共享
```js
class Person {
  constructor() {
    this.name = 'SuperMan'
    this.nums = [0]
    this.logSuperName = () => console.log(this.name)
  }
  logName() {
    console.log(this.name)
  }
}
let p1 = new Person(), p2 = new Person()
p1.logName() // 'SuperMan'
p2.logName() // 'SuperMan'
p1.nums.push(1)
console.log(p1.logSuperName === p2.logSuperName) // true
console.log(p1.logName === p2.logName) // false
console.log(p1.nums) // [0, 1]
console.log(p2.nums) // [0]
```
### 3.2 原型方法与访问器
为了在实例间共享方法，类定义语法把在类块中定义的方法作为原型方法。  

```js
const symbolKey = Symbol('symbolKey')
class Person {
  constructor() {
    this.name = 'SuperMan'
    this.nums = [0]
    this.logName = () => console.log('instance')
  }
  logName() {
    console.log('ptototype')
  }

  // 类方法等同于对象属性，可以使用字符串、符号或计算的值作为 key
  [symbolKey]() {
    console.log('invoked symbolKey')
  }
  ['computed' + 'Key']() {
    console.log('invoked computedKey')
  }

  // 类定义支持获取和设置访问器
  set age(num) {
    this._age = num
  }
  get age() {
    return this._age
  }
}
let p1 = new Person(), p2 = new Person()
p1.logName() // 'instance'
Person.prototype.logName() // 'ptototype'
p1.age = 1
console.log(p1.age)
```

### 3.3 静态类方法
静态方法通常用于执行不特定于实例的操作，也不要求存在类的实例。

```js
class Person {
  constructor() {
    this.logName = () => console.log('__instance', this)
  }
  logName() {
    console.log('__prototype', this)
  }
  static logName() { // 定义在类本身上
    console.log('__class', this)
  }
}
let p0 = new Person()
p0.logName() // __instance Person {}
Person.prototype.logName() // __prototype { constructor: ... }
Person.logName() // __class classPerson {}
```

### 3.4 非函数原型和类成员
类定义并不显式支持在原型或类上添加成员数据，但在类定义外部可以手动添加数据。
**注意：**类定义中没有显式支持添加数据成员，是因为在原型和类上添加可修改的数据成员是一种反模式。对象实例应该独自拥有通过 this 引用的数据。
```js
class Person {
  logName() {
    console.log(Person.lastName + this.firstName)
  }
}
Person.lastName = 'person1'
Person.prototype.firstName = 'test'

let p = new Person()
p.logName() // 'person1test'
```

### 3.5 迭代器与生成器方法
```js
class Person {
  constructor() {
    this.nums = [1, 2, 3]
  }
  // 在原型上定义生成器方法
  *createNumsIterator() {
    yield 1
    yield 2
    yield 3
  }
  *[Symbol.iterator]() {
    yield *this.nums.entries()
  }
  // 在类上定义生成器方法
  static *createStrIterator() {
    yield 'a'
    yield 'b'
    yield 'c'
  }
}

let p = new Person()
for (let [idx, num] of p) {
  console.log(num)
}
let numIter = p.createNumsIterator()
console.log(numIter.next().value) // 1
console.log(numIter.next().value) // 2
console.log(numIter.next().value) // 3

let strIter = Person.createStrIterator()
console.log(strIter.next().value) // a
console.log(strIter.next().value) // b
console.log(strIter.next().value) // c
```

## 4. 继承
### 4.1 继承基础
使用 extends 可以继承任何拥有[[Constrct]] 和原型的对象。

### 4.2 构造函数、HomeObject、super()
派生类的方法可以用 super 关键字引用原型，**仅限于类构造函数、实例方法和静态方法内部**。在类构造函数中使用 super 可以调用父类构造函数。

> ES6 给类构造函数和静态方法添加了内部特性[[HomeObject]]，这个特性是一个指针，指向定义该方法的对象。这个指针是自动赋值的，而且只能在 JS 引擎内部访问。super 始终会定义为[[HomeObject]]的原型。

```js
class Game {
  constructor(props) {
    this.initial = true
    this.props = props
  }
  static logType() {
    console.log('Game')
  }
}

class Pokemon extends Game {
  constructor(props) {
    // 不要在调用 super()之前引用 this
    super(props) // 相当于 super.constructor()
    console.log(this instanceof Game) // true => 调用 super() 会调用父类构造函数，并将返回的实例赋值给 this
  }
  static logType() {
    // 在静态方法中可以通过 super 调用继承的类上定义的静态方法
    super.logType()
  }
}

/* 虽然没有定义类构造函数，在实例化派生类时，还是会调用 super()，并传入参数 */
class Digimon extends Game {}

const digimon = new Digimon('this is digimon')
const pokemon = new Pokemon('this is pokemon')
Pokemon.logType() // Game
console.log(digimon) // Digimon { initial: true, props: 'this is digimon' }
console.log(pokemon) // Pokemon { initial: true, props: 'this is pokemon' }
```
**注意：**
+ super 只能在派生类构造函数和静态方法中使用
+ 不能单独引用 super 关键字，要么用它调用构造函数，要么用它引用静态方法。

### 4.3 抽象基类：可继承，但本身不能被实例化
new.target 保存通过 new 关键字调用的类或函数。通过在实例化时检测 new.target 是不是抽象基类，可以阻止对抽象基类的实例化。在抽象基类构造函数中进行检查，可以要求派生类必须定义某个方法。
```js
class BaseClass {
  constructor() {
    console.log(new.target)
    if (new.target === BaseClass) {
      throw new Error(' Abstract base class cannot be directly instantiated')
    }
  }
}

new BaseClass() // Abstract base class cannot be directly instantiated
```

### 4.4 继承内置类型
```js
class SuperArray extends Array {
  static get [Symbol.species]() { // 修改了返回的实例类型
    return Array
  }
  shuffle() { // 洗牌算法
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]]
    }
  }
}
let sArr0 = new SuperArray(1, 2, 3, 4, 5)
let sArr1 = new SuperArray(1, 2, 3, 4)
let arr = sArr1.filter(a => a % 2) 
/* 默认情况下，内置类型返回的实例类型与原始实例的类型一致，即 arr instanceof SuperArray === true
 * 但上面代码修改了返回实例的类型，arr instanceof SuperArray === false
 */

sArr0.shuffle()
console.log(sArr0) // SuperArray [ 2, 1, 3, 4, 5 ]
console.log(arr) // SuperArray [ 1, 3 ]
console.log(sArr0 instanceof Array) // true
console.log(sArr0 instanceof SuperArray) // true
```

### 4.5 类混入：把不同类的行为集中到一个类
```js
class SuperClass {}
function getSuperClass() {
  console.log('wrapper')
  return SuperClass
}
class SubClass extends getSuperClass() {}

let mixinA = Superclass => class extends Superclass {
  logA() {
    console.log('a')
  }
}
let mixinB = Superclass => class extends Superclass {
  logB() {
    console.log('b')
  }
}
let mixinC = Superclass => class extends Superclass {
  logC() {
    console.log('c')
  }
}
function mix(BaseClass, ...Mixins) {
  return Mixins.reduce((accumulator, current) => current(accumulator), BaseClass)
}
class MixinSubClass extends mix(SuperClass, mixinA, mixinB, mixinC) {}
let subMixin = new MixinSubClass()
subMixin.logA() // 'a'
subMixin.logB() // 'b'
subMixin.logC() // 'c'
```