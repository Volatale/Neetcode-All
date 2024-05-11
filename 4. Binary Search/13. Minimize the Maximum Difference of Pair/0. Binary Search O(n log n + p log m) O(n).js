//* Sort the array to guarantee that the elements are close together in value
//* This allows us to MINIMIZE the difference between each potential pair
//* By sorting, we introduce a monotonic element to the problem
//* The search space is the range of potential differences we can have
//* So that ranges from 0 (because the minimum value is 0), and max value - min value
//* "mid" represents the maximum difference that we are testing
//* If we are able to make "p" pairs with THIS maximum, then "mid" is a potential value
//* Since we sorted the array, [3, 4] would be |3 - 4| = 1, but 4 - 3 ALSO results in 1
//* So we don't HAVE to use absolute values anymore
function minimizeMaximumDifference(nums, p) {
  function canMakePairs(maxDiff) {
    let pairs = 0;

    //* We are told | nums[i] - nums[i + 1] | = the difference
    //* But we ALSO know that the elements are sorted now
    //* [3, 4]: abs(3 - 4) = 1, but 4 - 3 = 1 too, so it works either way
    for (let i = 1; i < nums.length && pairs < p; i++) {
      if (nums[i] - nums[i - 1] <= maxDiff) {
        pairs++;
        i++; //* We paired with the previous element, so don't try this pair again
      }
    }

    //* Can we successfully make p pairs?
    return pairs >= p;
  }

  //* We want to minimize the difference, so sorting means elements are close in value
  nums.sort((a, b) => a - b);

  //* Search space is from 0 to the max - min value (after sorting)
  let left = 0;
  let right = nums[nums.length - 1] - nums[0];

  while (left < right) {
    //* Mid represents the maximum difference we are trying
    let mid = left + ((right - left) >> 1);

    if (canMakePairs(mid)) {
      right = mid; //* Mid was successful; don't eliminate it from the search space
    } else {
      left = mid + 1; //* Mid failed, find a larger max difference
    }
  }

  //* Maximum difference between all pairs
  return left;
}

console.log(minimizeMaximumDifference([10, 1, 2, 7, 1, 3], 2)); //* 1
console.log(minimizeMaximumDifference([4, 2, 1, 2], 1)); //* 0
console.log(minimizeMaximumDifference([3, 7, 6, 4, 10, 5], 3)); //* 3

//* Time: O(n log n + p log m)) - Where "m" is the max(nums)
//* We sort the input, which takes O(n log n) time
//* Then, we do a binary search whose search space scales based on [0 .. max(nums) - nums[0]]
//* Within each binary search iteration, we do an O(n) for loop, but this is dominated by the n log ns

//* Space: O(n) - The inbuilt sorting algorithm probably uses merge sort, so O(n) space
