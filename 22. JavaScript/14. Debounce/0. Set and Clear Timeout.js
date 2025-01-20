//* We might as well repeatedly use the same timer
//* Utilize a closure to retain a reference to the same timer
//* setTimeout will invoke "fn" after "t" milliseconds
//* But if the function is called again before "t" milliseconds
//* Then we need to clear the timer
function debounce(fn, t) {
  let timer = undefined;

  return function (...args) {
    clearTimeout(timer); //* Reset the timer to avoid multiple calls
    timer = setTimeout(() => fn(...args), t); //* Start timer again
  };
}
