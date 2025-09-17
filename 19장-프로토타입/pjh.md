# 19장 프로토타입

객체지향 프로그래밍 언어의 특징인 클래스와 상속, 캡슐화를 위한 키워드인 public, private, protected 등이 없어서 자바스크립트는 객체지향 언어가 아니라고 오해 하는 경우도 있다.\
하지만 자바스크립트는 객체 기반의 프로그래밍 언어이며, 자바스크립트를 이루고 있는 거의 모든 것이 객체다.

## 19.1 객체지향 프로그래밍

객체지향 프로그래밍은 여러 개의 독립적 단위, 즉 객체(object)의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 말한다.\
객체지향 프로그래밍은 실세계의 실체를 인식하는 철학적 사고를 프로그래밍에 접목하려는 시도에서 시작하는데 다양한 속정 중에서 프로그램에 필요한 속성마 간추려 내어 표현하는 것을 추상화(abstraction)라 한다.\
객체의 상태(state)를 나타내는 데이터와 상태 데이터를 조작할 수 있는 동작(be-havior)을 하나의 논리적인 단위로 묶어 생각한다.\
따라서 객체는 상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합전인 자료구조라고 할 수 있다.\
이때 객체의 상태 데이터를 프로퍼티(property), 동작을 메서드(method)라 부른다.

## 19.2 상속과 프로토타입

상속(inheritance)은 객체지향 프로그래밍의 핵심 개념으로, 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다.\
자바스크립트는 프로토타입을 기반으로 상속을 구현하여 불필요한 중복을 제거한다.

<img width="584" height="521" alt="스크린샷 2025-09-17 오후 5 29 19" src="https://github.com/user-attachments/assets/f264834a-09ef-4366-bb88-e872264af27e" />

Circle 생성자 함수가 생성하는 모든 객체(인스턴스)는 radius 프로퍼티와 getArea 메서드를 갖는다.\
radius 프로퍼티 값은 일반적으로 인스턴스마다 다르다.\
하지만 getArea 메서드는 모든 인스턴스가 동일한 내용의 메서드를 사용하므로 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.\
위 예제에선 Circle 생성자 함수가 인스턴스를 생성할 때 마다 getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유하고 있다.

<img width="506" height="266" alt="스크린샷 2025-09-17 오후 5 32 41" src="https://github.com/user-attachments/assets/55b48069-57a1-454e-8fa8-41a966620e85" />

이 때 자바스크립트는 프로토타입(prototype)을 기반으로 상속을 구현하여 불필요한 중복을 제거할 수 있다.

<img width="601" height="563" alt="스크린샷 2025-09-17 오후 5 33 44" src="https://github.com/user-attachments/assets/b6c19933-c578-4a90-a7ab-13d818d05037" />
<img width="550" height="265" alt="스크린샷 2025-09-17 오후 5 33 59" src="https://github.com/user-attachments/assets/6a1eb37b-ba1a-43d7-8ef7-fc1e68ea8d3b" />

Circle 생성자 함수가 생성한 모든 인스턴스는 자신의 프로토타입, 즉 상위(부모) 객체 역할을 하는 Circle.prototype의 모든 프로퍼티와 메서드를 상속받는다.\
getArea 메서드는 하나만 생성되어 프로토타입인 Circle.prototype의 메서드로 할당되어 있다.\
따라서 Circle 생성자 함수가 생성하는 모든 인스턴스는 getArea 메서드를 상속받아 사용할 수 있다.

## 19.3 프로토타입 객체

프로토타입 객체(줄여서 프로토타입)린 객체지향 프로그래밍의 근간을 이루는 객체 간 상속을 구현하기 위해 사용된다.\
프로토타입은 어떤 객체의 상위(부모) 객체의 역할을 하는 객체로서 다른 객체에 공유 프로퍼티(메서드 포함)를 제공한다.

모든 객체는 [[Prototype]]이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참조다. (null인 경우도 있다)\
[[Prototype]]에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다.

모든 객체는 하나의 프로토타입을 갖는다.\
그리고 모든 프로토타입은 생성자 함수와 연결되어 있다.

<img width="513" height="271" alt="스크린샷 2025-09-17 오후 5 41 19" src="https://github.com/user-attachments/assets/fc6c0a26-e6a7-473a-afca-e1794d17ea62" />

[[Prototype]] 내부 슬롯에는 직접 접근할 수 없지만, \_\_proto__ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 자신의 [[Prototype]] 내부 슬롯이 가리키는 프로토타입에 간접적으로 접근할 수 있다.
그리고 프로토타입은 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근할 수 있고, 생성자 함수는 자신의 prototype 프로퍼티를 통해 프로토타입에 접근할 수 있다.

### 19.3.1 \_\_proto__ 접근자 프로퍼티

모든 객체는 \_\_proto__ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 [[Prototype]] 내부 슬롯에 간접적으로 접근할 수 있다.

<img width="448" height="405" alt="스크린샷 2025-09-17 오후 5 48 54" src="https://github.com/user-attachments/assets/dd5f6a84-598a-4745-8860-22b71f730c58" />

빨간 박스로 표시한 것이 person 객체의 프로토타입인 Object.prototype이다.\
이는 \_\_proto__ 접근자 프로퍼티를 통해 person 객체의 [[Prototype]] 내부 슬롯이 가리키는 객체인 Object.prototype에 접근할 결과이다.

**""\_\_proto__는 접근자 프로퍼티다.""**

16.1절 "내부 슬롯과 내부 메서드"에서 살펴보았듯이 내부 슬롯은 프로퍼티가 아니다.\
따라서 자바스크립트는 원칙적으로 내부 슬롯과 내부 메서드에 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않는다.\
[[Prototype]] 내부 슬롯에도 직접 접근할 수 없으며 \_\_proto__ 접근자 프로퍼티를 통해 간접적으로 프로토타입에 접근할 수 있다.

접근자 프로퍼티는 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수 [[Get]], [[Set]] 프로퍼티 어트리뷰트로 구성된 프로퍼티다.

<img width="528" height="188" alt="스크린샷 2025-09-17 오후 5 58 10" src="https://github.com/user-attachments/assets/86768fd1-60ff-4f33-b227-f67b220d11c4" />

Object.prototype의 접근자 프로퍼티인 \_\_proto__는 getter/setter 함수라고 부르는 접근자 함수를 통해 [[Prototype]] 내부 슬롯의 값, 즉 프로토타입을 취득하거나 할당한다.\
\_\_proto__ 접근자 프로퍼티를 통해 프로토타입에 접근하면 내부적으로 \_\_proto__ 접근자 프로퍼티의 getter 함수인 [[Get]] (get \_\_proto__)이 호출된다.\
\_\_proto__ 접근자 프로퍼티를 통해 새로운 프로토타입을 할당하면 \_\_proto__ 접근자 프로퍼티의 setter 함수인 [[Set]] (set \_\_proto__)이 호출된다.

<img width="517" height="165" alt="스크린샷 2025-09-17 오후 7 15 23" src="https://github.com/user-attachments/assets/fa0cb9b3-9bbc-43ab-a210-d96a055e1cb2" />
<img width="503" height="102" alt="스크린샷 2025-09-17 오후 7 15 36" src="https://github.com/user-attachments/assets/df30a2e6-75a2-4910-b54b-ede0d3a8a112" />

**""\_\_proto__ 접근자 프로퍼티는 상속을 통해 사용된다.""**

\_\_proto__ 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 Object.prototype의 프로퍼티다.\
모든 객체는 상속을 통해 Object.prototype.\_\_proto__ 접근자 프로퍼티를 사용할 수 있다.

<img width="678" height="293" alt="스크린샷 2025-09-17 오후 7 21 04" src="https://github.com/user-attachments/assets/5b4f977f-8edb-4f49-9264-22d144d6869b" />

**""\_\_proto__ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유""**

[[Prototype]] 내부 슬롯의 값, 즉 프로토타입에 접근하기 위해 접근자 프로퍼티를 사용하는 이유는 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서다.

<img width="546" height="210" alt="스크린샷 2025-09-17 오후 7 23 03" src="https://github.com/user-attachments/assets/36cc6362-aaad-49b3-8a92-b64e4a0b2285" />

위 예제에서는 parent 객체를 child 객체의 프로토타입으로 설정한 후, child 객체를 parent 객체의 프로토타입으로 설정했다.\
프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다.\
위 예제처럼 순환 참조하는 프로토타입 체인이 만들어지면 프로퍼티를 검색할 때 무한 루프에 빠진다.\
따라서 아무런 체크 없이 무조건적으로 프로토타입을 교체할 수 없도록 \_\_proto__ 접근자 프로퍼티를 통해 프로토타입에 접근하고 교체하도록 구현되어 있다.

**""\_\_proto__ 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다.""**

모든 객체가 \_\_proto__ 접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문에 \_\_proto__ 접근자 프로퍼티를 직접 사용하는 것은 권장하지 않는다.\
다음과 같이 Object.prototyp을 상속받지 않는 객체를 생성할 수도 있기 때문에 \_\_proto__ 접근자 프로퍼티를 사용할 수 없는 경우가 있다.

<img width="569" height="93" alt="스크린샷 2025-09-17 오후 7 30 58" src="https://github.com/user-attachments/assets/f2d53a33-97d6-4425-befe-1d03a17ab81b" />
<img width="544" height="131" alt="스크린샷 2025-09-17 오후 7 31 11" src="https://github.com/user-attachments/assets/bf1b15cb-d181-4701-add3-b3428098d36e" />

따라서 \_\_proto__ 접근자 프로퍼티 대신 프로토타입의 참조를 취득하고 싶은 경우에는 Object.getPrototypeOf 메서드를 사용하고,\
프로토타입을 교체하고 싶은 경우에는 Object.setPrototypeOf 메서드를 사용할 것을 권장한다.

<img width="540" height="243" alt="스크린샷 2025-09-17 오후 7 32 42" src="https://github.com/user-attachments/assets/c1e39a4b-d7c6-4c4a-bed4-ebbb7541b8a7" />
