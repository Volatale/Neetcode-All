//* We can optimize the time complexity of query to O(1) using a prefix sum array
//* A prefix sum is defined as: pref_i - pref_j-1
//*     - "pref_i" is the CURRENT prefix
//*         - nums[0] + nums[1] + ... + nums[i])
//*     - "pref_j-1" is some PREVIOUS prefix that we are subtracting from pref_i
//*         - nums[0] + nums[1] + ... + nums[j-1]
//* Thus, since we have a prefix sum array, we can simply answer queries in O(1) time
//*     - Everything is already precomputed; we just apply a formula
//! The main drawback is that now, updates take O(n) time
//*     - Why? Because we PRECOMPUTED the prefix sum array
//*     - Every element AFTER index "i" in the prefix sum array depends on the PREVIOUS values (think DP)
//* Remember, prefix[i] = nums[0] + nums[1] + ... + nums[i]
//*     - The LATER indices rely on the previous indices
//* If we update prefix[2], then elements in the range [3...n-1] ALSO need to be updated
//* In the worst case, we update prefix[0], which means EVERY element ends up being updated (O(n))
class NumArray {
  //* prefix[i] = (nums[0] + nums[1] + nums[2] + ... + nums[i]) inclusive
  constructor(nums) {
    this.nums = nums;
    this.prefix = new Array(nums.length).fill(0);
    this.prefix[0] = nums[0];

    for (let i = 1; i < nums.length; i++) {
      this.prefix[i] = this.prefix[i - 1] + nums[i];
    }
  }

  //* Sum the elements in the range of indices [left, right] inclusive
  sumRange(left, right) {
    //* prefix[left - 1] would take us out of bounds, so just subtract 0, leaving prefix[right]
    if (left === 0) return this.prefix[right];

    //* Range Query = prefix[i] - nums[j - 1]
    return this.prefix[right] - this.prefix[left - 1];
  }

  update(index, val) {
    this.nums[index] = val;

    //* Update every value AFTER prefix[index]
    for (let i = index; i < this.prefix.length; i++) {
      this.prefix[i] = this.prefix[i - 1] + this.nums[i];
    }
  }
}

const numArray = new NumArray([1, 3, 5]);
console.log(numArray.sumRange(0, 2)); //* 9
console.log(numArray.update(1, 2));
console.log(numArray.sumRange(0, 2)); //* 8
console.log(numArray.sumRange(0, 0)); //* 1
console.log(numArray.sumRange(1, 1)); //* 2

//* Time:
//*     - sumRange() -> O(1) -  we simply compute prefix[right] - prefix[left - 1], which takes constant time
//*     - update() -> O(n) - Since prefix[i] depends on the PREVIOUS values of prefix, we have to rebuild the prefix array

//* Space: O(n) - The prefix array's size scales in size with the input size (nums.length)
