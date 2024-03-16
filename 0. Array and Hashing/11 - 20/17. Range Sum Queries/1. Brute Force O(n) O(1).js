//* Start at left
//* Iterate up to right and sum the values
class NumArray {
  constructor(nums) {
    this.nums = nums;
  }

  sumRange(left, right) {
    let sum = 0;

    for (let i = left; i <= right; i++) {
      sum += this.nums[i];
    }

    return sum;
  }
}

const arr = new NumArray([-2, 0, 3, -5, 2, -1]);

console.log(arr.sumRange(0, 2)); // 1
console.log(arr.sumRange(2, 5)); // -1
console.log(arr.sumRange(0, 5)); // -3

//* Time: O(n) - It takes O(n) in the worst case to use sumRange
//* If left is 0, and right is nums.length - 1, then we iterate over the entire array

//* Space: O(1) - The array has been passed to the constructor (so it was pre-constructed)
//* The class merely holds a reference to the array (pass by reference)
//* Therefore the space usage remains constant regardless of input size
