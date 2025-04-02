//* Instead of brute forcing, we can use a Segment Tree
//* Segment Trees are specifically useful when we need to perform range queries
//* But they are most helpful when we ALSO have to update elements
//* In our case, updates are not needed, so technically a Segment Tree is overkill
//*     - However, if updates ever were needed, the Segment Tree would be more efficient than a prefix sum array
class SegmentTree {
  constructor(nums) {
    this.n = this.#nextPowerOfTwo(nums.length);
    this.ST = new Array(2 * this.n).fill(0);
    this.#build(nums);
  }

  #nextPowerOfTwo(n) {
    return 1 << Math.ceil(Math.log2(n));
  }

  #build(nums) {
    for (let i = 0; i < this.n; i++) {
      this.ST[i + this.n] = nums[i];
    }

    for (let i = this.n - 1; i >= 0; i--) {
      this.ST[i] = this.ST[i << 1] + this.ST[(i << 1) | 1];
    }
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
}
class NumArray {
  constructor(nums) {
    this.ST = new SegmentTree(nums);
  }

  sumRange(left, right) {
    return this.ST.rangeQuery(left, right);
  }
}

const arr = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log(arr.sumRange(0, 2)); //* 1
console.log(arr.sumRange(2, 5)); //* -1
console.log(arr.sumRange(0, 5)); //* -3
console.log(arr.sumRange(0, 0)); //* -2
