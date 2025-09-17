# 12장 함수

## 12.1 함수란?

- 함수는 자바스크립트에서 가장 중요한 핵심 개념
- 또 다른 자바스크립트의 핵심 개념인 스코프, 실행 컨텍스트, 클로저, 생성자 함수에 의한 객체 생성, 메서드, this, 프로토타입, 모듈화 등이 함수와 깊은 관련이 있다.

> 함수의 입출력 개념, 상자 형태, 함수의 형태 등은 지나감

## 12.2 함수를 사용하는 이유

> 코드의 재사용, 편의상, 가독성 내용

## 12.3 함수 리터럴

- 자바스크립트의 함수는 객체 타입의 값

```js
var f = function add(x, y) {
  return x + y;
};
```

- 함수 리터럴의 구성요소

<img width="547" height="302" alt="image" src="https://github.com/user-attachments/assets/ca98309f-107c-4eb5-aa77-4733e3eb15ce" />

- 리터럴은 값을 생성하기 위한 표기법이다. 따라서 함수 리터럴도 평가되어 값을 생성하며, 이 값은 객체다. 즉 함수는 객체다.

- 함수 객체와 일반객체의 차이점은 함수는 호출할 수 있다. 또한 고유 프로퍼티를 갖는다.

## 12.4 함수 정의

<img width="557" height="228" alt="image" src="https://github.com/user-attachments/assets/0efdfd94-af3b-4cb2-859c-b5b67c61bebf" />

- 함수를 정의 한다는 면에서 동일하지만 중요한 차이가 있다.

### 12.4.1 함수 선언문

- 함수 선언문은 함수 리터럴과 형태가 동일하지만, 이름을 생략할 수 없다.

- 함수 선언문은 표현식이 아니다. 문 이다.

- 문은 변수에 할당 할 수 없다.

```js
// 기명 함수 리터럴을 단독으로 사용하면 함수 선언문으로 해석된다
// 함수 선언문에서는 함수 이름을 생략할 수 없다.
function foo() { console.log(’foo’); }

foo(); // foo
```

```js
// 함수 리터럴을 피연산자로 사용하면 함수 선언문이 아니라 함수 리터럴 표현식으로 해석된다
// 함수 리터럴에서는 함수 이름을 생략할 수 있다.
(function bar() { console.log( bar ); });

bar(); // ReferenceError: bar is not defined
```

```js
// 추가
let foo = function bar(){ }

foo()
bar() // ReferenceError: bar is not defined
```

<img width="460" height="298" alt="image" src="https://github.com/user-attachments/assets/78b273c3-3ae0-463b-81a7-2e322448045f" />

- 함수 선언문이 변수에 할당되는것 처럼 보이지만. 실제로는 js엔진이 문맥을 보고 선언문이 아닌, 표현식으로 해석하기 때문이다.

- 따라서 이름이 있는 기명함수 리터럴은 선언문으로 해석될 가능성이 있다.

- {} 도 선언문의 블록문일 수도, 객체 리터럴일 수도 있다. 중의적표현이다.


- 함수 이름은 함수 몸체 내에서만 참조할 수 있는 식별자다.

- 예제의 foo는 자바스크립트 엔진이 암묵적으로 생성한 식별자다.

- 함수는 함수 이름으로 호출하지 않는다. 함수 객체를 가리키는 식별자로 호출한다.

<img width="423" height="164" alt="image" src="https://github.com/user-attachments/assets/2d264db5-dda2-4fcd-a133-290cde26b01e" />


### 12.4.2 함수 표현식

- 자바스크립트의 함수는 일급 객체다.

- 함수 리터럴로 생성한 함수 객체를 변수에 할당하는것을 함수 표현식 이라고 한다.

<img width="407" height="217" alt="image" src="https://github.com/user-attachments/assets/f20a7f62-d703-405f-abd5-54ee8dcee268" />


- 함수 선언문은 “표현식이 아닌 문”이고 함수 표현식은 “표현식인 문”이다. 따라서 미묘하지만 중요한 차이가 있다.

### 12.4.3 함수 생성 시점과 함수 호이스팅

<img width="368" height="119" alt="image" src="https://github.com/user-attachments/assets/726b6f8d-e42b-419c-83a0-d7ba3906b9b9" />

<img width="365" height="137" alt="image" src="https://github.com/user-attachments/assets/a2665684-4944-4914-8980-dffa6255a19c" />

- 함수 선언문으로 정의한 함수와 함수 표현식으로 정의한 함수의 생성 시점이 다르다.

> 함수 선언문은 런타임 이전에 함수명을 보고 동일한 식별자를 암묵적으로 생성. 함수 객체로 초기화 됨.

> 함수 리터럴은 변수키워드로 선언된 변수는 다른 초기화 (var 기준 undefined)가 되고, 런타임에 할당문이 실행되며 함수 객체가 된다.

- 함수 표현식으로 함수를 정의하면 함수 호이스팅이 발생하는 것이 아니라 변수 호이스팅이 발생한다.
- 

<img width="504" height="297" alt="image" src="https://github.com/user-attachments/assets/0b4acc6f-a401-4048-9c01-ff03263ec325" />

- 함수 호이스팅은 함수 호출전 함수를 선언한다는 규칙을 무시하기에, 함수 선언문 대신 함수 표현식을 사용할것을 권장한다.

### 12.4.4 Function 생성자 함수

<img width="559" height="87" alt="image" src="https://github.com/user-attachments/assets/4bc45e54-0edb-414c-beff-cf349e0ac433" />


<img width="331" height="83" alt="image" src="https://github.com/user-attachments/assets/39fd3a17-593c-41b0-a2e8-27201d802609" />


- Function 생성자 함수로 함수를 생성하는 방식은 일반적이지 않으며 바람직하지도 않다. Function 생성자 함수로 생성한 함수는 클로저closure를 생성하지 않는 등, 함수 선언문이나 함수 표현식으로 생성한 함수와 다르게 동작한다.

### 12.4.5 화살표 함수

<img width="282" height="93" alt="image" src="https://github.com/user-attachments/assets/54c616e0-8446-4199-8e3d-ff9e25bf935a" />


- 화살표 함수는 기존 함수 선언문, 함수 표현식을 완전히 대체하기 위해 디자인된 것은 아니다. 표현만 간략한 것이 아니라. 내부 동작 또한 간략화 되어 있다.

> 자세한 내용은 26.3절 화살표 함수에서.

## 12.5 함수 호출

### 12.5.1 매개변수와 인수

- 매개변수도 일반 변수와 마찬가지로 undefined로 초기화된 후 인수가 순서대로 할당 된다.

<img width="255" height="178" alt="image" src="https://github.com/user-attachments/assets/bf009478-6dea-4a86-ad51-e7bb6fae5e3b" />


- 함수는 매개변수의 개수와 인수의 개수가 일치하는지 체크하지 않는다. 같은 개수 만큼 전달하지 않아도 에러가 발생하지 않는다. 할당되지 않은 매개변수 값은 undefined 이다.

<img width="203" height="112" alt="image" src="https://github.com/user-attachments/assets/c24b4371-ebba-47ba-85be-1d1b0957537b" />


- 초과된 인수는 무시된다. 하지만 버려지는것은 아니고 모든 인수는 암묵적으로 arguments 객체의 프로퍼티로 보관된다.

<img width="427" height="175" alt="image" src="https://github.com/user-attachments/assets/3c731e27-4f6c-4bdf-a326-8abdbf426206" />


### 12.5.2 인수 확인

> 자바스크립트에서 의도하지 않은 실행을 막기위해 매개변수 타입을 확인하고, 적절한 인자수가 들어왔는지 체크하라는 내용

- 단축평가나 매개변수 기본값을 사용하면 체크 및 초기화를 간소화할 수 있다.

<img width="244" height="203" alt="image" src="https://github.com/user-attachments/assets/b10219d5-6dbe-41c7-8c78-963d0ccdd580" />
<img width="241" height="142" alt="image" src="https://github.com/user-attachments/assets/0515d964-1d0a-47ca-a6ed-a418719fdc37" />


### 12.5.3 매개변수의 최대 개수

- 이상적인 함수는 한가지 일만 해야하며, 가급적 작게 만들자.

- 객체를 인수로 쓸때는 순서를 신경쓰지 않아도 되지만, 부수효과(side effect)를 조심하자.

### 12.5.4 반환문

- return 키워드 뒤에 오는 표현식을 평가해 반환한다.

- return 키워드 뒤에 반환값으로 사용할 표현식을 명시적으로 지정하지 않으면 undefined가 반환된다.

- 반환문은 함수 몸체에서만 사용할 수 있지만 node.js는 모듈 시스템으로 인해 파일별로 독립적인 파일 스코프를 가지기 때문에 파일 가장 바깥 영역에 반환문을 사용해도 에러가 발생하지 않는다.

## 12.6 참조에 의한 전달과 외부 상태의 변경

> 매개변수의 call by value, call by reference 구별 내용

- 사이드 이팩트 문제를 없애기 위해 옵저버 패턴을 사용하거나, 불변 객체로 만들어 사용하자.

- 외부 상태를 변경하지 않고, 외부 상태에 의존하지 않는 함수를 순수함수라 한다. 이를 통해 오류를 피하고 안전성을 높이는 프로그래밍을 함수형 프로그래밍이라 한다.

## 12.7 다양한 함수의 형태

### 12.7.1 즉시 실행 함수

- 함수 정의와 동시에 즉시 호출되는 함수

<img width="141" height="114" alt="image" src="https://github.com/user-attachments/assets/1e1536f7-4aaf-46f7-9a9f-9d76ee635076" />


- 익명함수를 사용하는게 일반적이지만 가명도 즉시 실행할 수 있다.

- ()그룹 연산자로 감싸는 등, js엔진에 리터럴로서 인식시키는것이 중요.

<img width="217" height="290" alt="image" src="https://github.com/user-attachments/assets/da8841d2-f96d-4203-a391-e64a6877122b" />


### 12.7.2 재귀 함수

> 재귀 함수 설명

- 함수 내부에서는 함수 이름 또는 함수를 가리키는 식별자를 사용해 자신을 호출할 수 있다. 단 함수 외부에서는 반드시 식별자로 호출해야 한다.

> 탈출 조건 설명

### 12.7.3 중첩 함수

### 12.7.4 콜백 함수

- 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수를 콜백 함수(callback function)라고 하며, 매개변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수를 고차 함수(Hher-Order Function, HOF)라고 한다.

- 고차 함수는 콜백 함수를 자신의 일부분으로 합성한다.

- 고차 함수는 필요에 따라 콜백 함수에 인수를 전달할 수 있다.

### 12.7.5 순수 함수와 비순수 함수
