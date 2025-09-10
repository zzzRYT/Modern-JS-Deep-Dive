# 17장 생성자 함수에 의한 객체 생성

- 이번 장에서는 객체리터럴`{}`로 객체를 생성시키는 방식이 아닌, 생성자 함수 `new Person()`로 객체를 생성시키는 방식을 살펴본다.

> 생성자 함수로 객체를 초기화 하는 방법은 클래스를 사용한다면 클래스 내부에 constructor를 작성하는것으로 익숙한 작업인데, 이곳에서는 function 키워드를 사용하는 함수로 객체를 생성하고 그때 this의 상태를 알려주는 이야기 입니다.

## 17.1 Object 생성자함수

- new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성하여 반환한다.

```js
// 빈 객체의 생성
const person = new Object(); // {}
```

- 이곳에 프로퍼티와 메서드를 추가해서 객체를 완성한다.

```js
person.name = "Lee";
person.sayHello = function () {
  console.log("Hi! My name is " + this.name);
};
```

- 생성자 함수란 new 연산자와 함께 호출해서 객체를 생성하는 함수다. 이렇게 생성된 객체를 인스턴스라고 한다.

- String, Number, Boolean, Function, Array, Date, RegExp, Promise 등의 빌트인 생성자 함수

> 예제 17-02

## 17.2 생성자 함수

> 이걸 왜 쓰냐면, 아래와 같은 장단점이 있기 때문에 씁니다.

### 17.2.1 객체 리터럴에 의한 객체 생성 방식의 문제점

- 객체리터럴은`{}` 간단하지만, 하나의 객체만 생성.
- 동일 프로퍼티, 메서드를 가지는 여러개의 객체를 효율적으로 만들기 위해 생성자 함수를 사용함

> 특히 프로퍼티 값(상태)는 객체마다 다를 수 있지만. 메서드들은 정말 다 동일하기 때문에 단일 객체리터럴로 만들면 너무 비효율적이다.

### 17.2.2 생성자 함수에 의한 객체 생성 방식의 장점

- 클래스처럼 동일한 형태의 객체를 간편하게 생성할 수 있다.

> 예제 17-04

> 클래스를 사용하지 않는게 좀 어색한데. 내부 초기화 함수라고 생각하면 이해가 된다.

- 객체지향언어의 생성자 함수와 다르게 형식이 정해진게 아니라, **일반 함수처럼 선언한 후 new와 함께 호출하면 생성자 함수로 동작**한다.

> 예제 17-06
> new를 사용하지 않아도 객체를 생성하는 생성자 함수 방식은 뒤에서 소개한다.

#### this 바인딩

> this 예제

- this는 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수(self-referencing variable)다 this가 가리키는값,즉 this바인딩은 함수 호출 방식에 따라 동적으로 결정된다.

> 예제 17-05

> this를 그냥 놓으면 글로벌 또는 윈도우 전역객체를 가리키고, 생성자 함수에서는 인스턴스를 가리킨다.

> 자세한건 22장에서 이야기 한다.

### 17.2.3 생성자 함수의 인스턴스 생성 과정

- 생성자 함수가 할 일은 (1)인스턴스를 생성하고 (2)초기화 하는것 이다. 1은 필수 2는 옵션이다.

```js
// 생성자 함수
function Circle(radius) {
  // 인스턴스 초기화
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 인스턴스 생성
const circlel = new Circle(5); // 반지름이 5인 Circle 객체를 생성
```

- this를 써서 초기화하는 코드는 보이지만, 객체를 생성하는 코드는 안보이는데 js엔진은 아래의 작업들을 통해 new 연산자와 함께 생성자 함수가 호출되면 암묵적으로 인스턴스를 생성, 반환 한다.

```js
// (생성자 함수로 동작하면) Circle의 리턴값이 인스턴스로 정해져 있다.
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}
```

#### 1.인스턴스 생성과 this 바인딩

1. 암묵적으로 `{}` 빈 객체를 생성
2. this가 이 객체에 바인딩 됨
3. 이 처리들은 함수코드가 실행되는 런타임 전에 실행된다.

> 바인딩 설명 예제

```js
function Circle(radius) {
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인당된다
  console.log(this); // Circle {}

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}
```

#### 2. 인스턴스 초기화

4. 생성자 함수의 코드가 실행되고 this바인딩 된 인스턴스를 초기화한다.

#### 3. 인스턴스 반환

5. 생성자 함수 내부의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.

- 만일 this가 아닌 다른 객체를 명시적으로 리턴하면, 그게 리턴된다.

```js
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };

  return {}; // return문을 직접 작성하면 this가 아니라 해당 객체가 반환됨
}

// 인스턴스 생성
const circlel = new Circle(5); // {}
```

- 객체가 아닌 원시값을 리턴시키면 그 값은 무시 되고 암묵적으로 this 리턴된다.

```js
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };

  return 1; // 무시되고 this 반환됨
}

// 인스턴스 생성
const circlel = new Circle(5); // Circle 인스턴스
```

> 이처럼 생성자 함수에 return 문을 명시적으로 쓰는건 기본동작을 홰손하므로 return문은 반드시 생략해야 한다.

### 17.2.4 내부 메서드 [[Call]]과 [[Construct]]

1. 함수로 선언한건 (함수 선언문, 함수 표현식) 일반적인 함수로서 호출과 (new를 사용한)생성자 함수로서 호출 두 가지를 모두 할 수 있다.

2. 함수는 객체 이므로 일반객체 처럼 내부슬롯, 내부 메서드가 모두 있다.

3. 함수와 일반 객체의 다른점은 함수는 호출할수 있다는 점이다.

- 결과적으로 함수가 일반객체와 다르게 함수로서 동작하기 위한 내부슬롯과 내부 메서드가 있는데, (1)함수를 호출하면 내부 메서드 [[Call]]이 호출되고, (2)new 연산자와 함께 생성자 함수로서 호출하면 내부 메서드 [[Construct]]가 호출된다.

> 【예제 17-14 】

- [[Call]]을 갖는 함수 객체 : callable
- [[Construct]]를 갖는 함수 객체 : constructor
- [[Construct]]를 갖지 않는 함수 객체 : non—constructor

- 함수는 반드시 호출할 수 있어야 하므로 항상 callable이고, 생성자 함수로 동작하는지에 따라 constructor와 non—constructor로 구분된다.

> 그림 17-1

### 17.2.5 constructor와 non-constructor의 구분

- js엔진이 함수 정의 방식을 보고 constructor와 non-constructor 로 구분한다.

- 주의할 것은 ECMAScript 사양에서 메서드로 인정하는 범위가 일반적인 의미의 메서드보다 좁다는 것이다.

> 예제 17-15 】

- 객체 프로퍼티의 값으로 함수를 사용하는걸 메서드로 많이 통칭하는데, ECMAScript에서는 ES6의 메서드 축약 표현
  만을 메서드로 의미한다.

```js
// 메서드 정의: ES6의 ap서드 축약 표현만 메서드로 인정한다.
const obj = {
  x() {}
}；

// 프로퍼티 x의 값으로 할당된 것은 일반 함수로 정의된 함수다. 이는 메서드로 인정하지 않는다
const baz = {
  x: function () {}
}；
```

- 메서드와 화살표함수는 non-constructor 이다. 따라서 생성자 함수로서 호출하면 에러가 발생한다.

- 중요한 점은 생성자 함수로 사용될껄 예상하지 않았는데 [[Construct]] 로서 new연산자를 붙였을때 생성자 함수 처럼 동작하는걸 주의해야 한다.

### 17.2.6 new 연산자

- new연산자를 사용하면 [[Call]]이 호출되는 것이 아니라 [[Construct]]가 호출된다. 단 non—constructor가 아니어야 한다.

- 생성자 함수는 일반적으로 첫 문자를 대문자로 기술하는 파스칼 케이스로 쓰자.

### 17.2.7 new.targe

- new 없이 호출되는걸 방지하기 위해 파스칼 케이스 컨벤션을 써도 항상 실수가 일어나는데, 이를 방지하기 위해 ES6에서는 `new.target` 을 지원한다.

> 참고로 IE는 new.target을 지원하지 않으므로 주의

- **new 연산자와 함께 생성자 함수로서 호출되면 함수 내부의 new.target은 함수 자신을 가리킨다. new 연산자 없이 일반 함수로서 호출된 함수 내부의 new.target은 undefined다.**

> 기본적으로 this와 같은 작업이지만, 전역객체를 가리키는 일 없이, 생성자 함수로서 this의 작업을 위해 쓴다.

```js
function Circle(radius) {
  // 이 함수가 new 연산자와 함께 호출되지 않았다면 new. target은 undefined다
  if (!new.target) {
    return new Circle(radius); // new 연산자와 함께 생성자 함수를 재귀 호출하여 생성된 인스턴스를 반환한다
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수를 호출하여도 new. target을 통해 생성자 함수로서 호출된다.
const circle = Circle(5);
console.l.og(circle.getDiameter());
```

#### 스코프 세이프 생성자 패턴

- new.targe 없었을때는 프로토타입과 instanceof 연산자를 사용해서 스코프 세이프 생성자 패턴을 사용했다.

> 자세한건 19장 프로토타입

```js
function Circle(radius) {
  if (!(this instanceof Circle)) {
    return new Circle(radius);
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수를 호출하여도 생성자 함수로서 호출된다
const circle = Circle(5);
console.log(circle.getDiameter()); // 10
```

- 대부분의 빌트인 함수 (String, Number) new가 있는지 없는지를 체크하는데

1. Object와 Function 등은 new 연산자 없이 호출해도 new 연산자와 함께 호출했을 때와 동일하게 동작
2. String, Number, Boolean 생성자 함수는 new 연산자와 함께 호출했을 때 체를 생성하여 반환하지만 new 연산자 없이 호출하면 문자열, 숫자ㅡ, 불리언 값(원시값들)을 반환한다.
