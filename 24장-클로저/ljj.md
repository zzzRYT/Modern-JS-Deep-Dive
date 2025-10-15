# 클로저

> 클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다. (MDN)

## 렉시컬 스코프

13.5 절에 나옴 (복습)

자바스크립트 엔진은 렉시컬 스코프를 따르기 때문에 함수가 어디에서 호출되었는지가 중요한게 아니라, 함수가 어디에서 선언되었는지에 따라서 상위 스코프가 결정된다.

이 부분을 이제 이전 장에서 배웠던 걸 생각해 본다면, 결국, 렉시컬 스코프의 상위 스코프가 결정되는 방식은,`외부 렉시컬 환경에 의한 참조`를 통해서 이루어진다는 것 이다. 이것은 `스코프 체인`이고, 함수 정의가 평가되는 시점에 상위 스코프가 결정된다.

## 함수 객체의 내부 슬롯 [[Environment]]

선언하는 곳과 다른 곳에서 함수가 호출되는 경우가 있다. 그런데, 선언한 곳과 다른곳에서 함수를 호출했을 때, 해당 함수의 렉시컬 스코프를 알 수 있게 하기 위해서 함수 객체 내부의 `[[Environment]]`에 외부 렉시컬 환경에 대한 참조를 저장합니다.

이 때, 내부 슬롯에 저장된 상위 스코프 참조는, 현재 실행중인 실행 컨텍스트의 렉시컬 환경을 가르킨다.

-> 이 부분이 당연한 이유는 현재 실행중인 실행 컨텍스트의 렉시컬 환경이 바로 상위 스코프를 참조하기 때문이다.

## 클로저와 렉시컬 환경

```js
const x = 1;

function outer() {
    const x = 10;
    const inner function () { console.log(x); };
    return inner;
}
const innerFunc = outer();
innerFunc(); // 10
```

outer함수가 호출되고, outer함수는 inner함수를 반환한다. 그리고 outer함수의 생명주기는 끝난다.

outer함수의 실행이 종료되었기 때문에 실행 컨텍스트에서도 팝 된다.

내부에서 선언된 변수 x = 10이라는 값에 더이상 접근할 수 없는 것 처럼 보이지만, 실제로 innerFunc()를 찍어보면 10이 호출된다.

---

이 처럼 외부 함수보다 중첩 함수가 더 오래 유지되는 경우 이미 생명주기가 끝난 외부 함수에 대한 참조가 가능하다. 이러한 중첩 함수를 `클로저`라고 부른다.

이게 가능한 이유는, `[[Environment]]`에서 평가 단계의 현재 실행중인 실행 컨텍스트의 렉시컬 스코프 즉, 상위 스코프에 대한 참조를 저장하기 때문에, 상위 스코프에대한 정보가 실행 컨텍스트에서 팝 되더라도, 참조가 유효하게 남아있는 것 이다. 그리고 그런 내부 객체에 inner함수가 외부의 `innerFunc()`에 의해서 참조되고 있기 때문에 가비지 컬렉션으로 빠지지 않아, `[[Environment]]`참조에 의해서 저장된 참조값이 할당된다.

---

자바 스크립트에서 실행되는 모든 중첩 함수는 엄밀히 따지자면 모두가 상위 스코프를 참조할 수 있기 때문에 클로저다. 하지만 모든 함수가 다 클로저라고 불리지는 않는다.

```js
const x = 1;

function foo() {
  const y = 1;

  function bar() {
    const z = 1;

    console.log(z);
  }

  return bar;
}

const b = foo();
b();
```

이런 경우에 실제로 `bar()`함수 내부에서는 상위 스코프에 대한 참조가 발생하지 않기 때문에 클로저라고 불리지 않는다.

참조 값이 없어서, 실행 컨텍스트에서 팝 될 때, 가비지 컬렉션으로 이동하기 때문에 접근도 불가능하다.

또 한

```js
js;
const x = 1;

function foo() {
  const y = 1;

  function bar() {
    const z = 1;

    console.log(z);
  }

  return bar;
}

foo();
```

내부의 참조가 발생했더라도 외부의 참조가 발생하지 않아, 상위 스코프의 생명주기보다 짧은 생명주기를 가지는 함수의 경우에는 클로저라 부르지 않는다.

즉,

> 클로저는 중첩 함수가 상위 스코프의 식별자를 참조하고 있고 중첩 함수가 외부 함수보다 더 오래 유지되는 경우에 한정하는 것이 일반적이다.

## 클로저의 활용

상태를 안전하게 유지하고 변경하기 위해서 사용된다.

- 상태를 안전하게 은닉하고
- 특정 함수를 통해서만 상태가 업데이트 될 수 있도록 만들 수 있다.

예시를 들어서 생각해보자

```js
let num = 0;

const increase = function () {
  return ++num;
};

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```

위 코드는 다음과 같은 문제가 발생할 수 있습니다.

- `increase()`가 호출되기 전에 값이 변경될 우려가 있음
- 즉, `num`변수에 접근이 가능

```js
const increase = (function () {
  let num = 0;

  return function () {
    return ++num;
  };
})();

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```

이렇게 사용하면 상태가 은닉되면서, `increase()`를 통해서만 값을 변경할 수 있다.

감소 로직도 추가해 보자

```js

const counter = (function() {
    let num = 0;

    return {
        increase() {
            return ++num;
        }
        decrease() {
            return --num;
        }
    }
}());

console.log(increase()); // 1
console.log(increase()); // 2

console.log(decrease()); // 1
console.log(decrease()); // 0
```

- 함수를 반환하는 고차함수를 클로저로 구현

```js
const counter = (function () {
  let counter = 0;

  return function (predicate) {
    counter = predicate(counter);
    return counter;
  };
})();

function increase(n) {
  return ++n;
}

function decrease(n) {
  return --n;
}

console.log(counter(increase)); // 1
console.log(counter(increase)); // 2

console.log(counter(decrease)); // 1
console.log(counter(decrease)); // 0
```

## 캡슐화 은닉화

지금이야 class를 통해서 private와 public같은 값의 상태를 표현할 수 있게 되었지만, 예전에는 그렇지 못했는데, 이 때. 클로저를 활용하면 정보의 은닉화가 가능했다.

```js
function Person(name, age) {
  this.name = name;
  let _age = age;

  this.sayHi = function () {
    console.log(`Hello ${this.name}, age: ${_age}`);
  };
}

const me = new Person('Lee', 20);
me.sayHi(); // Hi! My name is Lee. I am 20.
console.log(me.name); // Lee
console.log(me._age); // undefined
const you = new Person('Kim', 30);
you.sayHi(); // Hi! My name is Kim. I am 30.
console.log(you.name); // Kim
console.log(you._age); // undefined
```
