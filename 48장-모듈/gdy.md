# 48.모듈

모듈이란 애플리케이션을 구성하는 개별적 요소로서 재사용 가능한 코드 조각을 말한다. 일반적으로 기능 기준 파일단위로 분리하며 모듈은 각각의 파일 스코프(모듈 스코프)를 가질 수 있어야 한다.

파일 스코프를 갖는 변수, 함수, 객체등은 기본적으로 비공개며 스코프를 갖는 모듈의 자산은 캡슐화되어 다른 모듈에서 접근불가하다.


하지만 애플리케이션과 완전 분리되 개별적으로 존재하는 모듈은 재사용이 안되서 의미가 없다. 모듈은 애플리케이션이다 다른 모듈에 의해 재사용되어야 의미가 있으며,
따라서 모듈은 공개가 필요한 자산에 대해 한정적으로 선택적으로 공개가 가능 이를 `export`라고 함

공개된 모듈의 자산은 다른 모듈에서 재사용 가능하고 이를 모듈 사용자라고 한다
모듈 사용자는 모듈이 공개한 자산중 전체 또는 일부를 자신의 스코프로 불러들어 사용할 수 있는데 이를 `import`라고 함


<img width="447" height="167" alt="image" src="https://github.com/user-attachments/assets/4cb9729a-49d1-41a0-8609-d3100c54c4a3" />


## 48.2 자바스크립트와 모듈

js는 웹의 단순 보조용 언어로 개발되어 다른 프로그래밍 언어보다 부족한 부분이 있다. 대표적인게 모듈시스템을 지원하지 않는다는건데
원래 파일 스코프와 `import`, `export`를 지원하지 않았다.

`script`태그를 써서 외부 `js`파일을 로드할 수 있지만 파일마다 독립 스코프를 갖지 않는다.
즉, `script`를 써서 분리해도 하나의 `js`파일이 있는것처럼 동작한다(전역 공유) 따라서 전역변수등이 중복되는 문제가 발생해 모듈구현이 불가능하다.

근데 `js`를 극한으로 온몸 비틀기해서 사용하면서 모듈은 반드시 있어야하는데 그런 제한된 상황에서 나온게 `CommonJS`와 `AMD(Asynchronocus Module Definition)`다.
이로써 모듈시스템은 크게 2가지로 나뉘게 되었고 모듈을 위해선 위 2가지를 구현한 모듈 로더 라이브러리를 써야하는 상황이였다.

### common js

동기방식으로 파일을 불러오는 방식(브라우저에서 쓰면 동기라 멈출수잇음)

### AMD

<img width="728" height="606" alt="image" src="https://github.com/user-attachments/assets/60dad22f-e6e1-42d7-bc00-894b22759358" />

### 48.3 ESM
이런 상황에서 `ES6`에서 클라이언트에서도 작동하는 모듈을 추가했다.
사용법은 `script`태그에 `type=module`어트리뷰트를 추가해 로드된 스크립트가 모듈로서 동작한다.


###
<img width="726" height="117" alt="image" src="https://github.com/user-attachments/assets/6e567157-8b71-49f6-9b78-56fbff84bedf" />

### 48.3.1 모듈 스코프

<img width="681" height="520" alt="image" src="https://github.com/user-attachments/assets/ec14b552-87c6-464c-be0d-c3e0984e0cf8" />

위 예제에서 2개로 분리된 `script`파일은 값을 공유한다.

<img width="718" height="523" alt="image" src="https://github.com/user-attachments/assets/babf8965-a201-4772-9d86-303c33dc27a6" />

모듈로서 분리하면 식별자 참조가 불가능하다.

### 48.3.2 export 키워드

<img width="663" height="349" alt="image" src="https://github.com/user-attachments/assets/8ee99743-9681-4949-8d4e-e6398ab95f91" />

모듈을 외부에 공개해 다른 모듈이 사용할 수 있게 하려면 `export`를 사용한다.

<img width="660" height="152" alt="image" src="https://github.com/user-attachments/assets/f9699f1a-be31-46f8-bb22-f5c9158f7f92" />
<img width="666" height="172" alt="image" src="https://github.com/user-attachments/assets/52a35737-0de2-46d0-8175-6e1256155fe9" />

### 48.3.3 import 키워드

다른 모듈에서 공개한 식별자를 로드하려면 `import`를 사용한다

<img width="677" height="367" alt="image" src="https://github.com/user-attachments/assets/dbc55e95-116d-4ba0-95c2-af07054ba850" />

위 `app.mjs`를 `script`태그로 로드하면 `lib.mjs`는 `app.mjs`의 의존성이기 때문에 굳이 로드하지 않아도 된다.

모듈이 export한 식별자 이름을 하나하나 지정하지 않고 한번에 `import`도 가능하다 이때 `as`로 객체 이름을 지정한다.

<img width="653" height="152" alt="image" src="https://github.com/user-attachments/assets/88fae3a5-be31-4882-9854-dde65f926037" />

<img width="669" height="181" alt="image" src="https://github.com/user-attachments/assets/fda19081-c15b-4652-b69d-fffc47769d5c" />

모듈이 하나의 값만 `export`한다면 `default`키워드를 사용해 이름 없이 하나의 값을 export한다.

<img width="677" height="436" alt="image" src="https://github.com/user-attachments/assets/51ac1897-bba5-44a9-b3a6-ccde695edeef" />



