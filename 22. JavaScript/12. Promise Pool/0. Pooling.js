function promisePool(functions, n) {
  let activePromises = 0;
  let i = 0;

  return new Promise((res) => {
    const executeNext = () => {
      if (i === functions.length && activePromises === 0) {
        //* All functions have been process, and none are active
        res();
        return;
      }

      //* Process some more promises
      while (activePromises < n && i < functions.length) {
        activePromises++;

        functions[i++]().then(() => {
          //* Promise has resolved by this point, schedule next
          activePromises--;
          executeNext();
        });
      }
    };

    executeNext(); //* Start processing
  });
}

console.log(
  promisePool(
    [
      async () => new Promise((res) => setTimeout(res, 300)),
      async () => new Promise((res) => setTimeout(res, 400)),
      async () => new Promise((res) => setTimeout(res, 200)),
    ],
    2
  )
);

console.log(
  promisePool(
    [
      async () => new Promise((res) => setTimeout(res, 300)),
      async () => new Promise((res) => setTimeout(res, 400)),
      async () => new Promise((res) => setTimeout(res, 200)),
    ],
    5
  )
);

console.log(
  promisePool(
    [
      async () => new Promise((res) => setTimeout(res, 300)),
      async () => new Promise((res) => setTimeout(res, 400)),
      async () => new Promise((res) => setTimeout(res, 200)),
    ],
    1
  )
);
