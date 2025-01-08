function createCounter(init) {
  let count = init;

  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => (count = init),
  };
}

const counter1 = createCounter(5);

//* Time: O(1)

//* Space: O(1)
