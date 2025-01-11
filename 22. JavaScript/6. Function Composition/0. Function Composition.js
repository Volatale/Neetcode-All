function compose(functions) {
  return function (x) {
    let result = x;

    for (let i = functions.length - 1; i >= 0; i--) {
      result = functions[i](result);
    }

    return result;
  };
}

console.log(compose([(x) => x + 1, (x) => x * x, (x) => 2 * x]));
console.log(compose([(x) => 10 * x, (x) => 10 * x, (x) => 10 * x]));
console.log(compose([]));

//* Time: O(n) - We have to iterate "n" times where n === functions.length

//* Space: O(1) - We are not using any additional space that scales with input size
