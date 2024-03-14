function removeElement(nums, val) {
  let index = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[index] = nums[i]; //* Just overwrite anything that is "val" with the current element
      index++;
    }
  }

  return index;
}

console.log(removeElement([2, 3, 3, 2], 3)); // 2, [2,2,_,_]
console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2)); // 5, [0,1,4,0,3,_,_,_]

//* Time: O(n) - We iterate through the entire array once, so the time taken scales with the input size

//* Space: O(1) - There are no extra auxillary data structures used; we swap in place
//* The space usage does not scale with the input size
