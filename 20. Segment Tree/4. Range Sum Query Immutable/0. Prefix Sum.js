//* Instead of iterating from left to right (inclusive) for every call to sumRange
//* We can simply use a prefix sum array
//*     - prefix[i] = nums[0] + nums[1] + ... + nums[i]
//* The following formula can then be used to calculate the sum between any given (valid) range:
//*     - sum(left, right) = prefix[i] - prefix[j-1]
//* prefix[i] give us the cumulative sum from index 0 all the way up to index "i" (inclusive)
//* prefix[j-1] is whatever needs to be SUBTRACTED from prefix[i] (since prefix[i] may be overestimating)
//* The result is the sum of elements in the range [left, right]
class NumArray {
  constructor(nums) {
    //* prefix[i] = nums[0] + nums[1] + ... + nums[i]
    this.prefix = new Array(nums.length).fill(0);
    this.prefix[0] = nums[0];

    for (let i = 1; i < nums.length; i++) {
      this.prefix[i] = this.prefix[i - 1] + nums[i];
    }
  }

  sumRange(left, right) {
    //* left - 1 would take us out of bounds, so we essentially subtract 0
    if (left === 0) return this.prefix[right];

    return this.prefix[right] - this.prefix[left - 1];
  }
}

const arr = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log(arr.sumRange(0, 2)); //* 1
console.log(arr.sumRange(2, 5)); //* -1
console.log(arr.sumRange(0, 5)); //* -3
console.log(arr.sumRange(0, 0)); //* -2
