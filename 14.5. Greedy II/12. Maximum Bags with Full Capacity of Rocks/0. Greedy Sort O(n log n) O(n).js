//* We want to MAXIMIZE the number of full bags we can get
//*     - Each bag STARTS with some number of rocks
//*     - And each bag has a MAXIMUM capacity it can hold
//* Logically speaking, it makes LESS sense to add rocks to bags FURTHER AWAY from capacity
//*     - Greedily add rocks to bags that are the closest to completion
//*     - This will ensure our choices have the highest chance to lead to value
function maximumBags(capacity, rocks, additionalRocks) {
  //* There are no bags
  if (capacity.length === 0 || rocks.length === 0) return 0;

  let maxCapBags = 0;

  //* Get the number of rocks each bag needs to be max cap and sort by these numbers
  const bags = capacity
    .map((_, i) => capacity[i] - rocks[i])
    .sort((a, b) => a - b);

  //* Distribute rocks among bags
  for (const needed of bags) {
    if (needed === 0) {
      maxCapBags++;
      continue;
    }

    //* We don't have enough rocks to fill the bag
    if (additionalRocks >= needed) {
      additionalRocks -= needed; //* 1 left
      maxCapBags++;
    } else {
      break;
    }
  }

  return maxCapBags;
}

console.log(maximumBags([2, 3, 4, 5], [1, 2, 4, 4], 2)); //* 3
console.log(maximumBags([10, 2, 2], [2, 2, 0], 100)); //* 3
console.log(maximumBags([5, 5, 5], [1, 1, 1], 4)); //* 1
console.log(maximumBags([1], [1], 1)); //* 1

//* Time: O(n log n) - It takes O(n log n) to sort the capacity differences
//* Then, it takes O(n) to iterate through all of them

//* Space: O(n) - There will be "n" capacity differences (one for each pair of capacity[i] - rocks[i])
