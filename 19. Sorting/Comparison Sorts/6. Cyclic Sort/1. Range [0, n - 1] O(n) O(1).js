//* All of the elements are in the range [0, n - 1]
//* And there are no duplicates
//* So we can sort each element by ensuring it is stored directly at index i
//!     - In THIS version, we don't subtract 1 from nums[i]
//* Since we need to handle "0", (0 - 1) would be -1, which is out of bounds
//* And the range stops at n - 1, so we simply store each element at nums[i]
function cyclicSort(nums) {
  if (nums.length <= 1) return nums;

  let i = 0;

  //* Range is [0, n-1], so nums[i] should be stored directly at index i (DON'T subtract 1)
  while (i < nums.length) {
    let correctIndex = nums[i];

    //* nums[0] should store 1, nums[1] should store 2 etc. swap until nums[i] === i - 1
    if (nums[i] !== nums[correctIndex]) {
      [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
    } else {
      i++; //* It IS in the correct position; move on
    }
  }

  return nums;
}

console.log(cyclicSort([1, 2, 3, 0])); //* [0, 1, 2, 3]
console.log(cyclicSort([0, 1, 2])); //* [0, 1, 2]
console.log(cyclicSort([5, 1, 2, 3, 4, 0])); //* [0, 1, 2, 3, 4, 5]
console.log(cyclicSort([3, 1, 2, 0])); //* [0, 1, 2, 3]
console.log(cyclicSort([0, 1, 3])); //* [0, 1, 3]

//* Time: O(n) - We process each element at most once

//* Space: O(1) - All of the operations are performed in place
