class SegmentTree {
  constructor(size) {
    this.n = size;
    this.ST = new Array(2 * size).fill(0);
  }

  rangeQuery(left, right) {
    left += this.n;
    right += this.n;

    //* No. of Elements in the range [0, val - 1]
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

//* We need to know how many elements AFTER nums[i] are smaller than nums[i]
//* In a brute force manner, we recompute the same set of values multiple times
//* Instead of a brute force approach, we can use a Segment Tree approach
//* Dynamic Programming won't work here since we don't have a natural state transition
//* The segment tree tracks the number of elements AFTER index "i" that are LESS than nums[i]
//* So for every nums[i], we can easily perform a range query
//* Imagine we have an array like [3, 2, 1]
//* Iterate right to left (because we want elements to the right)
//*     - In other words, start at index n - 1 (2)
//*- And answer the question: "How many elements are SMALLER than nums[i]?"
//*         - Sum up the count, then
//*         - Add a count to "1" in the segment tree
//*             - This means the number 1 has occured once
//*             - Thus, when we next perform a range query, we can consider the current element in the count
//! However, we have a problem:
//*     - -10^4 <= nums[i] <= 10^4: nums[i] can be negative
//! We cannot simply take nums[i] to be the index in the segment tree
//*     - Segment Trees are not suited to handle negative indices
//* Thus, we need to apply coordinate compression
//*     - Create a set of the unique elements in nums
//*     - Map them to an index (and increment by 1 for each)
//* This allows us to work with both negative AND positive values
//*     - And has the added benefit of being more memory efficient
//*     - Imagine if nums[i] could be 10^9, we'd have to create a Segment Tree of that size, which is impossible
//* Since we iterate right to left, we can answer our queries like so:
//!     - count[i] = ST.rangeQuery(0, val - 1)
//* Our Segment Tree operates on compressed indices (val = compressed[nums[i]]), not original values (nums[i])
//* So we're really asking "How many elements have we found in the range [0, val - 1]"
//*     - Then we get the sum of all of those elements
//*     - After, we increment val by 1 since THIS element may count for the next query
function countSmaller(nums) {
  //* Coordinate Compression -> Map unique values to indices
  let sorted = [...new Set(nums)].sort((a, b) => a - b);

  const compressed = {};
  sorted.forEach((val, i) => (compressed[val] = i));

  //* counts[i] = No. of Elements AFTER nums[i] that are SMALLER
  const counts = new Array(nums.length).fill(0);
  const ST = new SegmentTree(sorted.length);

  //* For each element (right to left), how many elements are smaller than it (to the right)?
  for (let i = nums.length - 1; i >= 0; i--) {
    const val = compressed[nums[i]];
    counts[i] = ST.rangeQuery(0, val - 1); //* No. of Elements in range [0..val - 1]
    ST.pointUpdate(val, 1); //* Increment the count of elements at (compressed) index "val"
  }

  return counts;
}

console.log(countSmaller([5, 2, 6, 1])); //* [2, 1, 1, 0]
console.log(countSmaller([-1])); //* [-1]
console.log(countSmaller([-1, 0])); //* [0, 0]
console.log(countSmaller([1, 2, 3])); //* [0, 0, 0]
console.log(countSmaller([3, 2, 1])); //* [2, 1, 0]
console.log(countSmaller([1, 5, 2, -1, 2, 3])); //* [1, 4, 1, 0, 0, 0]

//* Time: O(n log n) - The time complexity scales with the time needed to perform the sort
//* Then, for each element, we do two O(log n) operations (range query and point update)

//* Space: O(n) - The memory usage scales with the input size
