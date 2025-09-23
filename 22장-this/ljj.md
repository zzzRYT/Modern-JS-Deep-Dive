# 22장 this

객체는 `상태`를 나타내는 프로퍼티와 `동작`을 나타내는 메서드를 하나의 논리적인 단위로 묶음 복합적인 자료구조 입니다.

`동작`을 나타내는 메서드는 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 합니다.

```js
// 객체 리터럴로 생성된 방식

const circle = {
  radius: 5,
  getDiameter() {
    return 2 * circle.radius;
  },
};

console.log(circle.getDiameter()); // 10
```

객체 리터럴로 생성된 객체에 대해서는 getDimeter 메서드가 호출되는 시점에 이미 객체 리터럴의 평가가 완료되어 객체가 생성되었고, circle식별자에 생성된 객체가 할당된 이후기 때문에 circle 식별자를 참조가 가능합니다.

```js
// 생성자 함수로 생성된 방식
function Circle(radius) {
    ??.radius = radius;
}


Circle.prototype.getDiameter = function() {
    return 2 * ??.radius;
}

const circle = new Circle(5);
```

new 연산자를 통해서 생성자 함수를 정의하는 시점에는 아직 인스턴스가 생성되기 이전이기 때문에 참조할 값을 찾을 수 없습니다.

이 때 자신이 속한 객체 또는 인스턴스에 대해서 가르키는 특수한 식별자가 바로 `this`입니다.

`this`는 자바스크립트 엔진에 의해서 아묵적으로 생성되며, 코드 어디서든 참조가 가능합니다.
`arguments`객체와 동일하게 지역 변수처럼 사용이 가능합니다.

> 단, this가 가르키는 값 즉, this 바인딩은 함수 호출 방식에 의해 동적으로 결정됩니다.

- 자바서크립트의 this는 함수가 호출되는 방식에 따라서 this에 바인딩 될 값잉 동적으로 결정됩니다.

![img](./ljj01.png)

this는 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로, 일반적으로 함수 내부, 객체 메서드 내부에서나 의미가 있습니다. 때문에 strict mode가 적용된 일반 함수는 this를 사용시 undefined가 바인딩 됩니다.
