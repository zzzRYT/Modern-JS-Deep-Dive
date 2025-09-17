# 19장 strict mode

## 암묵적인 전역

```js
function foo() {
  x = 10;
}
foo();

console.log(x);
```

레퍼런스 에러가 날 것 같지만 엔진이 암묵적 전역으로 선언한다.

strict mode는 js에서 암묵적으로 허용해주는 요소들에 대해서 엄격하게 에러를 발생시켜주는 기능이라고 생각하면 좋을 것 같다.
