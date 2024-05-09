//* Imagine a world where we have ONE package [10] to ship in ONE day (highest weight)
//* Then imagine a world where we have to ship ALL the packages in ONE day (sum)
//* Left = Highest weight package
//* Right = Sum of all packages

//* Try every capacity, and return the first ship with a capacity that is successful
//* Be as greedy as possible; if you cannot ship within this capacity, increment days
//* "Days" essentially represents the number of trips we have to make
//* Therefore if daysPassed > days, we have failed to ship all packages in "days" days using this capacity
//* So try a ship with a LARGER capacity
function capacityToShipPackages(weights, days) {
  //* If you have to ship ALL of the packages in ONE day
  //* The ship's capacity must be the SUM of all
  let maximum = weights.reduce((acc, curr) => acc + curr, 0);

  let daysPassed = 1;
  let totalWeight = 0;

  //* Try every capacity
  for (let capacity = 1; capacity <= maximum; capacity++) {
    let success = true; //* Be optimistic until failure

    //* Try to ship every weight with this capacity (be greedy)
    for (let weight of weights) {
      totalWeight += weight;

      if (totalWeight > capacity) {
        totalWeight = weight;
        daysPassed++;
      }

      if (daysPassed > days) {
        success = false;
        break;
      }
    }

    if (success) return capacity;

    //* Failed, so reset for the next ship
    daysPassed = 1;
    totalWeight = 0;
  }
}

console.log(capacityToShipPackages([2, 3, 5], 2)); //* 5
console.log(capacityToShipPackages([2, 3, 5, 6], 2)); //* 10
console.log(capacityToShipPackages([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)); //* 15
console.log(capacityToShipPackages([3, 2, 2, 4, 1, 4], 3)); //* 6
console.log(capacityToShipPackages([1, 2, 3, 1, 1], 4)); //* 3

//* Time: O(n * maximum) - For every outer iteration, there can be (at worst), n inner iterations
//* The number of outer loops scales with the SUM of all the weights (capacity required to ship all on the same day)
//* And the inner loops scale with the input size

//* Space: O(1) - The space usage does not scale with the input size
