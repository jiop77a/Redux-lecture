function SumCalculator() {
  // scope 0
  this.sum = 0;
}

SumCalculator.prototype.addNumbers = function (numbers) {
  // scope 1
  debugger;
  numbers.forEach(function (number) {
    // scope 2
    this.sum += number; // noooo!
  });

  return this.sum;
};

let twan = new SumCalculator();

console.log(twan.addNumbers([1,2,3]));
