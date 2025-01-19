//* We might as well repeatedly use the same timer
//* Utilize a closure to retain a refernce to the same timer

function debounce(fn, t) {
  let timer = undefined;

  return function (...args) {
    clearTimeout(timer); //* Reset the timer to avoid multiple calls
    timer = setTimeout(() => fn(...args), t); //* Start timer again
  };
}
