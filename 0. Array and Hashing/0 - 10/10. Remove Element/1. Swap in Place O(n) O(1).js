/**
 **     Use Two Pointers
 **     "Index" represents the position of the last known element === val
 **     Check if the current element is equal to val
 **         - If it is, leave "index" where it is; we are going to swap that later
 **     As soon as you find an element !== val, swap nums[i] with nums[index]
 **         - Then increment index (index++)
 **     Keep doing this until we reach the end of the array
 **     The elements === val will be on the rightside of the array
 */
function removeElement(nums, val) {
  let index = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      swap(nums, i, index++);
    }
  }

  return index;
}

function swap(nums, left, right) {
  const temp = nums[left];
  nums[left] = nums[right];
  nums[right] = temp;
  return nums;
}

console.log(removeElement([2, 3, 3, 2], 3)); // 2, [2,2,_,_]
console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2)); // 5, [0,1,4,0,3,_,_,_]

//* Time: O(n) - We iterate through the entire array once, so the time taken scales with the input size

//* Space: O(1) - There are no extra auxillary data structures used; we swap in place
//* The space usage does not scale with the input size
