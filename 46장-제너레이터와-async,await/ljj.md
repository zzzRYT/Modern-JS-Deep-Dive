# 제네레이터와 async/await

## 제네레이터란?

es6에서 도입된, 코드블록의 실행을 일시 중지 했다가 필요한 시점에 재개할 수 있도록 하는 특수 함수이다.

- 제너레이터함수는 함수의 제어권을 양도할 수 있다.

  > 일반 함수의 경우에, 실행하게 되면 제어권이 일반 함수에게 넘어간다.
  > 즉, 함수가 실행된 이후에 사용자는 함수에 대해서 제어가 불가능하다.
  >
  > 반면 제너레이터함수는 실행에 대한 제어가 가능한 제어권을사용자에게 양도가 가능하다.

- 제너레이터함수는 함수 호출자와 함수 상태를 주고 받을 수 있다.

> 일반 함수의 경우 외부로부터 데이터를 주입받고, 일관된 값읇 반환하도록 설계되어있다.
> 즉, 함수가 실행되는 동안 외부의 요소가 함수 내부의 상태를 변경시킬 수 없다는 것을 의미한다.
>
> 제너레이터함수의 경우 양방향으로 함수의 상태를 주고받을 수 있다.

- 제너레이터함수를 호출하면 제너레이터 객체를 반환한다.

```js
function* getDecFun() {
    yield 1;
}

const getExpFunc = function* () {
    yield 1;
}

const obj = {
    ★ genObjMethod() {
        yi은Id 1;
    }
};
// 제너레이터 클래스 메서드
class MyClass {
    * genClsMethod() {
        yield 1;
    }
}
```

\*(에스터리스크)는 일관성을 위해 function 바로 뒤에 위치하는게 좋다.

제너레이터함수는 화살표 함수로 표현이 불가 하다.
new를 사용하는 것도 불가

## 제너레이터 객체

제러네리터 함수를 호출하면 일반 함수처럼 코드 블록을 실행하는 것이 아니라 제러레이터 객체를 생성해 반환한다.

제너레이터가 반환한 객체는 이터러블 이면서 동시에 이터레이터이다.

> 즉, Symbol.iterator 메서드를 상속하면서, next메서드를 소유하는 이터레이터 (순회가능하단 뜻)

```js
// 제너레이트 함수
function* getFunc() {
  yield 1;
  yield 2;
  yield 3;
}

// 제너레이트 함수는 제너레이트 객체를 반환한다.
const generator = getFunc();

// 제너레이터 객체는 이터러블이면서 동시에 이터레이터다
// 이터러블은 Symbol, iterator 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체다
console.log(Symbol.iterator in generator); // true
// 이터레이터는 next 메서드를 갖는다
console.log('next' in generator); // true
```

일반 이터레이터와는 다른점은, 제너레이터 함수로부터 반환된 제너레이터 객체에는 return 과 throw을 포함한다는 것이다.

- 실행 제어: next(), return(), throw() 메서드
  제너레이터 객체는 실행을 제어하는 세 가지 주요 메서드를 포함한다.

1. next() 메서드 (가장 중요)
   역할: 멈춰 있던 제너레이터 함수의 실행을 재개

   동작: 다음 yield 표현식을 만날 때까지 코드를 실행

   yield를 만나면, 그 값 (yield 1에서의 1)을 value 프로퍼티에 담고, 함수 실행을 멈춤

   반환하는 객체는 { value: 내보낸 값, done: false } 형태입니다.

   종료: 함수 끝까지 실행되면, { value: undefined, done: true }를 반환하며 완전히 종료

2. return() 메서드
   역할: 제너레이터의 실행을 강제로 즉시 종료

   동작: 인수로 전달받은 값이 있다면 그것을 value에 담고, 즉시 { value: 전달된 값, done: true }를 반환, 그 이후에는 next()를 호출해도 계속 done: true 상태를 유지

3. throw() 메서드
   역할: 제너레이터 함수 내부로 에러를 발생

   동작: 인수로 전달받은 에러를 제너레이터 함수 내부에서 던짐

   내부에 try...catch 블록이 있으면 에러를 잡고 처리할 수 있다.

   에러가 처리되거나 처리되지 않더라도, 제너레이터는 즉시 종료되며 { value: undefined, done: true }를 반환

```js
function* getFunc() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } catch (e) {
    console.error(e);
  }
}

const generator = getFunc();
console.log(generator.next()); // { value: 1, done: false }
console.log(generator.return('END')); // { value: END, done: true }
console.log(generator.throw('Error!')); // { value: undefined, done: true}
```

## 활용

제러레이터를 사용하면, 이터레이터로 만든 재귀함수를 좀 더 간단하게 만들 수 도 있고,

비동기를 동기처럼 동작하느 동작을 만들 수 있다.
동작 과정은 굉장히 난해 하기 때문에 생략...

## async/await

제너레이터를 사용해서 비동기를 동기처럼 처리하는 과정은 굉장히 복잡하기 때문에 es8 (2017)에서 async/await이 도입되었다.

프로미스에 then/catch/finally 콜백을 사용해서 후속처리 할 필요없이 마치 동치처럼 프로미스를 처리할 수 있게 되었다.

### async

await은 반드시 async 블록 내부에서만 사용해야 한다.
언제나 프로미스를 반환한다.
async는 명시적으로 promise를 반환하지 않더라도, 암묵적으로 resolve하는 프로미스를 반환한다.

### await

await키워드는 프로미스가 settled(비동기가 처리된 상태)가 될 때까지 대기하다가 프로미스의 resolve한 결과를 반환하기 위해 사용되는 문법이다.

각각의 프로미스 동작이 서로 다른 프로미스에 영향을 주지 않는 독립적으로 수행되는 로직이라면 하나의 Promise.all을 사용해서 처리하는게 좋다.

만약 더로 순서가 보장되어야 한다면 가각의 await을 걸어주는게 바람직하다.

### 에러처리

try ~ catch 를 통해서 에러를 처리할 수 있다.

비동기 작업중 발생한 에러를 catch 블록에서 처리할 수 있다.

async 블록 내에서 try catch를 통해서 처리하지 않는다면 reject를 반환하기 때문에 Promise.prototype.catch를 사용해서 처리가 가능하다
