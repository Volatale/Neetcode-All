//* "fn" is an asynchronous functiom, which means it returns a promise by default
//* We call "fn" and store the promise itself within the variable
//!     - Most likely, this callback function (fn) uses setTimeout
//*     - Thus, the promise will either resolve or reject after some time passes
//* Then, we explicitly create our own promise that will call the reject callback after "t" milliseconds
//* Promise.race is used to determine which was faster
//*     - Returns the value if "fnPromise" resolved first
//*     - And rejects with "Time Limit Exceeded" if "fn" were to timeout (took longer than "t" ms)
function timeLimit(fn, t) {
  return async function (...args) {
    //* fn returns a promise, but we don't want to await (that would be synchronous-like)
    const fnPromise = fn(...args);

    //* Create a promise that will activate "rej" after at least "t" milliseconds
    const timerPromise = new Promise((res, rej) => {
      setTimeout(() => rej("Time Limit Exceeded"), t);
    });

    //* Return with the promise value, or a reject (if the fn was not fast enough)
    return Promise.race([fnPromise, timerPromise]);
  };
}

async function sum(a, b) {
  return new Promise((res) => {
    setTimeout(
      (a, b) => {
        res(a + b);
      },
      500,
      a,
      b
    );
  });
}

timeLimit(sum, 1000)(20, 30)
  .then((val) => console.log(val))
  .catch((reason) => console.log(reason)); //* 50

//* This one finishes first despite being called after (200ms < 1000ms)
timeLimit(sum, 200)(20, 30)
  .then((val) => console.log(val))
  .catch((reason) => console.log(reason)); //* "Time Limit Exceeded"
