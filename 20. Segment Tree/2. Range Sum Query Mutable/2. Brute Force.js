//* For the query, we can iterate starting from index "left" up to and including "right"
//*     - Simply sum the elements at these indices
//* Then, updating is as simple as nums[index] = val
//* Thus, as far as our oeprations go:
//*     - Our queries take O(n) (because in teh worst case, we iterate over the entire array)
//*     - And updates take O(1) (because we don't have to update the rest of the array)

class NumArray {
  constructor(nums) {
    this.nums = nums;
  }

  //* Sum the elements in the range of indices [left, right] inclusive
  sumRange(left, right) {
    let sum = 0;

    for (let i = left; i <= right; i++) {
      sum += this.nums[i];
    }

    return sum;
  }

  //* The succeeding elements don't rely on nums[index]
  //* So we can directly update the element itself
  update(index, val) {
    this.nums[index] = val;
  }
}

const numArray = new NumArray([1, 3, 5]);
console.log(numArray.sumRange(0, 2)); //* 9
console.log(numArray.update(1, 2));
console.log(numArray.sumRange(0, 2)); //* 8
console.log(numArray.sumRange(0, 0)); //* 1
console.log(numArray.sumRange(1, 1)); //* 2

//* Time:
//*     - sumRange() -> O(n), since in the worst case, we iterate over the entire array
//*     - update() -> O(1), we simply assign a new value to the chosen index

//* Space: O(1) - We simply maintain a reference to an array that already exists
