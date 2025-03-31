class SegmentTree {
  constructor(size) {
    this.n = size;
    this.ST = new Array(2 * size).fill(0);
  }

  rangeQuery(left, right) {
    left += this.n;
    right += this.n;

    let sum = 0;

    while (left <= right) {
      if (left & 1) {
        sum += this.ST[left++];
      }

      if ((right & 1) === 0) {
        sum += this.ST[right--];
      }

      left >>= 1;
      right >>= 1;
    }

    return sum;
  }

  pointUpdate(i, val) {
    i += this.n;

    this.ST[i] += val;

    while (i > 1) {
      i >>= 1;
      this.ST[i] = this.ST[i << 1] + this.ST[(i << 1) | 1];
    }
  }
}

//* We need to count the number of subarrays such that their sums are in the range [lower, upper]
//* This "could" be done by checking every subarray individually, however, that is inefficient
//! Instead, we can utilize a combination of Prefix Sums and a Segment tree
//* Define a prefix sum array prefix[i]
//*     - prefix[i] = sum(nums[0...i])
//* Now we can reframe the problem:
//*     - Find all pairs (i, j) where lower <= prefix[j] - pref[i] <= upper
//*     - In other words, the difference between pref[j] and pref[i] is within the valid range
//* Rearranging this gives us:
//*     - prefix[j] - upper <= prefix[i] <= prefix[j] - lower
//! How does the above rearranging work?
//*     - Start with the following: lower <= pref[j] - pref[i] <= upper
//*         - We want to ISOLATE pref[i], so subtract pref[j] from all sides of the inequality
//*     - lower - pref[j] <= pref[j] - pref[i] - pref[j] <= upper - pref[j]
//*         - This simplifies to: lower - pref[j] <= -pref[i] <= upper - pref[j]
//*     - Now, we have -pref[i], but we want this to be positive
//*         - Multiply all the sides of the inequality by -1 to reverse the directionality
//*     - This gives us: -(lower - pref[j]) >= pref[i] >= -(upper - pref[j])
//*         - But now we need to get rid of the negatives
//*     - Distribute the negative sign (apply negatives inside the parentheses)
//*         - pref[j] - lower >= pref[i] >= pref[j] - upper
//!     - Flip the order for standard form (inequalities read more naturally when written increasing order)
//*         - pref[j] - upper <= pref[i] <= pref[j] - lower
//! For each prefix[j] (value in the prefix array)
//*     - Count all prefix[i] values that fall into the range
//*     - [prefix[j] - upper, prefix[j] - lower]
//* Prefix sums can be large and sparse, so we should COMPRESS them into a smaller range
//*     - pref[j]
//*     - pref[j] - lower
//*     - pref[j] - upper
//* Sort and assign indices to these values in compressed
//*     - This allows us to map real values to small indices
//*     - Ultimately, this is what enables the use of a Segment Tree
//! Why do we need coordinate compression?
//*     - Prefix sum vaues can be vary large, or even negative
//*         - Using them directly in a Segment Tree (which operates on a small index range) can be impractical
//*     - Instead of using their actual values, we COMPRESS them into a small range, while preserving order
//! We use a Segment Tree to track the FREQUENCY of seen prefix sums
//*     - pointUpdate(index, 1)
//*         - Whenever we process prefix[j], increment its count in the tree
//*     - rangeQuery(left, right)
//*         - Before inserting prefix[j], count how many prefix[i] values exist in the valid range
//* Putting everything together:
//*     - Build prefix sum array
//*     - Compress values using coordinate compression
//*     - Iterate through the prefix sums
//*         - Query the Segment tree for values in the range [prefix[j] - upper, prefix[j] - lower]
//*         - Add prefix[j] to the Segment Tree
function countRangeSum(nums, lower, upper) {
  //* prefix[i] = sum(nums[0..i] inclusive)
  const prefix = new Array(nums.length + 1).fill(0);

  for (let i = 1; i <= nums.length; i++) {
    prefix[i] = prefix[i - 1] + nums[i - 1];
  }

  //* We need to perform coordinate compression
  const sortedNums = new Set();

  //* The queries are in the range [prefix[j] - upper, prefix[j] - lower]
  for (let sum of prefix) {
    sortedNums.add(sum);
    sortedNums.add(sum - lower);
    sortedNums.add(sum - upper);
  }

  const sortedArray = [...sortedNums].sort((a, b) => a - b);

  //* Maps the original values to their compressed indices
  const compressed = {};

  sortedArray.forEach((num, index) => (compressed[num] = index));

  //* Tracks the frequency of seen prefix sums
  const ST = new SegmentTree(sortedArray.length);
  let subarrays = 0;

  //* Count the number of valid subarrays
  for (let sum of prefix) {
    const left = compressed[sum - upper];
    const right = compressed[sum - lower];

    //* No. of Valid Subarrays in the above range
    subarrays += ST.rangeQuery(left, right);

    //* Add the current subarray to the above count
    ST.pointUpdate(compressed[sum], 1);
  }

  return subarrays;
}

console.log(countRangeSum([-2, 5, -1], -2, 2)); //* 3
console.log(countRangeSum([1, 2, 3, 4], 0, 10)); //* 10
console.log(countRangeSum([0], 0, 0)); //* 1

//* Time: O(n log n) - Ultimately, sorting the set takes O(n log n)
//* Then, we iterate through the prefix array and for each element, we perform O(log n) operations

//* Space: O(n) - The memory usage scales with the size of the input (nums.length)
