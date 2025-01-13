//* Take advantage of the concept of closures
//* All of the (callback) function calls will reference the same memo object
//* We don't know how many arguments are being passed into the function
//* So we convert the arguments into strings
//*     - This allows us to easily check for the existence of a memoized value
function memoize(fn) {
  const memo = {};

  //* This function retains the state of the "memo" object above
  return function (...args) {
    const key = String(args);

    //* Return the memoized value if it exists in the cache
    if (memo.hasOwnProperty(key)) {
      return memo[key];
    }

    return (memo[key] = fn(...args));
  };
}
