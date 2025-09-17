# 프로토타입

- 클래스

> 자바스크립트에서의 클래스는 객체다. 프로토타입을 기반으로 인스턴스를 생성하지만, 정확히 동일한 동작을 하진 않는다.

객체 지향 프로그래밍에서 상태state를 나타내는 데이터와 상테 데이터를 조작할 수 있는 동작을 하나의 논리적인 단위로 묶어서 생각

## 상속과 프로토타입

```js
function Circle(radius) {
  this.radius = radius;

  this.getArea = function () {
    return Math.PI * this.radius ** 2;
  };
}

const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(circle1.getArea === circle2.getArea); // false
```

완벽하게 동일한 역할을 수행하는 함수이지만, 호출할 때 마다 매번 다른 메서브를 생성해 성능에 저하가 발생할 수 있습니다.

```js
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(circle1.getArea === circle2.getArea); // true
```

위 처럼 prototype을 사용해서 중복된 메서드를 선언하면, 매 인스턴스를 생성할 때 마다 새롭게 메서드를 만들지 않기 때문에 성능에서 우위를 가져갈 수 있습니다.

이를 `문법적인 설탕`이라고 표현합니다.

## **proto** 접근자 프로퍼티

[[Prototype]] 내부 슬롯에 간접적으로 접근할 수 있도록하는 접근자 프로퍼티 입니다.

**proto**를 사용해서 간접적으로 접근해야 하는 이유는 프로토타입 체인은 단방향 링크드 리스트로 구현되어야 하기 때문이다. 즉, 프로토타입 검색 방향이 한쪽 방향으로만 흘러가야 한다.

서로가 자신의 프로토타입이 되는 비상적인 프로토타입 체인, 순환 참조하는 프로토타입 체인은 만들어지면 안된다. 종점이 정해지지않아 무한 루프에 빠진다

그렇기 때문에 **proto**를 사용해서 프로토타입에 접근하고 교체하도록 구현되어있다.

## **proto** 대신 getPrototypeOf를 사용하자

**proto**를 사용해서 접근하는 방식은 권장하지 않는다. 대신 Object.getPrototypeOf 메서드를 사용하고, 프로토타입을 교체하고 싶은 경우에는 Object.setPrototypeOf 메서드를 사용할 것을 권장한다.

## 함수 객체의 prototype 프로퍼티

함수 객체만이 소유하느ㅏㄴ prototype [[Prototype]]과는 서로 다른 개념

```js
(function () {}).hasOWnProperty('prototype'); // true
({}).hasOwnProperty('prototype'); // false
```

prototype 프로퍼티는 생성자 함수가 생서할 객체(인스턴스)의 프로토타입을 가리킨다.

```js
function Person(name) {
  this.name = name;
}

const me = Person('Lee');

console.log(Person.prototype === me.__proto__); // true
```

그럼 어짜피 같은 property를 참조하는데, 왜 두개로 나눠놓은걸까?

1. 역할이 다름

prototype (함수만 가짐)

- → “앞으로 태어날 객체들의 부모(원형)를 미리 지정하는 설계도”
- → 즉, 생성자 함수가 객체를 만들 때 참조하는 설정용 속성

[[Prototype]] (모든 객체가 가짐)

- → “이미 태어난 객체가 실제로 누구를 부모로 삼고 있는가”를 가리키는 내부 슬롯
- → 즉, 객체 입장에서의 실제 부모 링크

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hi, I'm ${this.name}`);
};

const me = new Person('Kim');
```

만약 하나만 있었다면 이런 문제가 생겨요:

- me 객체도 자기 부모를 알아야 (sayHello 같은 메서드 상속을 받음) → [[Prototype]] 필요

- Person 함수도 “앞으로 만들 객체들이 상속받을 원형”을 지정할 방법이 필요 → prototype 필요

즉,

- 객체 입장: "내 부모는 누구야?" (**proto** / [[Prototype]])

- 함수 입장: "내가 만드는 애들의 부모는 누구여야 하지?" (prototype)

## 리터럴표기와, 생성자 함수

```js
const obj = {};

console.log(obj.constructor === Object); // true
```

obj를 리터럴로 선언했음에도 불구하고, constructor가 Oject생성자 함수와 연결 되어있다. Object 생성자 함수에 인수를 전달하지 않거나, undefined, null로 인수로 전달하면서 호출하면 내부적으로 추상 연산 OrdinaryObjectCreate 를 호출해 Object.prototype을 갖는 빈 객체를 생성한다.

## 프로토타입의 생성 시점

### 사용자 정의 생성자 함수와 프로토타입 생성 시점

생성자 함수로서 호출할 수 잇는 함수 즉 constructor는 함수 정의가 평가되어 함수 객체를 새엇앟는 시점에 프로토타입도 더불어 생성된다.

생성자 함수로서 호출할 수 없는 non-constructor는 프로토타입을 생성하지 않는다.

### 빌트인 생성자 함수와 프로토타입 생성 시점

모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성된다.

- 전역 객체
  > 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 생성되는 특수한 객체 브라우저는 window, node는 global 객체 의미

## 객체 생성 방식과 프로토타입의 결정

- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스 (ES6)

세부적인 객체 생성 방식에는 차이가 있겠지만, 추상 연산 OrdinaryObjectCreate에 의해 생성되는 공통점이 있다.

결국 어떤 형태로 객체를 생성해도 거의 비슷한 형태의 객체와 동일한 구조를 가짐

담만, 생성자 함수에 의해서 생성된 객체는 prototype 프로퍼티에 바인딩되어 이ㅆ는 객체와 생성된 객체 사이에 ㄷ연결고리를 만들어준 역할을 한다. 여기에 새로운 객체를 넣는 등 할 수 있따. (이게 class의 내부 동작)

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`hi, ${this.name}`);
};

const me = new Person('Lee');
const you = new Person('Kim');

me.sayHello();
you.sayHello();
```

위 같은 형태는 연결된 prototype에 연결해서 사요할 수 있는 형태로 객체가 생성된다.

## 프로토타입 체인

자바스크립트가 객체지향 프로그램의 상속을 구현하는 매커니즘

- 상속과 프로퍼티 검색을 위한 매커니즘

스코프 체인과 서로 협력하여 식별자와 프로퍼티를 검색하는데 사용된다.

## 오버라이딩과 프로퍼티 섀도잉

오버라이딩 했고, 그래서 프로토파입 메서드가 가려지는걸 섀도잉이라 부름
