//* "Days" is essentially another way to say how many trips we can make
//* We want to try shipping using certain capacities until we are successful
//* Try to find the "lowest" capacity that we can use while still shipping all packages within "days" days

//* Imagine a world where we have ONE package [10] to ship in ONE day (highest weight)
//* Then imagine a world where we have to ship ALL the packages in ONE day (sum)
//* Left = Highest weight package
//* Right = Sum of all packages
function capacityToShipPackages(weights, days) {
  function canShip(capacity) {
    let daysPassed = 1; //* We start on the first day
    let totalWeight = 0;

    //* Try to ship all of the packages
    for (let i = 0; i < weights.length; i++) {
      totalWeight += weights[i]; //* Add the package to the ship

      //* Ship has to make multiple trips
      if (totalWeight > capacity) {
        daysPassed++;
        totalWeight = weights[i];
      }

      //* Can't ship all the packages in time with this capacity
      if (daysPassed > days) return false;
    }

    return true;
  }

  //* If you have to ship a weight of just [10] in ONE day, the minimum has to be 10
  //* Shipping the packages in ONE day means the minimum capacity has to be the sum of all
  let left = Math.max(...weights);
  let right = weights.reduce((acc, curr) => acc + curr, 0);

  while (left < right) {
    //* Mid = "capacity" that we want to try to ship all the packages using
    let mid = left + ((right - left) >> 1);

    if (canShip(mid)) {
      //* Any capacity larger is useless now (but don't eliminate mid, it was SUCCESSFUL)
      right = mid;
    } else {
      left = mid + 1; //* Unable to ship with this capacity, try larger
    }
  }

  return left;
}

console.log(capacityToShipPackages([2, 3, 5], 2)); //* 5
console.log(capacityToShipPackages([2, 3, 5, 6], 2)); //* 10
console.log(capacityToShipPackages([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)); //* 15
console.log(capacityToShipPackages([3, 2, 2, 4, 1, 4], 3)); //* 6
console.log(capacityToShipPackages([1, 2, 3, 1, 1], 4)); //* 3

//* Time: O(sum(weights) * log n) - We are doing a binary search on the search space (O(log n))
//* Within each binary search, we do an O(n) iteration to attempt to ship all the packages
//* In the worst case, we iterate over every element in the input (a successful operation)

//* Space: O(1) - We don't use any space that scales with the input size
