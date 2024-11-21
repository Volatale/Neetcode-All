//* this.prefixSum[right] includes the sum of everything up to and including right
//* this.prefixSum[left] is the same, but up to and including left
//* So "left - 1" lets us cut off the stuff we don't want
//* Remember, subtraction gives us the "difference" between two values
//*     - this.prefixSum[right] - this.prefixSum[left - 1]
//*     -
class NumArray {
  constructor(nums) {
    this.prefixSum = new Array(nums.length).fill(0);
    this.prefixSum[0] = nums[0];

    //* Build the prefix sum array
    for (let i = 1; i < nums.length; i++) {
      this.prefixSum[i] = this.prefixSum[i - 1] + nums[i];
    }
  }

  //* pref[right] >= pref[left], so we can subtract safely
  sumRange(left, right) {
    //* If left is 0, we don't need to subtract at all
    if (left === 0) return this.prefixSum[right];

    //* left - 1 because that "cuts off" everything BEFORE left (we want [left, right], not [left + 1, right])
    return this.prefixSum[right] - this.prefixSum[left - 1];
  }
}

const arr = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log(arr.sumRange(0, 2)); //* 1
console.log(arr.sumRange(2, 5)); //* -1
console.log(arr.sumRange(0, 5)); //* -3
console.log(arr.sumRange(4, 5)); //* 1

//* Time: O(n) - It takes O(n) to intialize an NumArray instance
//* But after that, we can answer range queries in constant time (O(1))

//* Space: O(n) - We create a prefix array whose length scales proportionally with the input's length
