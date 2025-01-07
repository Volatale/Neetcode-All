//* The problem inherently involves the use of closures
//* We need to return a function that has a reference to the original input
//* Create a "snapshot" of the value intialized to "n"
//* Then increment that snapshot at the end of each call
function createCounter(n) {
  return function () {
    return n++;
  };
}
