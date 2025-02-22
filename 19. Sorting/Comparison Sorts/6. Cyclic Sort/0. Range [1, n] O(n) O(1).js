//* All of the elements are in the range [1, n]
//* And there are no duplicates
//* So we can sort each element by ensuring it is stored at index (nums[i] - 1)
function cyclicSort(nums) {
  if (nums.length <= 1) return nums;

  let i = 0;

  //* Range is [1, n], so nums[i] should be stored at index (nums[i] - 1)
  while (i < nums.length) {
    let correctIndex = nums[i] - 1;

    //* nums[0] should store 1, nums[1] should store 2 etc. swap until nums[i] === i - 1
    if (nums[i] !== nums[correctIndex]) {
      [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
    } else {
      i++; //* It IS in the correct position; move on
    }
  }

  return nums;
}

console.log(cyclicSort([1, 5, 2, 3, 4]));
console.log(cyclicSort([3, 1, 2]));
console.log(cyclicSort([1, 2, 3]));
console.log(cyclicSort([4, 3, 2, 1]));
console.log(cyclicSort([5, 1, 2, 3, 4, 9, 8, 6, 7]));

//* Time: O(n) - We process each element at most once

//* Space: O(1) - All of the operations are performed in place
