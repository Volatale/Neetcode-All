//* The goal is to handle multiple range queries
//* Range Sum: Calculate the sum of elements of nums between indices (i, j) inclusive
//*     - sum(i, j) = nums[i] + nums[i + 1] + ... + nums[j]
//* In a brute force manner, we can iterate through the array starting at "i" and ending at "j" (inclusive)
class NumArray {
  constructor(nums) {
    this.nums = nums;
  }

  //* Sum the elements between indices "left" and "right" inclusive
  sumRange(left, right) {
    let sum = 0;

    for (let i = left; i <= right; i++) {
      sum += this.nums[i];
    }

    return sum;
  }
}

const arr = new NumArray([-2, 0, 3, -5, 2, -1]);

console.log(arr.sumRange(0, 2)); //* 1
console.log(arr.sumRange(2, 5)); //* -1
console.log(arr.sumRange(0, 5)); //* -3

//* Time: O(n) - It takes O(1) to construct an instance of NumArray
//* However, each query takes O(n) time to compute

//* Space: O(1) - The memory usage remains constant regardless of input size
//* The instance receives a reference to a (pre-constructed) array
