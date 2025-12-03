# 45장 프로미스

- js는 비동기 처리를 위한 하나의 패턴으로 콜백 함수를 사용한다

- 전통적인 콜백 패턴은 콜백헬로 가독성이 나쁘고, 에러처리가 곤란하다. 여러개의 비동기 처리를 한번에 처리하는것도 한계가 있다.

- ES6에서 비동기 처리를 위한 또 다른 패턴, 프로미스Promise를 도입했다.

## 45.1 비동기 처리를 위한 콜백 패턴의 단점

### 45.1.1 콜백 헬

- Ajax장에서 배운 `XMLHttpRequest()`로 get 요청을 작성해보자

```js
// GET 요청을 위한 비동기 함수
const get = (url) => {
  const xhr = new XMLHttpRequest();

  // HTTP 메서드와 요청 URL 설정
  xhr.open("GET", url);

  // 요청 전송
  xhr.send();

  // 요청이 완료되었을 때 호출되는 콜백
  xhr.onload = () => {
    if (xhr.status === 200) {
      // 서버의 응답(JSON 문자열)을 파싱해서 콘솔에 출력
      console.log(JSON.parse(xhr.response));
    } else {
      // 에러 상태 코드 및 메시지 출력
      console.error(`${xhr.status} ${xhr.statusText}`);
    }
  };
};

// id가 1인 post를 취득
get("https://jsonplaceholder.typicode.com/posts/1");

/*
응답 예시:
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere ...",
  "body": "quia et suscipit ..."
}
*/
```

1. get은 비동기함수다. 왜냐하면 이 비동기 작업을 등록하고 스케줄링하는 js외부의 API를 다루고있고, 비동기적으로 동작하는 코드(xhr.onload 이벤트 핸들러와 대입될 콜백함수)을 가지고 있기 때문이다.

2. get함수는 `xhr.send()`호출 이후에 xhr.onload에 콜백할 함수를 하나 대입하고는 끝난다. get함수는 요청의 응답을 받지 못하고 끝난다.

3. xhr.onload에 들어간 콜백함수는 get함수가 끝난다음 비동기 스케쥴링이 끝난, load 이벤트가 발생하면 실행된다.
   정확히는 태크스큐에 저장되었다가 콜스택 비면 실행된다.

4. 결과적으로 get함수의 라이프사이클과, 콜백함수는 다르게 실행되며, get함수가 외부로 뭔가를 리턴할때 콜백함수의 응답을 리턴할 수 없다.

```js
xhr.onload = () => {
  if (xhr.status == 200) {
    return JSON.(xhr.response); // return을 하더라도
  }
  console.error(`${xhr.status} ${xhr.statusText}`);
}
```

```js
const response = get("https://jsonplaceholder.typicode.com/posts/1");
console.log(response); // undefined
```

5. 이벤트 핸들러의 콜백함수의 반환문은 get의 반환문이 아니다.(당연)

- 같은 예시로 `setTimeout`함수도 비동기 함수다. setTimeoute도 외부 API다.

```js
let g = 0;

setTimeout(() => {
  g = 100;
}, 0);

console.log(g); // 0
```

- 콜백함수를 통해 상위 스코프의 let g = 0 의 값을 바꾸고 로그를 찍고 싶지만, 콜백이 g변수의 값이 바뀌기 전에 setTimeout비동기함수는 끝났고 바로 console.log(g)를 찍어본다.

- 이처럼 비동기 함수는 비동기 처리 결과를 외부에 반환할 수 없고 상위 스코프에 할당할 수도 없다. 후속처리를 위한 콜백을 전달 하는게 일반적이다.

---

- 후속처리를 수행하기 위해 또 비동기함수를 사용하면, 콜백이 늘어나고 콜백 호출은 점점 중첩된다.

- 콜백 함수 호출이 중첩되며 복잡도가 높아지는 현상을 콜백헬 `callback hell` 이라 한다.

```js
// GET 요청을 위한 비동기 함수
const get = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      // 서버의 응답을 콜백 함수에 전달하면서 호출하여 응답에 대한 후속 처리를 한다
      callback(JSON.parse(xhr.response));
    } else {
      console.error(`${xhr.status} ${xhr.statusText}`);
    }
  };
};

const url = "https://jsonplaceholder.typicode.com";

// id가 1인 post의 userId를 취득
get(`${url}/posts/1`, ({ userId }) => {
  console.log(userId); // 1

  // post의 userid를 사용하여 user 정보를 취득
  get(`${url}/users/${userId}`, (userInfo) => {
    console.log(userInfo);
    // { id: 1, name: "Leanne Graham", username: "Bret", ... }
  });
});
```

> 예제 45-08

### 45.1.2 에러 처리의 한계

- 비동기 처리를 위한 콜백 패턴의 문제점 중에서 가장 심각한 것은 에러 처리가 곤란한 점이다.

> 예제 45-09

1초뒤 콜백함수는 에러를 발생시키지만, catch 코드블록은 캐치되지 않는다. 에러는 호출자caller 방향으로 전파되기 때문이다.

1. setTimeout 호출된다. setTimeout실행컨택스트가 쌓인다.
2. setTimeout 끝난다. setTimeout 실행컨택스트가 제거된다.
3. 이후에 콜스택이 비워지고 콜백함수의 실행컨택스트가 쌓인다.
4. 에러를 발생하지만 하위 실행컨텍스트는 없다.
5. setTimeout은 콜백함수의 caller가 아니다. 콜백함수는 이벤트 핸들러를 통해 호출되었다.

- 이를 극복하기 위해 ES6에서 프로미스 Promise가 도입되었다.

## 45.2 프로미스의 생성

- ECMAScript 사양에 정의된 표준 빌트인 객체인 `Promise` 생성자 함수는 `new`와 함께 호출해 프로미스 객체를 생성한다.

1. `Promise` 생성자함수는 콜백함수를 인수로 받는다.
2. 콜백함수는 `resolve`와 `reject` 함수를 인수로 전달 받는다.
3. 비동기 처리가 성공하면 `resolve`를 호출해주고, 실패하면 `reject`함수를 호출해 주자.

> 예제 45-10

- 이전의 비동기함수 `get`을 프로미스를 사용해 구현해보기

> 예제 45-11

1. 비동기함수 `promiseGet`함수는 primise객체를 생성,반환
2. Promise생성자는 실행시킬 콜백을 인수로 넣어주기. 콜백은 resolve, reject를 인수로 전달받음.
3. 비동기처리 결과를 resolve, reject에 인수로 넣어 호출하기

- 프로미스는 아래표와 같이 현재 비동기 처리가 어떻게 진행되고 있는지를 나타내는 상태정보를 갖는다.

> 그림 45-1 위 표

- 생성 직후 기본적으로 pending 상태이다.

- 프로미스의 상태는 resolve 또는 reject 함수를 호출하는 것으로 결정된다.

> 그림 45-1

1. settled 상태 === fulfiled 또는 rejected 상태 === pending이 아닌 상태

2. pending -> settled 로 변화는 가능하지만 settled -> pending 변경은 불가능하다.

3. 프로미스는 비동기처리 상태 뿐만아니라 처리결과(resovle, reject 호출때 인수로 넣은 값)도 상태로 갖는다.

> 그림 45-2

> 그림 45-3

- 프로미스는 비동기 처리상태와 처리결과를 관리하는 객체다.

## 45.3 프로미스의 후속 처리 메서드

- 프로미스의 처리 상태,결과를 가지고 후속처리를 해야한다. 이를 위해 프로미스는 후속 메서드 then, catch, finally를 제공한다.

- 프로미스 처리 상태변화에 따라, 후속메서드의 콜백함수가 선택되어 호출되고, 프로미스 처리결과가 콜백에 인수로 전달된다.

### 45.3.1 Promise.prototype.then

> 예제 45-14

- `then`은 두개의 콜백을 인수로 전달받으며, fulfilled상태일때 첫번째, rejected상태일때 두번째 콜백을 호출한다.

- `then` 메서드는 언제나 프로미스를 반환한다.

- `then` 메서드의 콜백함수가 프로미스를 반환하면 그대로 반환, 프로미스가 아닌값을 반환하면 그 값을 암묵적으로 resolve 또는 reject하여 프로미스를 생성, 반환한다.

### 45.3.2 Promise.prototype.catch

> 예제 45-15

### 45.3.3 Promise.prototype.finally

> 예제 45-17

- promiseGet 함수를 후속처리 해보기

```js
const promiseGet = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        // 성공적으로 응답을 전달받으면 resolve 함수를 호출한다
        resolve(JSON.parse(xhr.response));
      } else {
        // 에러 처리를 위해 reject 함수를 호출한다
        reject(new Error(xhr.status));
      }
    };
  });
};

// promiseGet 함수는 프로미스를 반환한다
promiseGet("https://jsonplaceholder.typicode.com/posts/1")
  .then((res) => console.log(res))
  .catch((err) => console.error(err))
  .finally(() => console.log("Bye~"));
```

## 45.4 프로미스의 에러 처리

- 이전 비동기 처리를 위한 콜백패턴은 에러처리가 곤란했다. 프로미스는 에러를 문제없이 처리할 수 있다.

> 45-19

- 비동기처리에서 발생한 에러를 `then` 메서드의 두번째 콜백 함수인자 받아 처리하기.

- 당연히 `catch`도 가능하다. catch는 내부적으로 `then(undefined, onRejected)`을 호출한다.

> 예제 45-21

- then을 사용해 에러를 캐치하는건

1. 첫번째 콜백의 에러를 캐치하지 못함
2. 코드가 복잡해짐

위 이유로 `catch`를 사용하자, catch는 앞의 then 호출 후 내부에서 발생한 에러까지 모두 캐치할 수 있다.

## 45.5 프로미스체이닝

- 비동기 처리를 위한 콜백 패턴은 콜백 헬이 발생하는 문제가 있다. 프로미스는 후속처리 메서드를 통해 콜백 헬을 해결한다.

> 예제 45-24

- then -> then -> catch 순서로 후속처리 메서드를 호출한다. 항상 프로미스를 반환하므로 연속전으로 호출할 수 있다.

- 이를 프로미스 체이닝(`promise chaining`)이라 한다.

- 이전의 비동기 처리를 위한 콜백 헬이 발생하지 않지만, 프로미스도 콜백함수를 사용하긴 한다.

- 콜백 패턴은 가독성이 좋지 않다. 이를 ES8에서 도입된 `async/await`을 통해 해결할 수 있다.

- `async/awai`t을 사용하면 프로미스 후속처리 메서드 없이 마치 동기 처리 처럼 프로미스가 처리 결과를 반환하도록 구현할 수 있다.

> 예제 45-25

## 45.6 프로미스의 정적 메서드

- `Promise`는 주로 생성자 함수로 사용되지만 객체이므로 메서드를 가질 수 있다. 5가지의 정적 메서드를 제공한다.

### 45.6.2 Promise.resolve / Promise.reject

> 예제 45-26, 45-27
> 예제 45-28, 45-29

- 인수로 전달받은 값을 resolve, reject하는 프로미스를 생성한다.

### 45.6.2 Promise.all

- `Promise.all` 메서드는 여러개의 비동기 처리를 모두 병렬처리할 때 사용한다.

> 예제 45-30

- 위 예제는 3개의 비동기 처리를 순차적으로 한다. 총 6초가 소요된다. 각 처리는 서로 의존하지 않고 개별적으로 수행되고 있지만 순차적으로 작동되 퍼포먼스가 떨어진다.

> 예제 45-31

- `Promise.all` 메서드는 프로미스를 요소로 같는 배열 등의 이터러블을 인수로 전달받는다. 그리고 모든 프로미스가 fulfilled 상태가 되면 처리결과를 배열에 저장해 새로운 프로미스를 반환한다.

- Pro,ise.all의 종료시간은 가장늦게 fulfilled 상태가 되는 프로미스 처리시간보다 약간 길다.

### 45.6.3 Promise.race

> 예제 45-35

- `Promise.race`는 `Promise.all`처럼 프로미스요소의 배열등의 이터러블 인수를 받는다. 다른점은 인수 중 가장 먼저 fulfilled 상태가 되는 프로미스 처리결과를 resolve로 반환한다.

- rejected 상태는 `Promise.all`이랑 동일하게 하나라도 rejected되면 에러를 reject한 프로미스를 반환한다.

> 예제 45-36

### 45.6.4 Promise.allSettled

> 예제 45-37

- `Promise.allSettled`은 Promise.all`처럼 프로미스요소의 배열등의 이터러블 인수를 받는다. 위 두개랑 다르게 fulfilled, rejected를 같이 처리하며, 각 처리결과를 배열로 반환한다.

> 예제 45 - 38

- 처리결과를 나타내는 객체는 위와 같다. 상태를 나타내는 status 프로퍼티와 상태에따라 value, reason 프로퍼티를 가진다.

> `Error: Error! at <anonymous>:3:54`는 `reason`프로퍼티에 담긴 에러객체를 화면에 포멧해서 보여준 형태다.

## 45.7 마이크로태스크 큐

> 예제 45-39

- 예제를 보면 프로미스 메서드들도 비동기니까, 태스크큐에 콜백이 순서대로 쌓여 실행되니 `1->2->3` 이라고 생각할 수도 있다.

- 프로미스 후속처리 메서드의 콜백함수는 태스크큐X, 마이크로태스크 큐에 저장된다.

- 마이크로태스크 큐는 태스크 큐와는 별도의 큐다. 프로미스의 후속처리 메서드의 콜백함수가 일시저장되며, 태스크큐보다 우선순위가 높다.

- 결과적으로 `2->3->1`의 출력이 나온다.

## 45.8 fetch

- `fetch` 함수는 `XMLHttpRequest` 객체와 마찬가지로 HTTP요청 전송기능을 제공하는 클라이언트 사이드 Web API다.

- 좀더 간단하고 프로미스를 지원한다.

- fetch 함수는 HTTP 응답을 나타내는 Response 객체를 래핑한 Promise 객체를 반환한다.

> 예제 45- 40
