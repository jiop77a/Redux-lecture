function Counter() {
  let count = 1;

  return () => count++;
}

let counter = new Counter();
console.log(counter()); // => 1
console.log(counter()); // => 2
counter.count; // undefined
