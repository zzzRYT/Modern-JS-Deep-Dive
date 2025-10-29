# 7번째 타입 Symbol

## 33.1 심벌이란?

심벌(Symbol)은 ES6에서 도입된 7번째 데이터 타입으로 변경 불가능한 원시 타입의 값이다.\
심벌 값은 다른 값과 중복되지 않는 유일무이한 값이다. 따라서 주로 이름의 충돌 위험이 없는 유일한 프로퍼티 키를 만들기 위해 사용한다.

## 33.2 심벌 값의 생성

### 33.2.1 Symbol 함수

다른 원시값(문자열, 숫자, 불리언, undefined, null)은 리터럴 표기법을 통해 값을 생성할 수 있지만, 심벌 값은 Symbol 함수를 호출하여 생성한다.\
생성된 심벌 값은 외부로 노출되지 않아 확인할 수 없다.

<img width="428" height="190" alt="스크린샷 2025-10-29 오후 4 25 57" src="https://github.com/user-attachments/assets/2e61abb9-5558-4c77-9ad0-c972acebc3c2" />

언뜻 보면 생성자 함수로 객체를 생성하는 것처럼 보이지만 Symbol 함수는 String, Number, Boolean 생성자 함수와는 달리 new 연산자와 함께 호출하지 않는다.

<img width="511" height="63" alt="스크린샷 2025-10-29 오후 4 30 36" src="https://github.com/user-attachments/assets/903dc129-436d-4e57-bde2-46874556aa9b" />

Symbol 함수에는 선택적으로 문자열을 인수로 전달할 수 있다.\
이 문자열은 생성된 심벌 값에 대한 설명으로 디버깅 용도로만 사용되며, 심벌 값 생성에 어떠한 영향도 주지 않는다.

<img width="475" height="160" alt="스크린샷 2025-10-29 오후 4 31 41" src="https://github.com/user-attachments/assets/73ca1b03-564e-4042-888f-88c010294b82" />

심벌 값도 문자열, 숫자, 불리언과 같이 객체처럼 접근하면 암묵적으로 래퍼 객체를 생성한다.

<img width="495" height="166" alt="스크린샷 2025-10-29 오후 4 32 19" src="https://github.com/user-attachments/assets/714cf214-94e1-4141-bbb5-4ddf10c51583" />

심벌 값은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않는다.

<img width="735" height="168" alt="스크린샷 2025-10-29 오후 4 32 55" src="https://github.com/user-attachments/assets/82bcdcac-f715-4bdb-9cfb-c78f9908b8ec" />

단, 불리언 타입으로는 암묵적으로 타입 변환된다.

<img width="494" height="209" alt="스크린샷 2025-10-29 오후 4 33 23" src="https://github.com/user-attachments/assets/431a418f-c5fe-45a5-ae48-73c629432a19" />

### 33.2.2 Symbol.for / Symbol.keyFor 메서드

Symbol.for 메서드는 인수로 전달받은 문자열을 키로 사용하여 키와 심벌 값의 쌍들이 저장되어 있는 전역 심벌 레지스트리에서 심벌 값을 검색한다.

> 검색에 성공하면 검색된 심벌 값을 반환한다.
> 검색에 실패하면 새로운 심벌 값을 생성하여 전역 심벌 레지스트리에 저장한 후, 생성된 심벌 값을 반환한다.

<img width="655" height="191" alt="스크린샷 2025-10-29 오후 4 36 20" src="https://github.com/user-attachments/assets/7ccc29e6-80c4-4dc2-916c-f184169ea224" />

Symbol 함수를 사용하면 전역 심벌 레지스트리에서 심벌 값을 검색할 수 있는 키를 지정할 수 없으므로 전역 심벌 레지스트리에 등록되어 관리되지 않는다.\
하지만 Symbol.for 메서드를 사용하면 애플리케이션 전역에서 중복되지 않는 심벌 값을 단 하나만 생성하여 전역 심벌 레지스트리를 통해 공유할 수 있다.

Symbol.keyFor 메서드를 사용하면 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출할 수 있다.

<img width="657" height="264" alt="스크린샷 2025-10-29 오후 4 38 58" src="https://github.com/user-attachments/assets/544815b2-c716-43e7-91df-5f9e40698bc7" />

## 33.3 심벌과 상수

<img width="525" height="403" alt="스크린샷 2025-10-29 오후 4 39 26" src="https://github.com/user-attachments/assets/07291cb6-83b5-4c97-aea2-9b585ae2babf" />

위 예제와 같이 값에는 특별한 의미가 없고 상수 이름 자체에 의미가 있는 경우가 있다.\
여기서 문제는 상수 값 1, 2, 3, 4가 변경될 수 있으며, 다른 변수 값과 중복될 수도 있다는 것이다.\
이러한 경우 변경/중복될 가능성이 있는 무의미한 상수 대신 중복될 가능성이 없는 유일무이한 심벌 값을 사용할 수 있다.

<img width="430" height="384" alt="스크린샷 2025-10-29 오후 4 41 18" src="https://github.com/user-attachments/assets/f84ee76b-f75b-475f-bbb7-6a9c43caf75b" />

자바스크립트는 enum을 지원하지 않고 타입스크립트에서는 enum을 지원한다.\
자바스크립트에서 enum을 흉내 내어 사용하려면 다음과 같이 객체의 변경을 방지하기 위해 객체를 동결하는 Object.freeze 메서드와 심벌 값을 사용한다.

<img width="482" height="381" alt="스크린샷 2025-10-29 오후 4 43 15" src="https://github.com/user-attachments/assets/1278e655-d1f1-4909-9fe6-28d1344a9047" />

## 33.4 심벌과 프로퍼티 키

심벌 값으로 프로퍼티 키를 동적 생성하여 프로퍼티를 만들어보자.\
심벌 값을 프로퍼티 키로 사용하려면 프로퍼티 키로 사용한 심벌 값에 대괄호를 사용해야 한다.\
프로퍼티에 접근할 때도 마찬가지로 대괄호를 사용해야 한다.

<img width="362" height="182" alt="스크린샷 2025-10-29 오후 4 50 33" src="https://github.com/user-attachments/assets/822fbcfe-cc6e-4d52-983f-63b105e6f056" />

심벌 값은 유일무이한 값이므로 심벌 값으로 프로퍼티 키를 만들면 다른 프로퍼티 키와 절대 충돌하지 않는다.\
기존 프로퍼티 키와 충동하지 않는 것은 물론, 미래에 추가될 어떤 프로퍼티 키와도 충돌할 위험이 없다.

## 33.5 심벌과 프로퍼티 은닉

심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티는 for ... in 문이나 Object.keys, Object.getOwnPropertyNames 메서드로 찾을 수 없다.\
이처럼 심벌 값을 프로퍼티 키로 사용하여 프로퍼티를 생성하면 외부에 노출할 필요가 없는 프로퍼티를 은닉할 수 있다.

<img width="487" height="298" alt="스크린샷 2025-10-29 오후 4 55 23" src="https://github.com/user-attachments/assets/bcd3cc4e-5715-46d6-867b-a8aa4611fee6" />

프로퍼티를 완전하게 숨길 수 있는 것은 아니고, ES6에서 도입된 Object.getOwnPropertySymbols 메서드를 사용하면 신벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티를 찾을 수 있다.

<img width="659" height="293" alt="스크린샷 2025-10-29 오후 4 57 27" src="https://github.com/user-attachments/assets/b5dab4e4-e5db-439e-94c4-e3e42219e987" />

## 33.6 심벌과 표준 빌트인 객체 확장

일반적으로 표준 빌트인 객체에 사용자 정의 메서드를 직접 추가하여 확장하는 것은 권장하지 않는다.\
그 이유는 개발자가 직접 추가한 메서드와 미래에 표준 사양으로 추가될 메서드의 이름이 중복될 수 있기 때문이다.\

<img width="474" height="195" alt="스크린샷 2025-10-29 오후 5 00 05" src="https://github.com/user-attachments/assets/0dbfa84f-ccb8-4766-9f06-334731d5a097" />

중복될 가능성이 없는 심벌 값으로 프로퍼티 키를 생성하여 표준 빌트인 객체를 확장하면 표준 빌트인 객체의 기존 프로퍼티 키와 충돌하지 않는 것은 물론, 표준 사양의 버전이 올라감에 따라 추가될지 모르는 어떤 프로퍼티 키와도 충돌할 위험이 없어 안전하에 표준 빌트인 객체를 확장할 수 있다.

<img width="631" height="192" alt="스크린샷 2025-10-29 오후 5 01 47" src="https://github.com/user-attachments/assets/9a36009d-99e7-4f93-9381-b18b984a98bd" />

## 33.7 Well-known Symbol

<img width="773" height="473" alt="스크린샷 2025-10-29 오후 5 03 45" src="https://github.com/user-attachments/assets/942022e4-dda5-417d-af3f-f917538b69de" />

자바스크립트가 기본으로 제공하는 빌트인 심벌 값을 ECMAScript 사양에서는 Well-knwon Symbol 이라 부른다.\
Well-knwon Symbol은 자바스크리브 엔진의 내부 알고리즘에 사용된다.

예를 들어 Array, String, Map, Set, TypedArray, arguments, NodeList, HTMLCollection과 같이 for ... of 문으로 순회 가능한 빌트인 이터러블은 Well-knwon Symbol인 Symbol.iterator를 키로 갖는 메서드를 가지며, Symbol.iterator 메서드를 호출하면 이터레이터를 반환하도록 ECMAScript 사양에 규정되어 있다.\
이를 이터레이션 프로토콜이라 하고, 빌트인 이터러블은 이 규정을 준수한다.

만약 빌트인 이터러블이 아닌 일반 객체를 이터러블처럼 동작하도록 구현하고 싶다면 이터레이션 프로토콜을 따르면 된다.\
즉, ECMAScript 사양에 규정되어 있는 대로 Well-known Symbol인 Symbol.iterator를 키로 갖는 메서드를 객체에 추가하고 이터레이터를 반환하도록 구현하면 그 객체는 이터러블이 된다.

<img width="544" height="477" alt="스크린샷 2025-10-29 오후 5 09 46" src="https://github.com/user-attachments/assets/9857b835-81d6-425e-adbb-55e15b4fa0a3" />

이터레이션 프로토콜을 준수하기 위해 일반 객체에 추가해야 하는 메서드의 키 Symbol.iterator는 기존 프로퍼티 또는 미래에 추가될 프로퍼티 키와 절대로 중복되지 않을 것이다.\
이처럼 심벌은 중복되지 않는 상수 값을 생성하는 것은 물론 기존에 작성된 코드에 영향을 주지 않고 새로운 프로퍼티를 추가하기 위해, 즉 하위 호환성을 보장하기 위해 도입되었다.
