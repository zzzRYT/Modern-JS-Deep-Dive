# 전역 변수의 문제점

## 지역 변수의 생명 주기

```js
function foo() {
    var x = 'local';
    console.log(x);
    return x;
}

foo();
console.log(x); // ReferenceError: x is not defined
```

전역 변수는 런타임 이전 단계에서 자바스크립트 엔진에 의해서 먼저 실행됩니다.
하지만 이 부분은 전역 변수 한정의 이야기 입니다.

-   지역 변수
    > 지역 변수의 생명주기는 함수의 생명 주기와 일치합니다.

즉, 호출될 때 생성되고, return 되면 사라진다는 것 입니다.

### 예외적인 부분

변수의 생명주기는 메모리 공간 확보된 시점부터 메모리 공간이 해제되어 가용메모리 풀에 반환되는 시점까지

만약 누군가 해당 변수를 참조하고 있따면, 메모리 공간이 해제되지 않고 확보된 상태로 남아 있게 됩니다. 스코프 또한 누군가 참조하고 있다면 소멸하지 않고 메모리가 확보된 상태로 남아있게 됩니다.

### 함수 내부 호이스팅

호이스팅은 스코프를 단위로 동작한다.

```js
var x = 'global';

function foo() {
    console.log(x); // undefined
    var x = 'local';
}

foo();
console.log(x); // global
```

위 예시 처럼, 함수가 선언된 시점에서 내부의 x가 자바스크립트 엔진에 의해서 호이스팅 됩니다. 그렇기 때문에 아직 값이 할당되지않은 상태가 됩니다. 때문에 foo내부에서 사용된 console에서는 undefined나 발생합니다.

## 전역 객체

전역 객체는 코드가 실행되기 이전에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체입니다.

브라우저 환경에서 전역 객체는 window이기 때문에 var키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티 입니다.

## 즉시 실행 함수

함수의 정의와 동시에 호출되는 함수

```js
(function () {
    // ...
})();

(() => {
    // ...
})();
```

다양한 소스 파일의 많은 함수와 전역 변수를 포함할 수 있기 때문에, 전역 변수의 수를 제한하는 것이 중요합니다.

코드를 다시 재사용하지 않을 경우 즉시실행 함수를 사용하는것이 , 선언 또는 표현식을 사용하는 것 보다 좋습니다.

## 모듈 패턴

```js
let message = 'global';

(function () {
    let message = 'local';
    console.log(message); // local
})();

console.log(message); // global
```

즉시 실행 함수는 자체 스코프를 만들어, 외부 전역 변수를 오염시키지 않습니다.

```js
const counter = (function () {
    let count = 0;
    return {
        increase: () => ++count,
        decrease: () => --count,
        get: () => count,
    };
})();

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2
console.log(counter.get()); // 2
console.log(counter.decrease()); // 1
```

여기서 counter는 외부에서 집접 접근이 불가능하고, 선언된 메서드로만 조작이 가능, 마치 class의 캡슈화와 유사하게 동작해, 즉시 실행 함수를 통해서 정보 은닉이 가능함.

원래는
즉시 실행 함수(IIFE) 안에서 선언된 변수는 원래라면 함수 실행이 끝나면 사라져야 합니다.

함수 스코프를 벗어나면 GC(가비지 컬렉션)의 대상이 되거든요.

그런데, 내부 함수(메서드)가 그 변수를 참조하고 있다면,
자바스크립트 엔진은 "이 변수는 아직 필요하구나"라고 판단해서 메모리에서 제거하지 않습니다.

이 상태를 클로저라고 부릅니다.
즉, 외부 스코프의 변수에 대한 참조를 내부 함수가 계속 유지하는 현상이에요.

### 비동기 함수 실행

```js
(async () => {
    const response = await getFile('https://12323');
    for await (const data of response) {
        console.log({ data });
    }
})();
```

async for-await를 사용할 수 있습니다. 한 번만 사용 가능한 비동기 함수 실행이 가능합니다.

해당 기능은 대용량 파일을 쪼개서 넘겨 받을 때 유용합니다. 데이터를 도착 순서대로 기다리면서 처리가 가능합니다.

> 대용량 데이터를 메모리에 한 번에 올리지 않고, 도착하는 대로 처리할 수 있도록 함
