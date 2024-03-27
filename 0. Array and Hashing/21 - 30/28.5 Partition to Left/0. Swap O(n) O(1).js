//* Do a lazy swap
//* If nums[i] is less than the bound
//* That means we found an element that needs to be on the left partition of the array
//* After swapping, increment left (because anything to the left of left is sorted)
//* Keep repeating until completion
function partition(nums, bound) {
  let left = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < bound) {
      swap(nums, left, i);
      left++;
    }
  }

  return nums;
}

//* O(1)
function swap(nums, left, right) {
  const temp = nums[left];
  nums[left] = nums[right];
  nums[right] = temp;
}

console.log(partition([10, 7, 8, 1, 2, 5, 6, 11, 4], 10));
console.log(partition([100, 200, 300, 1, 2, 3, 500, 4, 9, 50, 66], 300));

//* Time: O(n) - It takes O(n) time to iterate through the entire array once

//* Space: O(1) - The only space we use is a constant space variable
