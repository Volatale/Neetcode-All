//* Count the frequency of each number
//* For each number 0 through 2, add each number to result "n" times
//* "n" represents the number of times that number occurred
function sortColors(nums) {
  const freq = new Map();
  const result = [];

  //* Get the frequency of each number in nums
  for (let i = 0; i < nums.length; i++) {
    freq.set(nums[i], (freq.get(nums[i]) || 0) + 1);
  }

  //* Populate result with each number
  for (let i = 0; i <= 2; i++) {
    const noToAdd = freq.get(i);

    //* Add "noToAdd" occurrences of i
    for (let j = 0; j < noToAdd; j++) {
      result.push(i);
    }
  }

  return result;
}

console.log(sortColors([2, 0, 2, 1, 1, 0]));
console.log(sortColors([2, 1, 0]));
console.log(sortColors([1, 1, 2, 0, 0, 2]));

//* Time: O(n) - It takes O(n) time to get the frequency of each element in nums
//* It takes O(1) time to iterate from 0 to 2
//* Then it takes O(n) time at worst to add every number to the result
//* The number of times we have to add a number to the result array is bounded by the length of the array (if they are all 1, for example)

//* Space: O(n) - The space used by both the result array, and the map scale (at worst) with the size of the input
//* The freq map will have a size of 3 at max, assuming you have numbers 0, 1 and 2, so the space is bounded by 3
//* Result will always have a size of "n" (proportional to the input array)
