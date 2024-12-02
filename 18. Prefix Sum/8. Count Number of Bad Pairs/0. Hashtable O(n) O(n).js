//! We are applying reverse thinking
//*     - Instead of directly trying to find the bad pairs
//*     - We find the number of GOOD pairs, and DERIVE the number of bad pairs
//* No. of Bad Pairs = Total pairs - No. of Good Pairs
//*     - Total = good + bad
//*     - Bad = total - good

//* The original equation is j - i = nums[j] - nums[i]
//*     - But with that, we have 2 different indices (i, j) on BOTH sides of the equation
//*     - Both i and j exist on both sides at the same time
//! Rearrange the terms to group i and nums[i] and j and nums[j] onto on side
//*     - Use algebraic manipulation to rearrange the equation while retaining equality on both sides
//*     - Subtract nums[j] from both sides (to keep the equation balanced)
//*         - That gives us: j - nums[j] = i - nums[i]
//* Once we have the equation j - nums[j] = i - nums[i]
//!     - The problem is reducible to a classic two-sum problem
//*     - For each index i and element nums[i], determine what i - nums[i] equals
//*         - If we have seen this difference before, we can make GOOD pairs pair with all of the occurrences
function countBadPairs(nums) {
  //* We need two or more elements to make a pair
  if (nums.length <= 1) return 0;

  const totalPairs = (nums.length * (nums.length - 1)) / 2;
  const seen = {}; //* Tracks the differences and their frequency
  let goodPairs = 0;

  for (let i = 0; i < nums.length; i++) {
    //* Rearrange equation to j - nums[j] = i - nums[i]
    const diff = i - nums[i];

    //* We can make a good pair using ALL of the occurrences of this "diff" and nums[i]
    goodPairs += seen[diff] || 0;

    //* Increment frequency of this difference
    seen[diff] = (seen[diff] || 0) + 1;
  }

  //* No. of bad pairs = Total pairs - no. of good pairs
  return totalPairs - goodPairs;
}

console.log(countBadPairs([4, 1, 3, 3])); //* 5
console.log(countBadPairs([1, 2, 3, 4, 5])); //* 0
console.log(countBadPairs([1])); //* 0
console.log(countBadPairs([2, 1])); //* 1

//* Time: O(n) - We iterate through the entire array once - it takes O(n) to find all of the good pairs
//* It takes O(1) to both calculate the total number of pairs, and to calculate the numbr of bad pairs

//* Space: O(n) - In the worst case, there will be "n" differences stored in the hashtable, where "n" = nums.length
