//* Create a set, which is good for O(1) lookups
//* For each element in nums, check if it exists in set
//*     - It WILL the first time we find the number; delete it from the set
//*     - If we find the element again, we found a duplicate; add it to the results
function elementsAppearTwice(nums) {
  const set = new Set(nums);
  const results = []; //* This should be a set if the duplicates can appear more than once

  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) {
      set.delete(nums[i]);
    } else {
      results.push(nums[i]);
    }
  }

  return results;
}

console.log(elementsAppearTwice([4, 3, 2, 7, 8, 2, 3, 1])); // [3, 2]
console.log(elementsAppearTwice([1, 1, 2, 2, 3, 4, 5, 5])); // [1, 2, 5]

//* Time: O(n) - It takes O(n) time to initialize the set with the nums array
//* Then it takes O(n) to iterate over the input again to compare values

//* Space: O(n) - In the worst case, every element in the input is unique
//* If that is the case, the set scales in size proportionally with the input array
