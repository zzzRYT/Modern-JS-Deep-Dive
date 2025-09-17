# 20장 strict-mode

## 20.1 strict-mode란?

```ts
function foo() {
x = 10;
}
20
strict mode
foo();
console.log(x); // ?
```

`foo` 함수에서 선언하지 않은 변수 `x`에 할당했다.
js 엔진은 스코프 체인을 통해 `x`를 찾는데 없으면 `ReferenceError`를 일으킬 것 같지만 암묵적으로 전역 객체에 `x`를 등록한다

이러한 현상을 **암묵적 전역** 이라고 한다.

이는 버그의 원인이 될 확률이 높음 따라서 `var`, `let`, `const` 키워드를 사용해 변수를 선언하는게 좋다.

하지만 이런걸 못하게 하는 환경에서 개발하는게 더 좋은데 그걸 해주는게 ES5부터
` strict mode`가 추가됨

`ESlint`같은 도구도 같은 효과

## 20.2 Strict Mode 사용법

전역의 선두 또는 함수 몸에다가 `'use strict';`를 추가한다.

### 예제 1 전역에 스트릭 모드

```ts
'use strict';
function foo() {
  x = 10; // ReferenceError: x is not defined
}
foo();
```

### 예제 2 함수 몸체에 스트릭 모드

```ts
function foo() {
  'use strict';
}
x = 10; // ReferenceError: x is not defined
foo();
```

## 예제 3 반드시 코드 선두에 사용할것

```ts
function foo() {
  x = 10; // 에러를 발생시키지 않는다.
  ('use strict');
}
foo();
```

## 20.3 전역 strict mode는 피하자

```ts
<!DOCTYPE htm>
<html>
<body>


<script>
'use strict';
</script>

<script>
x = 1; // 에러가 발생하지 않는다.
console.log(x); // 1
</script>

<script>
'use strict';
y = 1; // ReferenceError: y is not defined
console.log(y);
</script>

</body>
</html>

```

이런식으로 스크립트 단위로 적용되는데

스크립트 내부에서 외부 서드파티 라이브러리를 사용하는 경우 라이브러리가 `non-strict mode` 인 경우도 있기 때문에 전역
에 `strict mode`를 적용하는 것은 바람직하지 않다.

```ts
// 즉시 실행 함수의 선두에 strict mode 적용
(function () {
  'use strict';
  // Do something...
})();
```

이런식으로 즉시실행함수 내부에 `strict mode`를 적용하고 코드를 해당 함수 내부에 작성

## 20.4 함수 단위 `strict mode`도 피하자

위 예제처럼 함수 내부에서 `strict mode`를 적용 가능한데
이는 바람직하지 못하다.

함수마다 `strict mode`를 써주는건 번거로운 일이고

외부 컨텍스트에 `strict mode`를 하지 않을 경우 문제가 발생할 수 있다.

따라서 위 예제처럼 즉시실행함수에 `strict mode`를 적용하는게 베스트

## 20.5 스트릭모드가 발생시키는 에러

암묵적 전역

```ts
(function () {
  'use strict';
  x = 1;
  console.log(x); // ReferenceError: x is not defined
})();
```

`delete` 연산자로 변수, 함수, 매개변수를 삭제 시 에러

아마 다 객체라서 원래는 가능한듯???

```ts
(function () {
  'use strict';
  var x = 1;
  delete x; // SyntaxError: Delete of an unqualified identifier in strict mode.
  function foo(a) {}
  delete a; // SyntaxError: Delete of an unqualified identifier in strict mode.
  delete foo; // SyntaxError: Delete of an unqualified identifier in strict mode.
});
```

매개변수 이름 중복

```ts
(function () {
'use strict';
//SyntaxError: Duplicate parameter name not allowed in this context
}
function foo(x, x) {
return x + x;
console.log(foo(1, 2));
}());

```

with 문 사용

```ts
(function () {
  'use strict';
  // SyntaxError: Strict mode code may not include a with statement
  with ({ x: 1 }) {
    console.log(x);
  }
})();
```

## 20.6 strict mode 적용에 의한 변화

`strict mode`에서 함수를 일반 함수로 호출하면 `this`에 `undefined`가 바인딩된다.

생성자 함수가 아니면 굳이 `this`를 쓸필요 없기 때문

```ts
(function () {
  'use strict';
  function foo() {
    console.log(this); // undefined
  }
  foo();
  function Foo() {
    console.log(this); // Foo
  }
  new Foo();
})();
```

## 20.6 arguments 객체

`strict mode`에서는 매개변수에 전달된 인수를 재할당하여 변경해도 `arguments`객체에 반영되지 않는다.

```ts
(function (a) {
  'use strict';
  // 매개변수에 전달된 인수를 재할당하여 변경
  a = 2;
  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1 }
})(1);
```

사실 책쓰신분도 `strict mode`보다 `ESLinst`같은 정적분석도구를 선호한다고 합니다
`ESLint` + `TypeScript`같이 사용하면 굳이 필요가 없긴 할것같아요
