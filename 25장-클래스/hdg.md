# 25장 클래스

## 25.1 클래스는 프로토타입의 문법적 설탕인가?

- 앞서 우리가 공부하듯 js는 프로토타입 기반 객체지향 언어다. 논쟁이 있지만 js는 객체지향 프로그래밍 능력이 있다

- 다음은 ES5의 클래스 없이 생성자 함수와 상속을 구현하는 예제

<img width="614" height="385" alt="image" src="https://github.com/user-attachments/assets/f4dc6850-364c-4c9c-a19e-e3aea08d7ff0" />


- 하지만 기존 클래스 기반에 익숙한 프로그래머들을 위해 ES6에서 클래스가 도입되어, 클래스 기반 oop와 흡사한 객체 생성 매커니즘이 제시되었다

- 이건 기존의 프로토타입 기반 oop 모델을 폐지한게 아니라 프로토타입 기반 패턴을 클래스 기반 처럼 사용할 수 있도록 보이게 한다.

- 클래스는 생성자 함수보다 엄격하며 생성자 함수에서 제공하지 않는 기능도 제공한다. 차이가 있다.

<img width="1256" height="484" alt="image" src="https://github.com/user-attachments/assets/3c0a8f5a-bbe7-452f-b8c7-fa16986c437a" />


- 정리하면 new꼭 쓰기, extends 와 super 제공, 호이스팅 없는것 처럼 동작, 암묵적 strict mode, 그리고 constructor, 프로토타입메서드, 정적메서드가 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false. 즉 열거되지 않는다.

- 클래스는 실제 프로토타입 기반 이지만 새로운 객체 생성 매커니즘으로 봐야한다.

## 25.2 클래스 정의

- 클래스는 class 키워드로 정의, 파스칼이 일반적이다.

<img width="1246" height="176" alt="image" src="https://github.com/user-attachments/assets/9b697299-dec7-4e53-a524-b84015add6e5" />


- 일반적이지 않지만, 표현식으로 정의할 수 있다. 익명 또는 기명 표현식이 가능하다.

- 클래스가 값으로 쓸 수 있는 일급 객체다.

<img width="1244" height="254" alt="image" src="https://github.com/user-attachments/assets/ca8fe0d1-c558-44d5-ac26-9357df512bf3" />


- 일급 객체로서 특징으로 클래스는 런타임에 생성 가능하고, 변수등에 저장 할 수 있으며, 함수의 매개변수, 반환값으로 클래스를 보낼 수 있다.

- 더 자세히 보면 클래스는 함수다. 이는 차차 알아본다.

<img width="1270" height="268" alt="image" src="https://github.com/user-attachments/assets/1034d5cc-6691-40bc-a37e-b859fbb3b552" />


- 클래스 몸체에는 constructor(생성자), 프로토타입 메서드, 정적 메서드 세가지를 정의할 수 있다.

```js
class Person {
  // 1. 생성자
  constructor（name） { // 인스턴스 생성 및 초기화
    this.name = name; // name 프로퍼티는 public하다
  }

  // 2. 프로토타입 메서드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }

  // 3. 정적 메서드
  static sayHello() {
    console.log();
  }
}

```

- 생성자 함수와 정의방식을 비교해보면 아래와 같다. 클래스와 생성자 함수 방식이 형태적으로 유사함을 알 수 있다.

<img width="638" height="381" alt="image" src="https://github.com/user-attachments/assets/5ced5adb-8deb-4c0f-9eb8-08a08ad151e7" />


## 25.3 클래스 호이스팅

- 클래스는 js에서 함수로 평가 된다.

- 클래스 선언문은 함수 선언문처럼 런타임 전에 평가되어 함수 객체를 생성한다. 이때 클래스가 평가되어 생성된 함수객체는 constructor 생성자 함수의 객체다.

- 프로토 타입도 함수 객체가 생성될때 같이 생성된다.

- 클래스는 함수로 평가 되지만 정의 이전에 참조할 수 없다. 이는 마치 호이스팅이 발생하지 않는것 처럼 보이나 그렇진 않고 let, const 키워드로 선언한 변수 처럼 호이스팅 된다.

<img width="616" height="182" alt="image" src="https://github.com/user-attachments/assets/dbc6d5a2-c335-43b0-95e6-c06730c65b46" />
<img width="611" height="53" alt="image" src="https://github.com/user-attachments/assets/1a960b1b-0044-41af-8183-5a59a0729a72" />


- 클래스 선언문 이전에 일시적 사각지대(TDZ)빠지기 때문에 호이스팅이 발생하지 않는것 처럼 동작한다.

- var, let, const, function, function\*, class 키워드를 사용해 선언된 모든 식별자는 런타임 전에 실행되기 때문에 호이스팅된다.

## 25.4 인스턴스 생성

- 클래스는 생성자 함수이며 new 연산자와 함께 사용되어 인스턴스를 생성한다.

- 함수는 new 연산자를 안쓰면 일반함수로 호출되지만 클래스는 인스턴스를 만들기 위해서 쓰기 때문에 반드시 new와 함께 호출 해야한다.

- 클래스를 아래 예제처럼 기명 표현식으로 정의했다면, 클래스를 가리키는 식별자 Person이 아니라 클래스이름 MyClass를 사용해 인스턴스를 만들면 에러가 난다.

```js
const Person = class MyClass {};

const me = new Person();
const you = new MyClass(); // ReferenceError : MyClass is not defined
```

- 이건 기명함수 표현식과 같은 이유로 외부코드 에서 접근 불가능 하기 때문

## 25.5 메서드

- 위에서 말한것 처럼 클래스 몸체에는 3가지 형식의 메서드만 선언할 수 있었다.

- ES11/ECMAScript 2020에 따르면 프로퍼티는 반드시 constructor 내부에 정의해야 했지만 이제는 클래스 내부에 직접 정의할 수 있는 표준이 제안되었다.

### 25.5.1 constructor

- constructor는 인스턴스를 생성하고 초기화 하기 위한 특수 메서드. 이름 변경이 불가능하다.

<img width="1238" height="362" alt="image" src="https://github.com/user-attachments/assets/16bc4bea-7074-4ae2-bf97-76289536ca3b" />


- 크롬 브라우저에서 클래스를 확인하는 아래 예제를 보면

<img width="1208" height="682" alt="image" src="https://github.com/user-attachments/assets/d9f17e43-b50e-4fe8-83a9-e2addd4959a3" />


- 클래스는 함수 객체로 평가되는걸 알 수 있다. 그래서 함수 객체 고유 프로퍼티가 모두 있다.

- 모든 함수객체들이 가지고 있는 prototype 프로토티입객체의 constructor 프로퍼티가 클래스를 가리킨다. (이때 constructor는 클래스 메서드말고 프로토타입객체의 생성자를 가리키는 프로퍼티를 말함)

- 즉 클래스는 인스턴스를 생성하는 생성자 함수다.

> 인스턴스 로그확인은 지나감. 너무 당연한 이야기들 같음

- 흥미로운 점은 constructor 메서드가 어디서도 보이지 않는다.

- constructor는 메서드로 해석되는것이 아니라 클래스가 평가되어 생성된 함수 객체 코드의 일부가 된다.

<img width="651" height="107" alt="image" src="https://github.com/user-attachments/assets/afa5ba43-23fd-45e3-b0cc-be754ab288e1" />


- constructor 메서드의 특징.

1. 클래스에 한개만 존재할 수 있다.

2. 생략할 수 있으나 생략하면 암묵적 constructor가 정의된다. // {}비어있음

3. this로 프로퍼티를 추가하고, 초기값은 constructor 매개변수로 받는다.

4. constroctor는 반환문을 갖지 않아야한다. -> 17장 생성자 함수와 같은 이유로 암묵적으로 this를 반환하기 때문임

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}
```

### 25.5.2 프로토타입 메서드

- 생성자 함수로 인스턴스를 생성할때는 프로토 타입 메서드를 위해 prototype 프로퍼티에 메서드를 추가한다.

<img width="624" height="439" alt="image" src="https://github.com/user-attachments/assets/dbec94cb-7263-49e0-ab24-6d3437ada2c8" />


- 클래스는 기본적으로 프로토타입 메서드가 된다.

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHi() {}
}
```

- 당연히 클래스가 생성한 인스턴스도 프로토타입 체인 일원이 된다.

- 인스턴스는 프로토타입 메서드를 상속받아 사용할 수 있다. 클래스는 생성자 함수와 마찬가지로 프로토타입 기반의 객체 생성 메커니즘이다.

<img width="601" height="299" alt="image" src="https://github.com/user-attachments/assets/4421b91c-7cbe-485a-9d62-af650fc17497" />


### 25.5.3 정적 메서드

- 생성자 함수의 경우 정적메서드를 생성하기 위해 아래처럼 추가해야한다.

```js
function Person(name) {
  this.name = name;
}

Person.sayHi = function () {
  console.log("hi");
};

Person.sayHi();
```

- 클래스에서는 static을 붙이면 정적 메서드가 된다.

- 정적메서드는 클래스에 바인딩된 메서드가 된다. 프로토타입 상속이 아닌 함수객체에 직접 소유된 함수다.

- 정적메서드를 인스턴스로 호출할 수 없다. 프로토타입 체인에 없으니 상속받는 메서드가 아님.

### 25.5.4 정적 메서드와 프로토타입 메서드의 차이

> 좀 있지만 스킵해도 될 만한 내용

### 25.5.5 클래스에서 정의한 메서드의 특징

1. function 키워드를 생략한 축약 표현을 쓴다.

2. 함수들을 , 콤마로 나누지 않는다.

3. 암묵적 strict mode 실행된다.

4. for ... in 문 이나 Object.keys 메서드로 열거할 수 없다. (메서드를) 즉 [[Enumeralble]] 값이 false다.

5. 내부메서드 [[Construct]]를 가지지 않는 non-constructor다(생성자 함수로 쓸수 없다는 뜻) new와 함께 호출할 수 없다.

## 25.6 클래스의 인스턴스 생성 과정

> 이것도 17장 생성자 함수에서 인스턴스 생성되던 방식과 같아서 스킵

## 25.7 프로퍼티

### 25.7.1 인스턴스 프로퍼티

- 인스턴스 프로퍼티는 constructor 내부에서 정의해야한다.

- 17장 생성자 함수의 인스턴스 생성 과정과 마찬가지로 내부코드 실행전 this가 빈 객체에 바인딩 되어있다. 그리고 this에 인스턴스 프로퍼티를 추가한다.(초기화)

- 접근제어자(public, private 등)을 제공하지 않기 때문에 항상 public하지만 private 프로퍼티를 정의할 수 있는 사양이 지금은 있다. #

### 25.7.2 접근자 프로퍼티

> 일단 지나감

### 25.7.3 클래스 필드 정의 제안

- 클래스 필드는 클래스 기반 객체지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티를 가리키는 용어다.

> 우리가 c++에서 맴버변수, 자바에서 필드, ts에서 프로퍼티라고 부르는 그것.

- 이전에는 메서드만 클래스 몸체에 추가 할 수 있었지만 지금은 클래스 필드도 정의 할 수 있다.

- 초기값을 넣을 수 있지만, 넣지 않으면 undefined를 갖는다.

<img width="625" height="185" alt="image" src="https://github.com/user-attachments/assets/677510a5-24f7-4aaa-b7ac-faaad98ffb16" />


- 클래스 필드에 함수를 할당 할 수 있다. 하지만 이 함수는 프로토타입 메서드가 아닌 인스턴스 메서드가 된다. 모든 클래스 필드는 인스턴스 프로퍼티가 되기 때문이다.

- 따라서 권장되지 않는다.

<img width="1260" height="638" alt="image" src="https://github.com/user-attachments/assets/fcb9b45d-d959-419c-a0e1-fa146b20aaff" />


### 25.7.4 private 필드 정의 제안

- js는 접근제어자를 지원하지 않기 때문에 인스턴스 프로퍼티는 항상 public 이었다. 캡슐화가 아쉬움.

- 지금은 새 표준사양이 제안되어 private 필드를 정의할 수 있다.

- 필드 선두에 #을 붙인다. 클래스 몸체에서 클래스 필드에 붙여야 한다. constructor 내부에서만 붙일 수는 없다.

<img width="594" height="331" alt="image" src="https://github.com/user-attachments/assets/e84ccc60-b12a-4b38-b80e-72c8ad7c31e8" />


- 물론 ts는 접근제어자를 제공한다.

- 이를 통해 클래스 외부에서 private 필드에 접근할 수 없지만, 접근자 프로퍼티를 통해 간접적으로 접근하는 방식은 유효하다.

<img width="648" height="597" alt="image" src="https://github.com/user-attachments/assets/a837fb11-f6f3-4cde-a515-b20f9c86d786" />


### 25.7.5 static 필드 정의 제안

- 정적 메서드에서 본것 처럼 static 키워드를 사용해 정적 필드를 정의 할 수 있다. #도 가능

## 25.8 상속에 의한 클래스 확장

### 25.8.1 클래스 상속과 생성자 함수 상속

- 우리가 지금까지 다루던 프로토타입 기반 (인스턴스)상속이 아닌, 기존 클래스를 상속받아 새로운 클래스를 확장(extends)하여 정의하는 내용.

> 기존 c++, 자바등에서 사용하는 상속 이야기.

<img width="479" height="387" alt="image" src="https://github.com/user-attachments/assets/8d2c4380-02ef-44b0-95a8-2d7367142f68" />


- 클래스는 생성자 함수와 달리 클래스 자체가 상속을 통해 확장할 수 있는 문법 extends 키워드가 제공된다.

<img width="628" height="649" alt="image" src="https://github.com/user-attachments/assets/92f1bd1a-78fb-40db-b910-1995181ce5aa" />


- 상속에 의해 확장된 (하위)클래스의 인스턴스의 프로토타입 체인

<img width="538" height="516" alt="image" src="https://github.com/user-attachments/assets/31181877-91f3-4d7d-b300-c1a8391ec8f3" />


> 생성자 함수가 클래스 상속을 따라하는 의사 클래스 상속 패턴은 스킵

### 25.8.2 extends 키워드

> 슈퍼(부모, 베이스)클래스, 서브(자식, 파생)클래스 용어 설명

### 25.8.3 동적 상속

- extends 키워드는 클래스 뿐 아니라 생성자 함수를 상속 받을 수 있다. 단 extends 키워드 앞에는 반드시 클래스가 와야한다.

<img width="643" height="234" alt="image" src="https://github.com/user-attachments/assets/839d51a4-a78d-4df0-8c4c-f462b5a70220" />


- extends 키워드 다음에 [[Construct]] 내부메서드를 갖는 함수객체로 평가될 수 있는 모든 표현식을 넣을 수 있다.

- 이는 동적으로(런타임에) 상속받을 대상을 결정할 수 있다는 의미다.

<img width="1278" height="592" alt="image" src="https://github.com/user-attachments/assets/4fa061e6-d981-4db0-a095-822b635041e7" />


> 이건 좀... 신기한데 쓰나?

### 25.8.4 상속 클래스의 인스턴스 생성 과정

- 앞서 말했 듯 constructor 메서드를 생략하면 비어있는 constructor 가 암묵적으로 정의 된다.

- 서브 클래스가 constructor를 생각하면 아래와 같은 constructor가 정의 된다.

<img width="620" height="64" alt="image" src="https://github.com/user-attachments/assets/aee1ed76-ecf6-46e1-b02e-3a18cec87026" />


- super() 는 수퍼클래스의 constructor를 호출하여 인스턴스를 생성한다.

<img width="621" height="438" alt="image" src="https://github.com/user-attachments/assets/6d78a0aa-1fa4-4dda-bf46-1a3c07c68c5c" />


### 25.8.5 super 키워드

- super는 함수처럼 호출할 수도 있고 this와 같이 식별자 처럼 참조할 수도 있는 특수한 키워드다.

1. super를 호출하면 수퍼클래스를 호출한다.

2. super를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.

#### super 호출

<img width="636" height="379" alt="image" src="https://github.com/user-attachments/assets/f7e2116b-7b41-4f16-b4ec-0e717ff79ea8" />


- 위 와 같이 서브클래스를 호출하면서 수퍼클래스의 constructor에 전달할 필요가 있는 인수를 super를 통해 전달한다.

- 이때 주의할 사항은 다음과 같다.

1. 서브클래스에서 constructor를 썼다면 반드시 super를 호출해야한다.

2. 서브클래스의 constructor는 super 호출전 this를 참조할 수 없다.

3. super의 호출은 반드시 서브클래스의 constructor 에서만 호출한다. 나머지는 에러

#### super 참조

- 메서드 내에서 super를 참조하면 수퍼클래스의 메서드를 호출 할 수 있다.

1. 서브클래스 프로토타입메서드 안의 `super.메서드`는 수퍼클래스 프로토타입메서드를 가리킨다.

<img width="596" height="613" alt="image" src="https://github.com/user-attachments/assets/e0016e56-70cc-46ed-883b-a68d92170a60" />


- 이는 아래와 동일하게 작동한다.

<img width="602" height="377" alt="image" src="https://github.com/user-attachments/assets/2f8182a2-1af7-4f27-80b9-159bce1c4f16" />


- super는 자신을 참조하고 있는 메서드(sayHi)가 바인딩되어있는 객체(Derived.prototype) 의 프로토타입을 가리킨다.(Base.prototpye)

- 따라서 super.sayHi 는 Base.prototype.sayHi 를 가리킨다.

2. 서브클래스 정적메서드의 `super.정적메서드`도 수퍼클래스의 정적메서드를 가리킨다.

> 예제 25

> 상속 클래스의 인스턴스 생성 과정은 스킵했음

> 표준 빌트인 생성자 함수 확장도 스킵했음. 내용은 3절의 extends 키워드에서 [[Construct]] 내부메서드를 가지는 표현식메서드면 모두 상속 받을 수 있으니 표준 빌트인 객체 예를들어 Array 등도 상속받아 확장시킬 수 있다는 내용.
