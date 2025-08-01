//* Add the elements to a set, then compare the size of the set with the length of the array
//* If they aren't equal, there was a duplicate
function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}

console.log(containsDuplicate([1, 2, 3, 1])); // true
console.log(containsDuplicate([1, 2, 3, 4])); // false
console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // true
