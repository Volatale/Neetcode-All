//* In a brute force manner, start our iteration at index "left"
//* Keep summing nums[i] while "i" <= right
class NumArray {
  constructor(nums) {
    this.nums = nums;
  }

  sumRange(left, right) {
    let sum = 0;

    //* Sum every element in the range
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
console.log(arr.sumRange(0, 0)); //* -2
