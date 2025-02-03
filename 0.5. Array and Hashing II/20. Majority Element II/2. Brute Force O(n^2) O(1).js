//* For each element, check if it has a frequency > (n / 3) floored
function majorityElement(nums) {
  const result = [];

  //* Elements whose frequency > lowerLimit are majority elements
  const lowerLimit = Math.floor(nums.length / 3);

  //* For each element, try to find the majority element(s)
  for (let i = 0; i < nums.length; i++) {
    let count = 0;

    for (let j = 0; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        count++;
      }
    }

    //* Found a majority element
    if (count > lowerLimit) {
      result.push(nums[i]);
    }
  }

  return result;
}

console.log(majorityElement([3, 2, 3])); //* [3]
console.log(majorityElement([1])); //* [1]
console.log(majorityElement([1, 2])); //* [1, 2]

//* Time: O(n^2) - We are performing a nested for loop, both of which scale with "n"

//* Space: O(1) - The memory usage does not scale with the input size
