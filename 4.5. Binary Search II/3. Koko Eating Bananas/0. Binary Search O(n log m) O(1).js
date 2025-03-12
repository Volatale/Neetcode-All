//! If the pile has MORE than "k" bananas
//*     - That means we need MULTIPLE hours to eat this pile
//*     - We can divide and ROUND up (take the ceil)
//* If hours > k, then we took too long
//*     - Try again, but this time INCREASE "k"
//! The range of possible "k"s is monotonically increasing
//* So we could techncially apply binary search here
//*     Left = The MINIMUM value in piles
//*     Right = The SUM of all the bananas in piles
//* For each "k"
//*     - Track how many hours have passed
//*     - Keep going until hours > h
//* hours += Math.ceil(piles[i] / k)
//*     - Why ceil? Because If we had (7 / 6) = 1.1
//*     - That means we need TWO hours to eat them (round the 1.1 up)
//* return hours <= k
//! Binary Search works because the "k"s are monotonically increasing
//*     - Thus, we have a sorted search space
//*     - If we CAN'T eat the bananas using "k", then try a greater "k"
//*     - Otherwise, we can, so try a smaller "k"
function minEatingSpeed(piles, h) {
  function canEatInHHours(BPH) {
    let hours = 0;

    //* Try eating every banana background
    for (let banana of piles) {
      hours += Math.ceil(banana / BPH);
    }

    //* True if we were successfully able to eat them all in time
    return hours <= h;
  }

  //* The range of possible bananas per hour (BPH)
  let left = 1;
  let right = Math.max(...piles);

  while (left < right) {
    //* The BPH we are testing
    const mid = left + ((right - left) >> 1);

    if (canEatInHHours(mid)) {
      right = mid; //* We were successful, so now try a LOWER speed
    } else {
      left = mid + 1; //* We need to eat MORE bananas per hour
    }
  }

  //* The minimum speed at which we can eat
  return left;
}

debugger;
// console.log(minEatingSpeed([3, 6, 7, 11], 8)); //* 4
// console.log(minEatingSpeed([30, 11, 23, 4, 20], 5)); //* 30
// console.log(minEatingSpeed([30, 11, 23, 4, 20], 6)); //* 23
// console.log(minEatingSpeed([7], 7)); //* 7
console.log(minEatingSpeed([312884470], 312884469));

//* Time: O(n log m) - Where "n" is the number of piles and "m" is the sum of the piles

//* Space: O(1) - The memory usage remains constant regardless of input size
