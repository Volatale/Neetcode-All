//* We want the first "k" elements to be unique
//* "k" in this case represents the number of unique elements in the array
//* So "left + 1" is the position where the next unique element should be placed
//* Right progresses forward until nums[left] !== nums[right]
function removeDuplicates(nums) {
  let left = 0;
  let right = 1;

  let swaps = 1; //* Start at one because we can have at minimum 1 element

  while (right < nums.length) {
    //* Move right to a position where nums[left] and nums[right] are not equal
    while (nums[left] === nums[right]) {
      right++;
    }

    //* Make sure we are still within the bounds of the array
    if (left + 1 < nums.length && right < nums.length) {
      nums[left + 1] = nums[right];
      right++;
      swaps++;
    }

    left++;
  }

  return swaps;
}

console.log(removeDuplicates([1, 1, 2])); //* 2
console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])); //* 5
console.log(removeDuplicates([0, 1, 2, 3, 4, 5])); //* 6
console.log(removeDuplicates([0, 0, 0, 0, 0])); //* 1
console.log(removeDuplicates([5])); //* 1

//* Time: O(n) - It takes O(n) time to iterate through the entire array
//* The inner while loop does not add to the overall time complexity, it can only activate at most "n" times

//* Space: O(1) - Any space we use does not scale with the size of the input
