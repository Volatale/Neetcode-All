function once(fn) {
  //* Take advantage oaf closures
  let called = false;
  let result = undefined;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn(...args);
      return result;
    } else {
      return undefined;
    }
  };
}

console.log(once((a, b) => a - b));
console.log(once((a, b, c) => a + b + c));
console.log(once((a, b, c) => a * b * c));
