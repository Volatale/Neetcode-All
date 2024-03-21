//* Track the frequency of each element in nums
//* Use a count array (similar to counting sort)
//* Iterate through the map, and place each number at the correct index
//* countArr[1] means "elements in this array appeared twice" (since we are offsetting by 1 to save space)
function elementsAppearTwice(nums) {
  if (nums.length === 0) return [];

  const freq = new Map();

  //* Elements in countArr[i - 1] represent the numbers that occured "i" times
  //* [[1, 2], [3, 4, 5]]: 3, 4 and 5 all appeared twice in the input
  const countArr = new Array(nums.length).fill(0).map(() => new Array());

  //* Get the frequency of each number in nums
  for (let i = 0; i < nums.length; i++) {
    freq.set(nums[i], (freq.get(nums[i]) || 0) + 1);
  }

  //* Populate the count array
  for (let [key, value] of freq) {
    countArr[value - 1].push(key); //* "key" appeared "value" times
  }

  return countArr[1]; //* All the elements that appeared twice
}

console.log(elementsAppearTwice([1, 1, 1, 1])); // [1]
console.log(elementsAppearTwice([4, 3, 2, 7, 8, 2, 3, 1])); // [3, 2]
console.log(elementsAppearTwice([1, 1, 2, 2, 3, 4, 5, 5])); // [1, 2, 5]
console.log(elementsAppearTwice([])); // []

//* Time: O(n) - It takes O(n) time to iteerate through the input array
//* So the time taken scales proportionally with the input size

//* Space: O(n) - In the worst case, every element in nums is unique
//* In which case the map will have "n" keys where "n" is nums.length
//* The space used by the count array will always be less than "n"
