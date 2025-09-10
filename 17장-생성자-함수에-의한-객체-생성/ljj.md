# 17장 생성자 함수에 의한 객체 생성

## 객체 리터럴과, 생성자 객체

객체 리터럴에 의한 객체 생성은 매우 간편하지만, 단 하나의 객체을 만들때만 유용하다.
동일한 프로퍼티를 갖는 객체를 여러개 생성해야 하는 경우 생성자 객체가 적절하다.

```js
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = () => {
    return 2 * this.radius;
  };
}

const c1 = new Circle(5);
const c2 = new Circle(10);

console.log(c1.getDiameter()); // 5
console.log(c2.getDiameter()); // 10
```

## this

this가 가르키는 값에 따라서 동적으로 결정된다.

| 함수 호출방식        | this가 가르키는 값(this바인딩)          |
| -------------------- | --------------------------------------- |
| 일반 함수로서 호출   | 전역 객체                               |
| 메서드로서 호출      | 메서드를 호출한 객체 (마침표 앞의 객체) |
| 생성자 함수로서 호출 | 생성자 함수가 (미래에) 생성할 인스턴스  |

## 인스턴스 생성과 this바인딩

`new`연산자를 사용해서 생성자 함수를 호출하면 자바스크립트 엔지에 의해서 암묵적으로 인스턴스를 생성하고 인스턴스를 초기화한 후 암묵적으로 인스턴스를 반환한다.

> 암묵적으로 `빈 객체`가 생성되고, 해당 `빈 객체`가 생성자 함수가 생성한 인스턴스다. 그리고 암묵적으로 생성된 빈 객체, 인스턴스는 this에 바인딩 된다.

- 바인딩
  > 바인딩이란 식별자와 값을 연결하는 괒어을 의미한다. 예를들어 변수 선언은 변수 이름과 확보된 메모리 공간의 주소를 바인딩하는 것 이다.

this 바인딩은 this와 this가 가리킬 객체를 바인딩 한다.
-> this를 통해서 객체에 접근이 가능하단 소리다.

## 인스턴스 반환

암묵적으로 바인딩된 this를 초기화 한 이후, 암묵적으로 this는 반환이 된다.

하미잔 임의로 return을 객체로 주게 되면, return된 값을 객체로 반환한다.

```js
function Circle(radius) {
  this.radius = radius;
}

const circle = new Circle(1);
console.log(circle); // Circle { radius: 1 }
```

```js
function Circle(radius) {
  this.radius = radius;
  return {};
}

const circle = new Circle(1);
console.log(circle); // {}
```

하지만 원시값을 반환시, 무시된다.

```js
function Circle(radius) {
  this.radius = radius;
  return 100;
}

const circle = new Circle(1);
console.log(circle);
```

## constructor와 non-constructor의 구분

- constructor: 함수 선언문, 함수 표현식, 클래스(클래스도 함수)
- non-constructor: 메서드(ES6 메서드 축약 표현), 화살표 함수

## new 연산자

함수 내부적으로 호출 시, new연산자를 사용하면 [[Construct]]가 호출되고, 그냥 호출하면 [[Call]]ㅎ이 호출된다.

```js
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle1 = Circle(10);

console.log(circle1); // undefined

console.log(radius); // 10;
console.log(getDiameter()); // 20;

console.log(circle1.getDiameter()); // TypeError
```

new 연산자 없이 호출하게 되면, this는 전역 객체인 window를 가르킵니다. 그렇기 때문에 circle1으로 접근시에 없는 객체로 나오기 때문에 에러가 발생합니다.

## new.target

```js
function Circle(radius) {
  if (!new.target) {
    return new Circle(radius);
  }
  this.radius = radius;
}

const circle1 = Circle(5);
console.log(circle1.radius); // 5
```

new 생성자 없이 호출했다 하더라도, new.target속성을 이용해서 내부에서 선언을 했다면, [[Construct]]가 호출됩니다.
