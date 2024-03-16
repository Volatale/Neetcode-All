//* Build a prefix sum array of the input
//* This way, we can answer queries of any range in O(1) time
//* Instead of doing a loop for each query
class NumArray {
  //* O(n)
  constructor(nums) {
    this.prefixSum = [];

    this.sum = 0;
    for (let i = 0; i < nums.length; i++) {
      this.sum += nums[i];
      this.prefixSum.push(this.sum);
    }
  }

  //* O(1)
  sumRange(left, right) {
    //* This stops out of bounds errors
    if (left === 0) {
      return this.prefixSum[right];
    }

    return this.prefixSum[right] - this.prefixSum[left - 1];
  }
}

const arr = new NumArray([-2, 0, 3, -5, 2, -1]);

console.log(arr.sumRange(0, 2)); // 1
console.log(arr.sumRange(2, 5)); // -1
console.log(arr.sumRange(0, 5)); // -3
debugger;
console.log(arr.sumRange(1, 4)); // -4

//* Time: O(n) - It takes O(n) time to build the numArray since we iterate from index 0 to the end
//* Time: O(1) - But every individual query can be answered in O(1) time since the work has been done beforehand

//* Space: O(n) - We create a new array "prefixSum" whose length is equivalent to the input array "nums"
//* This is the tradeoff we make to be able to answer queries in O(1) time
//* The computation is done ahead of time instead of during each query
