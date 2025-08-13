# 02장 - 자바스크립트란

## 2.2 자바스크립트의 표준화

- 처음에는 여기저기서 만들어서 사용하니깐 `크로스 브라우징`문제가 생김 그래서 표준을 만든게 `ECMAScript`이다.

## 2.3 자바스크립트의 역사와 성장

### 렌더링

렌더링이란 HTML, CSS, Javascript로 작성된 문서를 해석해서 브라우저에 시각적으로 표현하는 것을 말한다.

## 2.3.1 Ajax

비동기 방식으로 서버로부터 데이터를 받아와 부분적으로 렌더링하는 방식을 의미

```js
// server.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const posts = [
    { id: 1, title: "첫 번째 글" },
    { id: 2, title: "두 번째 글" },
  ];

  // 서버에서 HTML 직접 생성
  let html = `
    <html>
      <head><title>게시판</title></head>
      <body>
        <h1>게시글 목록</h1>
        <ul>
          ${posts.map((p) => `<li>${p.title}</li>`).join("")}
        </ul>
      </body>
    </html>
  `;
  res.send(html);
});

app.listen(3000, () => console.log("http://localhost:3000"));
```

```js
// server.js
const express = require("express");
const app = express();

app.use(express.static("public")); // 정적 HTML, JS 제공

app.get("/api/posts", (req, res) => {
  const posts = [
    { id: 1, title: "첫 번째 글" },
    { id: 2, title: "두 번째 글" },
  ];
  res.json(posts);
});

app.listen(3000, () => console.log("http://localhost:3000"));
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>AJAX 게시판</title>
  </head>
  <body>
    <h1>게시글 목록</h1>
    <ul id="post-list"></ul>

    <script>
      fetch("/api/posts") // AJAX 요청
        .then((res) => res.json())
        .then((posts) => {
          const list = document.getElementById("post-list");
          posts.forEach((post) => {
            const li = document.createElement("li");
            li.textContent = post.title;
            list.appendChild(li);
          });
        });
    </script>
  </body>
</html>
```

이 부분을 보면서 왜 php가 오래된 개발자들 사이에서 유행했고, 많이 사용되었는지 조금은 이해할 수 있었던 것 같습니다. 초기 프로그래머에게는 프론트 라는 구분이 명확하지 않았기 때문에, 서버에서 전달한 데이터를 그대로 보여줄 수 있는 구조가 익숙하지 않았을까 하는 생각을 했습니다.

## 2.3.4 Node.js

2009년 라이언 달이 발표한 Node.js는 구글 V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임 환경이다.

Node.js는 브라우저환경 뿐 아니라, 다른 환경에서 동작할 수 있도록 자바스크립트 엔진을 브라우저부터 독립시킨 자바스크립트 실행환경이다.

> 주로 서버 개발에 사용됨, 그에 맞는 모듈, 파일시스템, HTTP등 빌트인 내장 API를 제공

Node.js는 `비동기 I/O`기능을 지원, `단일스레드` `이벤트루프`기반으로 동작해 요청에 대한 처리 능력이 좋다.

## 2.5 자바스크립트의 특징

웹 브라우저에서 동작하는 유일한 프로그래밍 언어

별도의 컴파일 작업을 수행하지 않는 `인터프리터 언어`
