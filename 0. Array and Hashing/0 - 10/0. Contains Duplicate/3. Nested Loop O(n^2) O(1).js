//* Brute Force check if there are duplicates
function containsDuplicate(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (nums[i] === nums[j]) return true;
    }
  }

  return false;
}

console.log(containsDuplicate([1, 2, 3, 1])); // true
console.log(containsDuplicate([1, 2, 3, 4])); // false
console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // true

//* Time: O(n^2) - We have two nested for loops that both scale with "n"

//* Space: O(1) - We don't use any extra space at all, so the space usage remains constant
