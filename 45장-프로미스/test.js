let g = 0;
//
// 비동기 함수인 setTimeout 함수는 콜백 함수의 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당하지 못한다
setTimeout(() => {
  g = 100;
}, 0);

setTimeout(() => {
  console.log(g);
}, 1);

console.log(g); // 0
