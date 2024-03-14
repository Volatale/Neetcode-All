function majorityElement(nums) {
  if (nums.length === 1) return nums[0];

  const freqMap = new Map();

  let mostCommonNumber = 0;
  let highestOccurrence = 0;

  for (let i = 0; i < nums.length; i++) {
    freqMap.set(nums[i], (freqMap.get(nums[i]) || 0) + 1);
  }

  //* Double check which is the most common
  for (let [key, value] of freqMap) {
    const result = freqMap.get(key);

    if (result >= highestValue) {
      highestOccurrence = result;
      mostCommonNumber = key;
    }
  }

  return mostCommonNumber;
}

console.log(majorityElement([1])); // 1
console.log(majorityElement([4, 3, 4, 1, 4])); // 4
console.log(majorityElement([3, 2, 3])); // 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2, 2])); // 2

//* Time: O(n) - The time taken scales with the length of the input
//* We have to iterate over every element
//* The second for loop scales with the number of unique keys, but that is dominated by "n"

//* Space: O(k) - The space usage scales with the number of unique numbers in the input
