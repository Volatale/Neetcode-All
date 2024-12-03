//* Rearrange the equation
//*     - nums[i] + rev(nums[j]) == nums[j] + rev(nums[i])
//!     - nums[j] - rev(nums[j]) == nums[i] - rev(nums[i])
//* This allows us to reduce the problem to a two-sum-like problem

//* Track differences that we have seen thus far using a hashtable
//*     - The keys are the differences themselves, and the values are the frequency of that difference
//* Since we want two different indices (i, j)
//*     - The i and nums[i] being used in a pair does NOT share an index with the previous (hashtable) element
//* We want the TOTAL number of pairs, we can pair this element with EVERY occurrence of the same difference
//*     - Like I said, all of the previous differences will be using a different index
//*     - So there cannot be any incorrect overlappings or pairings
//! This problem essentially follows the same train of thought as "Count Number of Bad Pairs"
//*     - We rearranged the equation to allow for an easier time solving
//*     - The use of a hashtable allows us to avoid recomputations
//*         - Instead we compute each difference ONCE, then we try to find identical differences later
function countNicePairs(nums) {
  //* We need at least two elements to form a pair
  if (nums.length <= 1) return 0;

  const seen = {}; //* Tracks the differences and their frequencies
  let pairs = 0;

  //* Rearrange the formula to get nums[j] - rev(nums[j]) == nums[i] - rev(nums[i])
  for (let i = 0; i < nums.length; i++) {
    const diff = nums[i] - rev(nums[i]);

    //* We can pair nums[i] with every other number that had the same difference
    pairs += seen[diff] || 0;

    //* Increment occurrence of this difference
    seen[diff] = (seen[diff] || 0) + 1;
  }

  return pairs % (10 ** 9 + 7);
}

function rev(n) {
  //* There is nothing to reverse
  if (n === 0) return 0;

  let reversed = 0;

  //* In base 10, we mod by 10 to get the last digit (build number using place value)
  while (n > 0) {
    reversed = reversed * 10 + (n % 10);
    n = Math.floor(n / 10);
  }

  return reversed;
}

console.log(countNicePairs([42, 11, 1, 97])); //* 2
console.log(countNicePairs([13, 10, 35, 24, 76])); //* 4
console.log(countNicePairs([1, 2, 3, 4])); //* 6
console.log(countNicePairs([5, 2, 6, 9, 1, 4])); //* 15
console.log(countNicePairs([2, 1, 2])); //* 3
console.log(countNicePairs([1, 1, 1, 1, 1])); //* 10

//* Time: O(n * log10(n)) - We are performing a for loop that scales with the size of the input
//* Within each iteration, rev takes O(log10(n)), so n log n

//* Space: O(n) - In the worst case, every index has a unique "difference"
//* So the number of keys/values scales with the input size
