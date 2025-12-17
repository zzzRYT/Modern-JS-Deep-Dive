## 47.1 에러 처리의 필요성
에러가 발생하지 않는 코드를 작성하는 것은 불가능하다.\
발생한 에러에 대해 대처하지 않고 방치하면 프로그램은 강제 종료된다.

<img width="479" height="214" alt="스크린샷 2025-12-17 오전 11 18 07" src="https://github.com/user-attachments/assets/86bbca5e-f8aa-4aa8-a187-17d3f000720c" />

try...catch 문을 사용해 발생한 에러에 적절하게 대응하면 프로그램이 강제 종료되지 않고 계속해서 코드를 실행시킬 수 있다.

<img width="438" height="210" alt="스크린샷 2025-12-17 오전 11 18 53" src="https://github.com/user-attachments/assets/85165c57-040f-4804-ae45-7fa05dc75282" />
<img width="475" height="70" alt="스크린샷 2025-12-17 오전 11 19 03" src="https://github.com/user-attachments/assets/441cd749-f0b8-45dd-b262-4ad52039459a" />

직접적으로 에러를 발생하지는 않는 예외(exception)적인 상황이 발생할 수도 있다.\
예외적인 상황에 적절하게 대응하지 않으면 에러로 이어질 가능성이 크다.

<img width="742" height="166" alt="스크린샷 2025-12-17 오전 11 22 16" src="https://github.com/user-attachments/assets/04ae19f9-c98b-46d7-9938-62d1f7e3a390" />

위 예제의 `querySelector` 메서드는 DOM에 button 요소가 존재하지 않을때 에러를 발생시키지 않고 null을 반환한다.\
이때 if 문으로 `querySelector` 메서드의 반환값을 확인하거나 단축 평가 또는 옵셔널 체이닝 연산자 ?. 를 사용하지 않으면 다음 처리에서 에러로 이어질 가능성이 크다.

이처럼 에러나 예외적인 상황에 대응하지 않으면 프로그램은 강제 종료될 것이다.\
우리가 작성한 코드에서는 언제나 에러나 예외적인 상황이 발생할 수 있다는 것을 전제하고 이에 대응하는 코드를 작성하는 것이 중요하다.

## 47.2 try...catch...finally 문

기본적으로 에러 처리를 구현하는 방법은 크게 두가지가 있다.\

1. if문이나 단축 평가 또는 옵셔널 체이닝 연산자를 통해 처리하는 방법과 에러 처리 코드를 미리 등록해두고 에러가 발생하면 에러 처리 코드로 점프하는 방법
2. try...catch...finally 문 사용

try...catch...finally 문을 사용하는 방법을 에러 처리(error handling)라고 한다.\
try...catch...finally 문은 다음과 같이 3개의 코드 블록으로 구성된다.

<img width="488" height="204" alt="스크린샷 2025-12-17 오전 11 29 09" src="https://github.com/user-attachments/assets/d1f493f6-de40-44ab-a1b7-7ba60f0f4d26" />

먼저 try 코드 블록이 실행된다.\
이때 try 코드 블록에 포함된 문 중에서 에러가 발생하면 catch 문의 err 변수에 전달되고 catch 코드 블록이 실행된다.\
finally 코드 블록인 에러 발생과 상관없이 반드시 한 번 실행된다.\
try...catch...finally 문으로 에러를 처리하면 프로그램이 강제 종료되지 않은다.

<img width="529" height="359" alt="스크린샷 2025-12-17 오전 11 31 45" src="https://github.com/user-attachments/assets/32b2227c-d782-4bd8-b044-8fb4d9fef276" />
<img width="574" height="65" alt="스크린샷 2025-12-17 오전 11 31 58" src="https://github.com/user-attachments/assets/f1461442-2a0b-4677-95e6-5a994cb87a90" />

## 47.3 Error 객체

Error 생성자 함수는 에러 객체를 생성한다.\
Error 생성자 함수에는 에러 메시지를 인수로 전달할 수 있다.

<img width="338" height="68" alt="스크린샷 2025-12-17 오전 11 32 53" src="https://github.com/user-attachments/assets/c638213b-7526-4571-86ad-cc8f71c166d6" />

Error 생성자 함수가 생성한 에러 객체는 message 프로퍼티와 stack 프로퍼티를 갖는다.\
message 프로퍼티의 값은 Error 생성자 함수에 인수로 전달한 에러 메시지이고,\
stack 프로퍼티의 값은 에러를 발생시킨 콜 스택의 호출 정보를 나타내는 문자열이며 디버깅 목적으로 사용한다.

자바스크립트는 Error 생성자 함수를 포함해 7가지의 에러 객체를 생성할 수 있는 Error 생성자 함수를 제공한다.\
아래 생성자 함수가 생성한 에러 객체의 프로토타입은 모두 Error.prototype을 상속받는다.

<img width="727" height="498" alt="스크린샷 2025-12-17 오전 11 41 45" src="https://github.com/user-attachments/assets/2135918d-cd27-4b62-b01e-09f7ac46808d" />

## 47.4 throw 문

Error 생성자 함수로 에러 객체를 생성한다고 에러가 발생하는 것은 아니다.\
즉, 에러 객체 생성과 에러 발생은 의미가 다르다.

에러를 발생시키려면 try 코드 블록에서 throw 문으로 에러 객체를 던져야 한다.

```
throw 표현식
```

throw 문의 표현식은 어떤 값이라도 상관없지만 일반적으로 에러 객체를 지정한다.\
에러를 던지면 catch 문의 에러 변수가 생성되고 던져진 에러 객체가 할당된다. 그리고 catch 코드 블록이 실행되기 시작한다.

<img width="449" height="198" alt="스크린샷 2025-12-17 오전 11 45 58" src="https://github.com/user-attachments/assets/87ae0faf-b2ee-46ff-b277-b9e0442f6658" />

<br>

<img width="691" height="219" alt="스크린샷 2025-12-17 오전 11 46 39" src="https://github.com/user-attachments/assets/0d279339-c968-446f-8c9a-182c9b3d3adf" />
<img width="597" height="200" alt="스크린샷 2025-12-17 오전 11 46 50" src="https://github.com/user-attachments/assets/52ca31f1-218d-4c24-a8a2-ce70740ef5bb" />


## 47.5 에러의 전파

에러는 호출자(caller) 방향으로 전파된다.\
즉, 콜 스택의 아래 방향(실행 중인 실행 컨텍스트가 푸시되기 직전에 푸시된 실행 컨텍스트 방향)으로 전파된다.

<img width="372" height="444" alt="스크린샷 2025-12-17 오전 11 49 48" src="https://github.com/user-attachments/assets/afaee10e-ecdc-437c-b026-bbff18f673b3" />

baz() -> bar() -> foo() 함수에서 에러를 throw\
이때 foo 함수가 throw한 에러는 다음과 같이 호출자에게 전파되어 전역에서 캐치된다.

<img width="343" height="360" alt="스크린샷 2025-12-17 오전 11 51 49" src="https://github.com/user-attachments/assets/fe317669-0977-4ba6-b8a5-1cdf498685d9" />

이처럼 throw된 에러를 캐치하지 않으면 호출자 방향으로 전파된다.\
throw된 에러를 캐치하여 적절히 대응하면 프로그램을 강제 종료시키지 않고 코드의 실행 흐름을 복구할 수 있다.

주의할 것은 비동기 함수인 setTimeOut이나 프로미스 후속 처리 메서드(`.then()`, `.catch()`, `.finally()`)의 콜백 함수는 호출자가 없다.\
setTimeOut이나 프로미스 후속 처리 메서드의 콜백 함수는 당장 실행되지 않고 태스크 큐나 마이크로태스크 큐에 일시 저장되었다가 콜 스택이 비면 이벤트 루프에 의해 콜 스택으로 푸시되어 실행된다.\
이때 콜백 함수는 이전에 다른 함수에게 호출되어 실행되는 것이 아니라 이벤트 루프에 의해 강제로 콜 스택에 푸시되어 실행된다.\
즉, 콜 스택의 가장 하부에 위치하게 되므로 에러를 전파할 상위 호출자가 존재하지 않는다.
