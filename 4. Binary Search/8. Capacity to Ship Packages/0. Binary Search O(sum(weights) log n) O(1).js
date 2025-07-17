//* Packages must be shipped within `days` days (constraint)
//*     - The `ith` package has a weight of weights[i]
//* Each `day`, packages are loaded in the order given by weights
//! We cannot load more weight than the maximum capacity of the ship
//* The goal is to return the LEAST weight capacity that still allows us to make the shipment
//*     - This implies optimization
//* Instead of using a brute force approach, we can make some observations
//! We are trying to find the "optimal" (minimum) capacity
//* The capacities are technically sorted in ascending order (monotonic property)
//* Since we want to optimize, and the search space is "sorted"...
//*     - We can apply Binary Search
//* "mid" represents the current capacity we are going to try
//* If we manage to ship within "d" days, then we know at the very least, this "could" be the minimum capacity
//* Otherwise, we need a higher capacity ship
//* The minimum possible capacity is the largest value in the weights array
//*     - Imagine we could only ship a single package every day
//* The maximum possible capacity is the sum of all values in the weights array
//*     - Imagine we had to ship all of the packages within a single day
//*     - The ship must be able to hold the weight of ALL of the packages at once
function shipWithinDays(weights, days) {
  function canShip(capacity) {
    let day = 1;
    let totalWeight = 0;

    for (let weight of weights) {
      //* Greedily assume the ship is big enough
      totalWeight += weight;

      //* Then, if it wasn't, this package is shipped on the next day
      if (totalWeight > capacity) {
        totalWeight = weight;
        day++;
      }
    }

    //* If this is true, the shipment was successful
    return day <= days;
  }

  //* The search space is the range of possible capacities
  let left = Math.max(...weights);
  let right = weights.reduce((acc, curr) => acc + curr, 0);

  while (left < right) {
    //* Mid represents the current capacity we are trying
    const mid = left + ((right - left) >> 1);

    if (canShip(mid)) {
      right = mid; //* We were successful; don't exclude the current capacity
    } else {
      left = mid + 1;
    }
  }

  //* The minimum possible capacity
  return left;
}

console.log(shipWithinDays([2, 3, 5], 2)); //* 5
console.log(shipWithinDays([2, 3, 5, 6], 2)); //* 10
console.log(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)); //* 15
console.log(shipWithinDays([3, 2, 2, 4, 1, 4], 3)); //* 6
console.log(shipWithinDays([1, 2, 3, 1, 1], 4)); //* 3

//* Time: O(sum(weights) log n) - The range of possible capacities is in the range 1 to sum(weights)
//* We eliminate half of the search space every iteration, so the while loop is logarithmic
//* However, it takes O(n) to check if the capacity is enough

//* Space: O(1) - The memory usage remains constant regardless of input size
