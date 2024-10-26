//* We are told to use a counting sort-based approach
//*     - Sorting in the literal sense makes the problem trivial
//* We want to buy the MAXIMUM amount of ice creams possible
//*     - Each ice cream has an equal value (in terms of comparing between them)
//*     - So the easiest thing to do is just buy as many cheaper ice creams as possible
//*         - Only purchase more expensive ones when we absolutely have to
//*
function maxIceCream(costs, coins) {
  //* We don't get any ice creams
  if (coins.length === 0 || coins === 0) return 0;

  let iceCreams = 0;

  //* This gives us our range of costs
  const maxCost = costs.reduce((max, num) => Math.max(max, num), 0);

  //* Track how many times each cost occurs
  const freq = new Array(maxCost + 1).fill(0);

  for (let cost of costs) {
    freq[cost]++;
  }

  //* Purchase ice creams
  for (let i = 0; i < freq.length; i++) {
    if (freq[i] === 0) continue;

    //* In the best case we can buy all of them (costs[i]), otherwise get as many as we can
    const purchases = Math.min(freq[i], Math.floor(coins / i));
    coins -= purchases * i;
    iceCreams += purchases;

    //* If coins - i < 0, then coins (i + 1) < 0 too, so any future ice cream will be too expensive
    if (coins < i) break;
  }

  return iceCreams;
}

console.log(maxIceCream([1, 3, 2, 4, 1], 7)); //* 4
console.log(maxIceCream([10, 6, 8, 7, 7, 8], 5)); //* 0
console.log(maxIceCream([1, 6, 3, 1, 2, 5], 20)); //* 6
console.log(maxIceCream([5, 1, 5, 2, 3, 4, 5, 6], 30)); //* 7

//* Time: O(n + m) - It takes O(n) to find the maximum cost in the costs array
//* It takes O(m) to create the freq array (because the max cost can be greater than n)
//* Populating the frequency array takes O(n), as does purchasing the ice creams

//* Space: O(m) - The freq array scales with the maximum cost in the costs array
//* Everything else uses a constant amount of memory
