//* To MINIMIZE the difference between two elements
//*     - We need to ensure the numbers are as close together as possible
//* Thus, to MAXIMIZE the difference, we need to do the opposite
//! We can SORT the array and then take adjacent elements
//! The differences are then MONOTONICALLY NON-DECREASING
//* Thus, we have a sorted search space, and can apply binary search
//*     - min difference = 0 (abs means no negative values)
//*     - max difference = nums[-1] - nums[0]
function minimizeMax(nums, p) {
  function canMakePPairs(maxDiff) {
    let pairs = 0;

    //* Form "p" (valid) pairs using adjacent elements
    for (let i = 1; i < nums.length && pairs < p; i++) {
      if (nums[i] - nums[i - 1] <= maxDiff) {
        pairs++;
        i++; //* We can't reuse the same element
      }
    }

    //* Can make AT LEAST p pairs using this max difference?
    return pairs >= p;
  }

  //* Sorting the array lets us MINIMIZE the difference between pairs
  nums.sort((a, b) => a - b);

  //* The range of possible "max differences" we can have
  let left = 0;
  let right = nums[nums.length - 1] - nums[0];

  while (left < right) {
    //* "Mid" represents the current max difference we are testing
    const mid = left + ((right - left) >> 1);

    if (canMakePPairs(mid)) {
      right = mid; //* We were successful; now try to MINIMIZE the max difference
    } else {
      left = mid + 1; //* We need a LARGER max difference
    }
  }

  //* The minimum maximum difference
  return left;
}

console.log(minimizeMax([10, 1, 2, 7, 1, 3], 2)); //* 1
console.log(minimizeMax([4, 2, 1, 2], 1)); //* 0
console.log(minimizeMax([1, 5, 7, 14], 1)); //* 2
console.log(minimizeMax([5, 1, 6, 9], 2)); //* 1

//* Time: O(n log n + n log n) - It takes O(n log n) to sort the input
//* Then, in the worst case, it takes O(n log n) to form the pairs

//* Space: O(sort) - The memory used scales with the sorting algorithm used
