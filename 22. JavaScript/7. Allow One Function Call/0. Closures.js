//* Take advantage of how closures operate
//* They are used to retain access to state even after a function has already returned
//* Thus, we can use a boolean flag to determine whether or not we can call the function
//* Functions are first class citizens in JavaScript
//*     - This allows us to pass in the parameters to the function in a delayed manner
//*     - We don't need to (immediately) be aware of a function's specific arguments
//*         - It is enough to just have the function be ready to execute
//*         - After which, we can pass in the arguments in our own time
//* Once the (outer) function has been called, the returned function retains the state of "called"
//*     - When we use the callback, we use rest parameters to create a variadic function
//*         - We have no way of knowing how many arguments our function needs to accept
//*     - Then, we set "called" = true
//*     - The closure means the function won't ever be called again using the same variable
function once(fn) {
  //* Take advantage oaf closures
  let called = false;
  let result = undefined;

  //* Functions are first class citizens; pass in the arguments here
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

//* Time: O(1) - Technically the time taken scales with the function's time complexity itself
//* But we don't count that as part of "once"; it is a separate function altogether

//* Space: O(1) - We are not using any additional space that scales with the input size
