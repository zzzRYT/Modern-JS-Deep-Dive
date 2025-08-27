# 객체 리터럴

객체는
- 프로퍼티 키
- 프로퍼티 값
두 가지로 이루어진 프로퍼티로 구성되어있다.

자바스크립트에서 사용하는 함수는 "일급객체"이다. 그렇기 때문에 객체의 값으로 사용이 가능한데,

여기서 객체 내부의 값으로 사용되는 함수는 구분을 위해서 "메서드"라는 이름으로 부른다.

> 이 처럼 객체는 "프로퍼티"와 "메서드"로 구성된 집합체다

## 프로퍼티 축약 표현

```js
var x = 1, y = 2;

var obj = { x, y }

console.log(obj); // { x: 1, y: 2 }
```

```js
var obj = {
    name: 'Lee',
    sayHi: function() {
        console.log('Hi! ' + this.name);
    }
}

obj.sayHi(); //Hi! Lee
```

```js
var obj = {
    name: 'Lee',
    sayHi() {
        console.log('Hi! ' + this.name);
    }
}

obj.sayHi(); //Hi! Lee
```
이런식으로 함수를 축약할 수 있는건 처음 알았음