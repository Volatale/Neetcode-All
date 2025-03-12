//* Maximize the number of packages shipped per day
//* Minimize the number of days needed to ship all the packages
//* To INCREASE the number of packages shipped (on average):
//*     - Increase the capacity of the ship
//* To DECREASE the number of days needed:
//*     - Increase the number of packages shipped per day
//! So all in all, increasing the capacity is the optimal decision to make
//*     - Decreasing the capacity does not help us in any way (if we increase monotonically)

//* We can try shipping every package using every possible capacity
//*     - Then return the FIRST capacity that lets us ship everything
//! If we day > days, increase the capacity (break out of the loop)
//! Whenever totalWeight > capacity, increase the day
//*     - We can't ship any more packages on this day
//*     - Weight is "technically" reset back to 0 since its effectively a new ship
//* Note that we cannot "break up the packages"
//*     - If capacity = 6 and we have [4, 5, 6]
//*     - We are NOT allowed to subtract 2 from the 5 weight package and add it to the 4 weight package

//* Since the capacities are MONOTONICALLY INCREASING, we can use binary search to eliminate most possibilities
//* The range of capacities is given as follows:
//*     - The minimum ship capacity is the maximum value in weights
//*     - The maximum ship capacity is the SUM of all of the weights (if we have to ship all the packages in 1 day)
function shipWithinDays(weights, days) {
  function canShip(capacity) {
    let daysPassed = 1;
    let totalWeight = 0;

    //* Try shipping every package within "days" days using a ship of "capcity" capacity
    for (let weight of weights) {
      totalWeight += weight;

      //* The weight is too much; wait until the next day to ship this package
      if (totalWeight > capacity) {
        daysPassed++;
        totalWeight = weight;
      }

      if (daysPassed > days) {
        return false;
      }
    }

    //* Successfully shipped all of the packages using the current capacity
    return true;
  }

  //* The range of possible capacities
  let left = Math.max(...weights);
  let right = weights.reduce((total, weight) => total + weight, 0);

  while (left < right) {
    //* "Mid" represents the current capacity we are trying
    const mid = left + ((right - left) >> 1);

    if (canShip(mid)) {
      right = mid; //* Try a ship with a LOWER capacity (but don't eliminate this capacity)
    } else {
      left = mid + 1; //* We need a ship with a HIGHER capacity
    }
  }

  //* The minimum capacity needed to ship all the packages within "days" days
  return left;
}

console.log(shipWithinDays([2, 3, 5], 2)); //* 5
console.log(shipWithinDays([2, 3, 5, 6], 2)); //* 10
console.log(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)); //* 15
console.log(shipWithinDays([3, 2, 2, 4, 1, 4], 3)); //* 6
console.log(shipWithinDays([1, 2, 3, 1, 1], 4)); //* 3

//* Time: O(n log n) - The search space is eliminated by half each outer iteration
//* Within each iteration, we iterate over the weights array, which takes O(n) in the worst case

//* Space: O(1) - The memory usage remains constant regardless of input size
