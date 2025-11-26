# 44장. REST API

RE5T(Representational State Transfer)는 HTTP/1.0과 1.1의 스펙 작성에 참여했고 아파치 HTTP 서버 프로젝트의 공동 설립자인 로이 필딩(Roy Fielding)의 2000년 논문에서 처음 소개되었다.\
발표 당시의 웹이 HTTP를 제대로 사용하지 못하고 있는 상황을 보고 HTTP의 장점을 최대한 활용할 수 있는 아키텍처로서 REST를 소개했고 이는 HTTP 프로토콜을 의도에 맞게 디자인하도록 유도하고 있다.\
REST의 기본 원칙을 성실히 지킨 서비스 디자인을 “RESTful” 이라고 표현한다.
<br>

REST는 HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처고, REST API는 REST를 기반으로 서비스 API를 구현한 것을 의미한다.

## 44.1 REST API의 구성

REST API는 자원(resource), 행위(verb), 표현(representations)의 3가지 요소로 구성된다.\
REST는 자체 표현 구조(self-de-scriptiveness)로 구성되어 REST API만으로 HTTP 요청의 내용을 이해할 수 있다.

<img width="719" height="151" alt="스크린샷 2025-11-26 오후 1 34 05" src="https://github.com/user-attachments/assets/689ebae8-e7ca-4f39-88e0-303f32ee941c" />

<br>

페이로드(payload)는 전송되는 '순수한 데이터'를 뜻한다. 페이로드는 전송의 근본적인 목적이 되는 데이터의 일부분으로 그 데이터와 함께 전송되는 헤더, 메타데이터와 같은 부분은 제외한다.

```
{
    "status":"OK",
    "data": {
        "message":"Hello, world!"
    }
}
 ```
여기서 "Hello, world!"가 클라이언트가 관심을 가지는 페이로드이다. 나머지 부분은 프로토콜 오버헤드다.

## 44.2 REST API 설계 원칙

REST에서 가장 중요한 기본적인 원칙은 두 가지다.

#### 1. URI는 리소스를 표현해야 한다.
URI는 리소스를 표현하는데 중점을 두어야 한다. 리소스를 식별할 수 있는 이름은 동사보다는 명사를 사용한다.\
따라서 이름에 get 같은 행위에 대한 표현이 들어가서는 안된다.

<img width="386" height="147" alt="스크린샷 2025-11-26 오후 2 30 33" src="https://github.com/user-attachments/assets/42f2a4ef-0909-49b0-b9df-c7ec21fee193" />

#### 2. 리소스에 대한 행위는 HTTP 요청 메서드로 표현한다.
HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적(리소스에 대한 행위)을 알리는 방법이다.

<img width="636" height="213" alt="스크린샷 2025-11-26 오후 2 31 41" src="https://github.com/user-attachments/assets/5ee0b739-dd71-4d41-aa9c-8b5dfafb5349" />

리소스에 대한 행위는 HTTP 요청 메서드를 통해 표현하며 URI에 표현하지 않고 HTTP 요청 메서드를 통해 표현한다.

<img width="182" height="120" alt="스크린샷 2025-11-26 오후 2 32 54" src="https://github.com/user-attachments/assets/0fbc1185-1ad3-4c49-b3dd-63a5c8a953ba" />

## 44.3 JSON Server를 이용한 REST API 실습

<img width="731" height="720" alt="스크린샷 2025-11-26 오후 2 44 46" src="https://github.com/user-attachments/assets/cbe723b2-0142-4f29-b5b6-f8acfb1613b5" />

MIME(Multipurpose Internet Mail Extensions 또는 MIME type)은 문서 또는 파일의 타입을 나타낸다.\
원래는 이메일과 함께 첨부 파일을 보낼 때 사용하려고 만들어졌지만 지금은 웹에서 파일을 주고받을 때 타입을 알려주는 표준 방식이 되었다.
<br>

<img width="787" height="155" alt="스크린샷 2025-11-26 오후 2 58 35" src="https://github.com/user-attachments/assets/e5518ee9-6f42-4a40-becd-e5789d507bf5" />
<br>

MIME 타입 구조: `type/subtype`

application: 다른 타입 중 하나에 명시적으로 속하지 않는, 모든 종류의 이진 데이터.\
예) `application/octet-stream`, `application/pdf`, `application/pkcs8`, `application/zip`

audio: 오디오 또는 음악 데이터.\
예) `audio/mpeg`, `audio/vorbis`

example: MIME 타입을 사용하는 방법을 보여주는 예제에서 사용.\
예) `audio/example`

font: 글꼴/서체 데이터.\
예) `font/woff`, `font/ttf`, `font/otf`

image: 이미지.\
예) `image/jpeg`, `image/png`, `image/svg+xml`

model: 3D 객체 또는 화면에 대한 모델 데이터.\
예) `model/3mf`, `model/vrml`

text: 텍스트 형식의 데이터를 가지는 텍스트 전용 데이터.\
예) `text/plain`, `text/csv`, `text/html`, `text/javascript`

video: 비디오 데이터 또는 파일.\
예) `video/mp4`
