# Symbol

심벌 함수는 "다른 값과 절대 중복되지 않는 유일무이한 값

## 심벌을 통해서 enum을 표현

```js
const Direction = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
};

const myDirection = Direction.UP;
if (myDirection === Direction.UP) {
  console.log('You are going UP.');
}
```

```js
const Direction = {
  UP: Symbol('up'),
  DOWN: Symbol('down'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('right'),
};

const myDirection = Direction.UP;
if (myDirection === Direction.UP) {
  console.log('You are going UP.');
}
```

이렇게 중복된 값에 대해서 하나의 유일무이한 값으로 설정이 가능
또 한 enum처럼 변경이 불가능하게 만들기 위해서

```js
js;
const Direction = Object.freeze({
  UP: Symbol('up'),
  DOWN: Symbol('down'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('right'),
});

const myDirection = Direction.UP;
if (myDirection === Direction.UP) {
  console.log('You are going UP.');
}
```

위 코드 처럼 `Object.freeze`를 사용해서 변경을 방지할 수 있다.

## 심벌과 프로퍼리 은닉

```js
const obj = {
    [Symbol('mySymbol')]： 1
}

for (const key in obj) {
    console.log(key); // 아무것도 출력되지 않는다.
};
console.log(Object.keys(obj)); // []
console.log(Object.getOwnPropertyNames(obj)); // []
```

이렇게 하면, 객체 프로퍼티에 접근하지 못해서 값을 불러오지 못한다.

ES6에서 추가된 `Object.getOwnPropertySymbols`메서드를 사용하면 심볼 객체 프로퍼티에 접근이 가능하다.

```js
js
const obj = {
    [Symbol('mySymbol')]： 1
}

console.log(Object.getOwnPropertySymbols(obj)) // [Symbol(mySymbol)]
```

## 빌트인 객체 확장

```js
Array.prototype.sum = function () {
  return this.reduce((acc, cur) => acc + cur, 0);
}[(1, 2)].sum(); // 3
```

이렇게 하면 커스텀 요소에 대해서 빌트인 객체 정의가 가능한데, 이 부분에 대해서는 표준에서 권장하지 않는다. 이유는, 빌트인 객체로 만들어놓은 기능이 다음 버전이 업데이트가 되면서 같은 이름의 빌트인 객체가 나온다면 덮어씌워지기 때문이다.

이 때 Symbol을 사용해서 유니크하게 만들어주는 방법이 있다.

```js
// 심벌 값으로 프로퍼티 키를 동적 생성하면 다른 프로퍼티 키와 절대 충돌하지 않아 안전하다.
Array.prototype[Symbol.for('sum')] = function () {
    return this.reduce((acc, cur) => acc + cur, 0);
}；
[1, 2][Symbol.for('sum')](); // 3
```
