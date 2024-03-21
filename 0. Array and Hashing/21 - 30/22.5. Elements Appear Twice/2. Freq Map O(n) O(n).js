//* Get the frequency of each element in nums
//* Push any element that occurs more than 1 time to the results array
function elementsAppearTwice(nums) {
  const results = [];

  const freq = new Map();

  //* Get the frequency of each number
  for (let i = 0; i < nums.length; i++) {
    freq.set(nums[i], (freq.get(nums[i]) || 0) + 1);
  }

  //* Find which ones appear more than once
  for (let [key, value] of freq) {
    if (value > 1) results.push(key);
  }

  return results;
}

console.log(elementsAppearTwice([4, 3, 2, 7, 8, 2, 3, 1])); // [3, 2]
console.log(elementsAppearTwice([1, 1, 2, 2, 3, 4, 5, 5])); // [1, 2, 5]

//* Time: O(n) - It takes O(n) time to get the frequency of each element
//* Then it takes O(n) in the worst case to iterate over map
//* If all of the elements are unique, there are "n" elements in freq

//* Space: O(n) - The map takes O(n) space in the worst case
//* If all of the elements are unique, the space usage scales with the number of keys ("n")
