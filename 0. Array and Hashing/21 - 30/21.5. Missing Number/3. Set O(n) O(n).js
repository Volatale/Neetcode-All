//* Add everything to a set for fast lookup
//* Iterate from 0 up to (and including) n (nums.length)
//* If "i" does NOT exist in the set, THAT is the missing number
function missingNumber(nums) {
  const set = new Set(nums);

  for (let i = 0; i <= nums.length; i++) {
    if (!set.has(i)) return i;
  }
}

console.log(missingNumber([3, 0, 1])); // 2
console.log(missingNumber([0, 1])); // 2
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8

//* Time: O(n) - It takes O(n) to add all of the elements in the input to the set
//* Then it takes O(n) to iterate from i to n to check for the missing number

//* Space: O(n) - The set will have the same size as the input
//* So the space usage of the set is directly proportional to the input size
