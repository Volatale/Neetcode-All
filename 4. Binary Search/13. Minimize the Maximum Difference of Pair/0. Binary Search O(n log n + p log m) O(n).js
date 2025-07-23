//* We are given an int[] `nums` and an integer `p`
//* The goal is to find `p` pairs of indices in nums such that the max difference is minimized (among pairs)
//*     - Each index can only appear once amongst the `p` pairs
//*     - The difference of the pair is the absolute value of |pairs[i] - pairs[j]|
//* Return the MINIMUM maximum difference among all `p` pairs
//* By sorting the array we ensure the array exhibits monotonicity
//* It also makes it easier to find the minima and maxima
//*     - nums[0] - nums[n-1] is the maximum possible difference
//*     - And any potential pair inbetween that could be the minimum
//* Since the array is sorted, we can apply a binary search approach
//*     - Left = 0 (minimum)
//*     - Right = nums[n-1] - nums[0]
//*     - Mid repesents the CURRENT maximum distance we are testing
//* If we are able to form `p` pairs using this mid, then we continue (search the left and retain the current mid)
//* Else, we are unable to form `p` pairs, so we need a larger mid (search the right and eliminate the current mid)
function minimizeMax(nums, p) {
  function canMakePairs(maxDifference) {
    let pairs = 0;

    for (let i = 1; i < nums.length && pairs <= p; i++) {
      if (nums[i] - nums[i - 1] <= maxDifference) {
        pairs++;
        i++; //* Avoid reusing the same element (index) again
      }
    }

    //* If true, then we search the left portion
    return pairs >= p;
  }

  //* Sort the array into non-monotonically decreasing order
  nums.sort((a, b) => a - b);

  //* The search space is the range of possible differences
  let left = 0;
  let right = nums[nums.length - 1] - nums[0];

  while (left < right) {
    //* `mid` represents the current "maximum difference" we are testing
    const mid = left + ((right - left) >> 1);

    if (canMakePairs(mid)) {
      right = mid; //* We were successful; optimize by searching the left
    } else {
      left = mid + 1; //* We failed; try a higher maximum difference
    }
  }

  return left;
}

console.log(minimizeMax([10, 1, 2, 7, 1, 3], 2)); //* 1
console.log(minimizeMax([4, 2, 1, 2], 1)); //* 0
console.log(minimizeMax([3, 7, 6, 4, 10, 5], 3)); //* 3

//* Time: O(n log n + n log r) - Where `n` is the length of the array (.sort)
//* The range of possible max differences is nums[n-1] - nums[0] (r)
//* Within each while loop iteration, we perform an O(n) loop in the worst case

//* Space: O(sort) - The memory used scales with the sorting algorithm used
