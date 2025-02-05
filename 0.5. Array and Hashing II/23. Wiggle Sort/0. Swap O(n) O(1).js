//* Even indices hold numbers <= next odd index
//* Odd indices hold numbers >= next even index
//* So if either of these conditions is not met at the current index
//* We need to swap the current and previous
//*     - This will ensure that conditions already met remain met
//*     - And we also fulfill the current indices' conditions too
function wiggleSort(nums) {
  //* There is only one element
  if (nums.length === 1) return nums;

  for (let i = 1; i < nums.length; i++) {
    if (
      (i & 1 && nums[i] < nums[i - 1]) || //* odd nums[i] should be >= nums[i-1]
      ((i & 1) === 0 && nums[i] > nums[i - 1]) //* even nums[i] should be <= nums[i-1]
    ) {
      [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
    }
  }

  return nums;
}

console.log(wiggleSort([3, 5, 2, 1, 6, 4]));
console.log(wiggleSort([10, 9, 11, 12, 15]));
console.log(wiggleSort([5]));

//* Time: O(n) - We iterate over every element in the array

//* Space: O(1) - The space usage remains constant regardless of input size
