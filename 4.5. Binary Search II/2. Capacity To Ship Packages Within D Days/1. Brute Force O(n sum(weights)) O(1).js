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
function shipWithinDays(weights, days) {
  //* Try every possible capacity and return the first successful ship
  for (let capacity = Math.max(...weights); capacity; capacity++) {
    let success = true; //* Be optimistic until failure
    let daysPassed = 1; //* Start from day 1
    let totalWeight = 0;

    //* Try shipping every package
    for (let weight of weights) {
      //* Load the package onto the ship (greedily)
      totalWeight += weight;

      //* If the weight is too much, we have to wait until the next day
      if (totalWeight > capacity) {
        daysPassed++;
        totalWeight = weight; //* Start new day with current package
      }

      if (daysPassed > days) {
        success = false;
        break;
      }
    }

    //* Found the minimum capacity we need to ship everything
    if (success) return capacity;
  }
}

console.log(shipWithinDays([2, 3, 5], 2)); //* 5
console.log(shipWithinDays([2, 3, 5, 6], 2)); //* 10
console.log(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)); //* 15
console.log(shipWithinDays([3, 2, 2, 4, 1, 4], 3)); //* 6
console.log(shipWithinDays([1, 2, 3, 1, 1], 4)); //* 3

//* Time: O(n * sum(weight)) - In the worst case, there are sum(weight) outer iterations
//* And there are "n" inner iterations

//* Space: O(1) - The memory usage remains constant regardless of input size
