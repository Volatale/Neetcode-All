//* Use a closure to track the number of arguments that we need
//* And use an array to track the arguments we've received (and how many we have)
//* Currying means we don't need to pass every argument at the same time
//* So it can take up to "n" calls (where n is the number of arguments) to call the original callback
//*     - This is assuming we pass 1 argument per call
//* Since we can pass a variadic number of arguments to the curried function
//*     - We should use rest parameters, and spread those arguments into the array from above
//*     - Any extra arguments will be ignored
//* Once passedArgs.length === n, we can call the original callback
function currying(fn) {
  const n = fn.length;
  const passedArgs = [];

  return function curried(...args) {
    //* Add the arguments we received in this call
    passedArgs.push(...args);

    //* We are missing some arguments; call fn again to pass more
    if (passedArgs.length < n) {
      return curried;
    }

    //* We have all of the arguments; call the original function
    return fn(...passedArgs);
  };
}

console.log(currying((a, b, c) => a + b + c)(10)(20)(30)); //* 60
console.log(currying((a, b) => a * b)(10)(100)); //* 100
console.log(currying((a, b) => a / b)(5)(2)); //* 2.5
