//* Bananas per second = Piles[i] / speed
//* We want to round UP because Koko can't eat a decimal of a banana
//* We could also just subtract from piles[i], the speed and keep doing that while piles[i] > 0
//* But that would take scale worse than just doing division
//* There exists a point in the array that transitions from failed values to successful values
//* Therefore monotonicity exists within the problem statement
//* The search space is between 1 and max(piles) bananas
function kokoEatingBananas(piles, h) {
  function canEatInTime(speed) {
    let hours = 0;

    for (let bananas of piles) {
      //* Koko can't eat a decimal of a banana, so round up
      hours += Math.ceil(bananas / speed);
    }

    //* If hours <= h, we can eat the bananas before the guards get back
    return hours <= h;
  }

  //* The minimum bananas we can eat is 1, the max is the largest pile
  let left = 1;
  let right = Math.max(...piles);

  while (left < right) {
    //* Mid represents the bananas per second speed
    let mid = left + ((right - left) >> 1);

    if (canEatInTime(mid)) {
      right = mid; //* Mid was successful, don't eliminate it
    } else {
      left = mid + 1; //* Mid was not successful, eliminate left portion
    }
  }

  //* Minimum bananas per second
  return left;
}

console.log(kokoEatingBananas([3, 6, 7, 11], 8)); //* 4
console.log(kokoEatingBananas([11], 8)); //* 2
console.log(kokoEatingBananas([30, 11, 23, 4, 20], 5)); //* 30
console.log(kokoEatingBananas([15, 12, 5], 7)); //* 6

//* Time: O(n log (m)) - Where m is the max(piles)
//* The search space ranges from 1 to Math.max(piles)
//* Within each binary search iteration, we do an O(n) iteration through the piles array

//* Space: O(1) - The space usage remains constant regardless of the input size
