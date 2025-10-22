# ES6 함수의 추가 기능

```js
var foo = function () {
  return 1;
};

// 일반적인 함수로서 호출
foo(); // 1

// 생성자 함수로서 호출
new foo(); // foo {}

// 메서드로서 호출
var obj = { foo: foo };
obj.foo(); // 1
```

ES6이전의 함수는 사용 목적에 따라 명확히 구분되지 않았다.

ES6이전의 모든 함수는 callable이면서 constructor다.
즉, 객체에 바인딩된 함수도 일반 함수로서 호출할 수. ㅣㅆ다는 것은 물론 생성자 함수로서 호출할 수도 있다.

```js
// 프로퍼티 f에 바인딩된 함수는 callable이며 constructor다.
var obj = {
  x: 10,
  f: function () {
    return this.x;
  },
};

// 프로포티 f에 바인딩된 함수를 메서드로서 호출
console.log(obj.f()); // 10

// 프로퍼티 f에 바인딩된 함수를 일반 함수로서 호출
var bar = obj.f;
console.log(bar()); // undefined

// 프로퍼티 f에 바인딩된 함수를 생성자 함수로서 호출
console.log(new obj.f()); // f {}
```

객체에 바인딩된 함수를 생성자 함수로 호출하는 경우는 흔치 않겠지만, 문법상으로 가능하다는 것이 문제가 있다. 이는 성능면으로도 문제가 있는데, prototype프로퍼티를 가지면서 프로토타입 객체도 생성한다는 것을 의미하기 때문이다.

```js
// 콜백 함수를 사용하는 고차함수 map. 콜백함수도 constructor이며 프로토타입을 생성한다.
[1, 2, 3].map(function (item) {
  return item * 2;
}); // [2, 4, 6]
```

ES6이전의 모든 함수는 사용 목적에 따라 명확한 구분이 없으므로 호출 방식에 특별한 제약이 없고 생성자 함수로 호출되지 않아도 프로토타입 객체를 생성한다.

### ES6의 함수 목적에 따른 사용

| ES6 함수의 구분 | constructor | prototype | super | arguments |
| --------------- | ----------- | --------- | ----- | --------- |
| 일반 함수       | O           | O         | X     | O         |
| 메서드          | X           | X         | O     | O         |
| 화살표 함수     | X           | X         | X     | X         |

## 메서드

ES6 사양에서 메서드는 메서드 축약 표현으로 정의된 함수만을 의미한다.

```js
const obj = {
  x: 1,
  // foo는 메서드다.
  foo() {
    return this.x;
  },
  // bar에 바인딩된 함수는 메서드가 아닌 일반 함수다.
  bar: function () {
    return this.x;
  },
};

console.log(obj.foo()); // 1
console.log(obj.bar()); // 1
```

ES6 사양에서 정의한 메서드는 인스턴스를 생성할 수. 없는 non-constructor다
즉, ES6 메서드는 생성자 함수로서 호출이 불가 하다.

```js
new obj.foo(); // TypeError
new obj.bar(); // bar {}
```

ES6 메서드는 인스턴스를 생성할 수. ㅓㅂㅅ으므로 prototype 프로터리가 없고, 프로토타입도 생성하지 않는다.

ES6 메서드는 자신을 바인딩한 객체를 가리키는 내부 슬롯 [[HomeObject]]를 갖는다. super 참조는 내부 슬롯을 사용해서 super클래스의 메서드를 참조하므로 내부 슬롯 [[HomeObject]]를 갖는 메서드는 super키워드 사용이 가능하다

```js
const base = {
  name: 'Lee',
  sayHi() {
    return `Hi! ${this.name}`;
  },
};

const derived = {
  __proto__: base,
  sayHi() {
    return `${super.sayHi()} how are you doing?`;
  },
};

console.log(derived.sayHi()); // Hi! Lee. how are you doing?
```

## 화살표 함수

기존 함수를 간략화 한 것 뿐 아니라, 콜백 함수 내부에서 this가 전역 객체를 가르키는 문제를 해결하기 위한 대안으로 유용하다.

정의의 경우 다 아는 내용이니 생략

## 일반 함수와, 화살표 함수의 차이

1. 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor이다.

```js
const Foo = () => {};

new Foo(); // TypeError
```

화살표 함수는 인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.

2. 중복된 매개변수 이름을 선언할 수 없다.

일반 함수에서는 중복된 매개변수를 작성하더라도 에러가 발생하지 않는다. 하지만 화살표 함수의 경우에는 에러가 발생한다.

3. 화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않는다.

화살표 함수 내부에서 참조를하면, 상위 스코프에대한 참조가 이루어진다.

### this

일반 함수와 화살표함수가 구분되는 가장 큰 특징이 this인데, 화살표 함수는 다른 함수의 인수로 전달되어 콜백함수로 활용되는 경우가 많다.

콜백 함수 내부에서 this가, 외부의 this와 다르기 때문에 발생하는 문제를 해결하기 위해 설계된 문법이다.

22장에서 나오듯 this는 호출되는 시점에 따라서 동적으로 결정되는데, 어떤식으로 호출되었는가에 따라서 this에 바인딩될 객체가 동적으로 결정된다.

이 때 주의할 점은, 함수 내부에서 호출되는 콜백함수의 경우이다.

```js
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    return arr.map(function (item) {
      return this.prefix + item;
    });
  }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
```

해당 예제에서 기대한 결과는 `['-webkit-transition', '-webkit-user-select']`다 하지만 TypeError가 발생하는데, 그 이유는 다음과 같다.

- add 메서드 내부에서 this는 메서드를 호출한 객체(prefixer 객체)를 가르킨다.
- 하지만 Array.prototype.map의 인수로 전달한 콜백함수의 내부에서 this는 undefined를 가르킨다. 이름 Array.prototype.map 메서드가 콜백 함수를 일반 함수로서 호출하기 때문인다.

일반 함수로 호출되는 모든 함수 내부의 this는 전역 객체를 가르킨다. 하지만 클래스 내부의 모든 코드는 암묵적으로 `strict mode`가 적용되게 되는데, 이 때문에 undefined가 바인딩 되면서 외부의 this와, 내부에서 사용된 this가 불일치를 일으키면서 에러를 발생시키는 것 이다.

ES6이전에는 해당 문제를 해결하기 위해서 다음과 같이 작성했다.

1. this를 회피시킨 후, 내부에서 사용하도록 한다.

```js
add(arr) {
  const that = this;
  return arr.map(function (item) {
    return that.prefix + ' ' + item;
  });
}
```

2. ES5에 정의된 Array.prototype.map의 경우 두 번째 인수값으로 콜백 함수 내부에서 this를 전달받을 수 있었음

```js
add(arr) {
  return arr.map(function (item) {
    return this.prefix + ' ' + item;
  }, this);
}
```

3. Function.prototype.bind 메서드를 사용하여 바인딩

```js
add(arr) {
  return arr.map(function (item) {
    return this.prefix + ' ' + item;
  }.bind(this));
}
```

### lexical this

화살표 함수를 사용해 함수 내부에서 this를 참조하면, 상위 스코프의 this를 그대로 참조하는데 이를 `lexical this`라고 부른다.

만약 화살표 함수 내부에서 다른 화살표함수에서 this를 참조한다면, 상위 화살표함수는 this바인딩이 없으므로, 화살표함수가 아닌 함수를 찾아서 참조한다.

## 다양한 쓰임

```js
window.x = 1;

const normal = function () {
  return this.x;
};
const arrow = () => this.x;

console.log(normal.call({ x: 10 })); // 10
console.log(arrow.call({ x: 10 })); // 1
```

화살표함수는 this바인딩을 가지지 않기 때문에 `Function .prototype.call`,과 같은 메서드를 사용해도 this를 교체할 수 없다

하지만 아예 쓸 수 없는건 아니고 this교체만 불가한 것 뿐

```js
const add = (a, b) => a + b;

console.log(add.call(null, 1, 1)); // 3
```

이런식으로 사용이 가능하긴 함

### 쓰면 안되는 곳

모든 곳에서 화살표 함수를 그냥 사용하는건 아니다, 메서드와 같은 부분에서는 화살표함수가 아닌 ES6의 메서드 축약 표현을 사용하는편이 적절하다.

```js
// Bad
const person = {
  name: 'Lee',
  sayHi: () => console.log(`Hi ${this.name}`);
}

person.sayHi(); // Hi
```

위 코드 처럼 this는 상위인 전역 this를 가르키기 때문에 name을 불러올 수 없다.

```js
// Good
const person = {
  name: 'Lee',
  sayHi() {
    console.log(`Hi ${this.name}`);
  },
};

person.sayHi(); // Hi Lee
```

prototype 메서드도 마찬가지이다.

## super

화살표 함수는 함수 자체의 super바인딩도 갖지 않는다. 따라서 화살표 함수 내부에서 super를 참조하면 this와 마찬가지로 상위 스코프의 super를 참조한다.

```js
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}`;
  }
}

class Derived extends Base {
  sayHi = () => `${super.sayHi()} how are you doing?`;
}

const derived = new Derived('Lee');
console.log(derived.sayHi()); // Hi Lee how are you doing?
```

this와 마찬가지로, Derived 클래스의 constructor를 참조하는데, Derived 클래스의 constructor의 super는 Base 클래스이므로, super는 결국 Base 클래스를 바라본다.

## arguments

화살표 함수는 함수 자체의 arguments 바인딩을 갖지 않는다. 동일하게 참조를 하면 상위 스코프의 arguments를 참조한다.

```js
(function () {
  const foo = () => console.log(arguments); // [Arguments] { '0': 1, '1': 2 }
  foo(3, 4);
})(1, 2);
```

위 코드는 화살표 함수의 상위 스포크인 즉시실행 함수의 arguments를 참조한다.

화살표함수에서는 arguments를 사용할 수 없기 때문에 도움이 안되고, 대신 Rest 파라미터를 사용한다.

## Rest 파라미터

`...`을 붙여서 정의한 매개변수를 의미한다.
인수의 목록을 배열 형태로 전달받는다.

```js
function foo(...rest) {
  console.log(rest); // [1, 2, 3, 4, 5]
}

foo(1, 2, 3, 4, 5);
```

rest 파라미터는 함수 객체의 length에 영향을 주지 못한다.

```js
function foo(...rest) {}
console.log(foo.length); // 0

function bar(x, ...rest) {}
console.log(bar.length); // 1
```

### arguments와 rest 파라미터

```js
function sum() {
  var arr = Array.prototype.slice.all(arguments);

  return arr.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

ES5에서는 유사배열인 arguments를 실제 배열로 바꾸기 위해서 변환이 필요했지만

```js
function sum(...args) {
  return args.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

Rest 파라미터 덕분에 쉽게 구현이 가능

Rest 파라미터에도 기본값 설정이 불가하다.

```js
function foo(...rest = []) {
  console.log(rest);
}
```
