//* The goal is to handle multiple range queries
//* Range Sum: Calculate the sum of elements of nums between indices (i, j) inclusive
//*     - sum(i, j) = nums[i] + nums[i + 1] + ... + nums[j]
//* In a brute force manner, we could just iterate through the array from [i, j]
//*  - However, that means for each query, we'd have to iterate through the array
//* Instead, we can make some observations
//* Successive queries are likely to have overlapping ranges
//* Thus, we can pre-compute the sum of the array
//*     - Create a prefix sum array, and use that to answer each range query
class NumArray {
  constructor(nums) {
    this.prefix = new Array(nums.length).fill(0);
    this.prefix[0] = nums[0];

    for (let i = 1; i < nums.length; i++) {
      this.prefix[i] = this.prefix[i - 1] + nums[i];
    }
  }

  //* sum(i, j) = pref_i - pref_j - 1
  sumRange(left, right) {
    //* There are no elements before index 0, so we subtract 0 from the prefix sum
    if (left === 0) return this.prefix[right];

    return this.prefix[right] - this.prefix[left - 1];
  }
}

const arr = new NumArray([-2, 0, 3, -5, 2, -1]);

console.log(arr.sumRange(0, 2)); //* 1
console.log(arr.sumRange(2, 5)); //* -1
console.log(arr.sumRange(0, 5)); //* -3

//* Time: O(n) - The construction of an instance of NumArray takes O(n) time
//* However, due to the prefix sum array, we can answer each query in O(1) time

//* Space: O(n) - The memory usage scales with the size of the input
//* We create a prefix sum array whose size is equal to the input array
