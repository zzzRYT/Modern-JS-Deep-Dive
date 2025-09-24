const person = {
  name: 'Lee',
  foo(callback) {
    // 1.
    setTimeout(callback, 100);
  },
};

person.foo(() => {
  console.log(`Hi! my name is ${person.name}`); // 2.
  // Hi! my name is Lee
});
