//* We need to track what the timer is
//* And we also need to track the last set of arguments passed in
//* The function should be immediately callable
//*     - So timer should be initialized to "null"
//* After calling, start the throttle timer
//*     - If lastArgs is not false (not null), we've received arguments
//*         - This is done to avoid calling "fn" with no arguments
//*     - After calling, set lastArgs to null, and set timer to null as well
//*         - The most recent set of arguments has already been used
//*         - We should be able to immediately call the function again since the timer is done
//* If the timer is NOT null, the function has been called and the timer is not finished
//*     - We need to overwrite the last set of arguments passed in
//*         - So lastArgs = args
//*     - Now, when "fn" is called, we will use THIS set of arguments instead of the previous set
function throttle(fn, t) {
  let timer = null;
  let lastArgs = null;

  return (...args) => {
    if (timer === null) {
      //* Call the function immediately
      fn(...args);

      //* Start throttle timer
      timer = setTimeout(() => {
        if (lastArgs) {
          //* Call function with last stored arguments
          fn(...lastArgs);
          lastArgs = null; //* We just used them, so reset
        }

        timer = null; //* Reset the timer (function has been called)
      }, t);
    } else {
      //* Overwrite the (current) arguments with the newest set
      lastArgs = args;
    }
  };
}

function sum(a, b) {
  console.log(a, b);
}

const throttledSum = throttle(sum, 2000);
throttledSum(20, 30); //* 20 30
throttledSum(500, 300); //* Arguments updated
throttledSum(1000, 1); //* Arguments updated
throttledSum(500, 300); //* Arguments updated
throttledSum(30, 60); //* 30 60
