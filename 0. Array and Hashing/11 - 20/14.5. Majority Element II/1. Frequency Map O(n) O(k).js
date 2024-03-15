//* Store the elements that pass the test in an array
//* Take the length of the array and divide by 3; this is the frequency we have to beat
//* Track the frequency of each number in the nums array
//* Iterate through freqMap and add any key to the result array that whose value > freqToBeat
function majorityElementII(nums) {
  const result = [];
  const freqMap = new Map();

  //* Only add numbers that have an occurrence > freqToBeat
  let freqToBeat = nums.length / 3;

  //* Count the number of occurrences of each
  for (let i = 0; i < nums.length; i++) {
    freqMap.set(nums[i], (freqMap.get(nums[i]) || 0) + 1);
  }

  //* Find the numbers that have an occurrence > freqToBeat
  for (let [key, value] of freqMap) {
    if (value > freqToBeat) {
      result.push(key);
    }
  }

  return result;
}

console.log(majorityElementII([5, 5, 5, 4])); // [5]
console.log(majorityElementII([3, 2, 3])); // [3]
console.log(majorityElementII([1])); // [1]
console.log(majorityElementII([1, 2, 1])); // [1]
console.log(majorityElementII([1, 2, 3])); // []
console.log(majorityElementII([1, 2, 3, 1, 2, 3, 3, 2])); // [2, 3]

//* Time: O(n) - The time taken scales with the number of elements in nums
//* We iterate once through the whole array
//* And then we iterate one more time for each unique number that exists in nums
//* In the worst case, every number is unique, so it ends up being O(n + n), which simplifies to O(n)

//* Space: O(k) - The space used by the map scales with the number of unique keys that exist in nums
//* If we have an array of [1, 1, 1, 5], we end up with { 1: 3, 5: 1}
//* There are only 2 unique numbers, the map only has 2 keys
