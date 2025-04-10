//* Addition is commutative, so both the addends can be swapped
//* nums[i] + nums[j] === nums[j] + nums[i]
//*     - The (i < j) condition degrades to just (i !== j)
//! We can sort the array and then use a Two Pointer approach
//* Why does this work?
//*     0  1  2  3  4  5
//*     [0, 1, 7, 4, 4, 5], lower = 3, upper = 6
//*         - [0, 3] = 3
//*         - [0, 4] = 4
//*         - [0, 5] = 5
//*         - [1, 3] = 4
//*         - [1, 4] = 5
//*         - [1, 5] = 6
//! There are 6 fair pairs
//* Now lets try the sorted array version
//*     0  1  2  3  4  5
//*     [0, 1, 4, 4, 5, 7], lower = 3, upper = 6
//*         - [0, 2] = 4
//*         - [0, 3] = 4
//*         - [0, 4] = 5
//*         - [1, 2] = 5
//*         - [1, 3] = 5
//*         - [1, 4] = 6
//! There are STILL 6 fair pairs
//! Sorting the array does not change the number of fair pairs
//* It only changes WHAT the pairs are
//* Since we sorted, the array is now monotonically increasing left to right
//* So we can use two pointers to narrow down the maximum valid subarray
//* All of the elements within this subarray when paired together create fair pairs
//*     - So fairPairs += right - left
//*     - We don't have to subtract 1 since we already did that when finding the valid range
//*         - For a valid array of 3 elements, we can create TWO pairs, not three
function countFairPairs(nums, lower, upper) {
  function countLess(val) {
    let pairs = 0;

    //* The search space is the array itself
    let left = 0;
    let right = nums.length - 1;

    //* Find the MAXIMUM valid subarray such that nums[left] + nums[right] <= val
    while (left < right) {
      //* The sum is too large, find a smaller sum
      while (left < right && nums[left] + nums[right] > val) {
        right--;
      }

      //* All of the elements within (left, right) create fair pairs
      pairs += right - left;
      left++;
    }

    return pairs;
  }

  //* Sort the array so we can use a two pointer approach
  nums.sort((a, b) => a - b);

  //* Pairs that fit ExactlyWithinRange(k) = atMost(k) - atMost(k - 1)
  //* There are lots of duplicate pairs we count, so eliminate them
  return countLess(upper) - countLess(lower - 1);
}

console.log(countFairPairs([0, 1, 7, 4, 4, 5], 3, 6)); //* 6
console.log(countFairPairs([1, 7, 9, 2, 5], 11, 11)); //* 1
console.log(countFairPairs([1, 2, 3, 4], 0, 10)); //* 6

//* Time: O(sort) - The sorting step probably takes O(n log n) on average (depending on the algorithm used)
//* The countLess() has a time complexity of O(n), since in the worst case, we iterate over every element in nums

//* Space: O(sort) - The memory used depends on the sorting algorithm used (merge -> O(n), quick -> O(log n))
