//* Scan the array and fix triplets going forward AND backward
//* If we avoid going backward some inputs will fail
//*     - For example: [1, 2, 3, 4, 5, 6] would fail.
//*     - [2, 4, 6] is an invalid triplet
//* And that invalid triplet exists AFTER the forward pass
function rearrangeArray(nums) {
  //* Fix triplets going forward
  for (let i = 1; i < nums.length - 1; i++) {
    if ((nums[i - 1] + nums[i + 1]) / 2 === nums[i]) {
      swap(nums, i + 1, i);
    }
  }

  //* Fix triplets going backwards
  for (let i = nums.length - 2; i > 0; i--) {
    if ((nums[i - 1] + nums[i + 1]) / 2 === nums[i]) {
      swap(nums, i - 1, i);
    }
  }

  return nums;
}

function swap(nums, left, right) {
  const temp = nums[left];
  nums[left] = nums[right];
  nums[right] = temp;
}

console.log(rearrangeArray([1, 2, 3, 4, 5])); //* [1, 5, 2, 4, 3]
console.log(rearrangeArray([1, 2, 3, 4, 5, 6])); //* [1, 3, 4, 2, 6, 5]
console.log(rearrangeArray([6, 2, 0, 9, 7])); //* [0, 9, 2, 7, 6]

//* Time: O(n) - We do two passes through the entire array
//* O(n) + O(n) = O(2n) -> O(n) since Big O Notation simplifies

//* Space: O(1) - We create a new array that has the same size as the input
