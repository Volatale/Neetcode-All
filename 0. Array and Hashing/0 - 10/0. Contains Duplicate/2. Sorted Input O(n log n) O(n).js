//* Sort, then check if the previous number is the same as the current
function containsDuplicate(nums) {
  nums.sort((a, b) => a - b);

  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] === nums[i]) return true;
  }

  return false;
}

console.log(containsDuplicate([1, 2, 3, 1])); // true
console.log(containsDuplicate([1, 2, 3, 4])); // false
console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // true

//* Time: O(n log n) - Sorting is generally O(n log n) at best
//* Then, we also have an O(n) forward pass through the array

//* Space: O(n) - Generally, merge sort is the default, and that uses O(n) space
