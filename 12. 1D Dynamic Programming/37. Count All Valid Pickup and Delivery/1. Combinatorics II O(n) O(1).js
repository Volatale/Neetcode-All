function countOrders(n) {
  if (n === 1) return 1;

  let ways = 1;
  const MOD = 10 ** 9 + 7;

  for (let i = 1; i <= n; i++) {
    ways = (ways * (2 * i - 1) * i) % MOD;
  }

  return ways;
}

console.log(countOrders(1)); //* 1
console.log(countOrders(2)); //* 6
console.log(countOrders(3)); //* 90

//* Time: O(n) - The loop scales with the input

//* Space: O(1) - We only use constant space
