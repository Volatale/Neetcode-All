//* Instead of repeating work by checking the entire array for each element
//* We can instead check the array a single time
//* Any element whose frequency > n / 3 is a majority element
//* Thus we can check for all the majority elements in a single pass
function majorityElement(nums) {
  const result = [];

  //* Elements whose frequency > lowerLimit are majority elements
  const lowerLimit = Math.floor(nums.length / 3);
  const freq = {};

  //* Get the frequency of each element then check if it is a majority element
  for (let i = 0; i < nums.length; i++) {
    freq[nums[i]] = (freq[nums[i]] || 0) + 1;

    //* Found a majority element
    if (freq[nums[i]] > lowerLimit) {
      result.push(nums[i]);
    }
  }

  return result;
}

console.log(majorityElement([3, 2, 3])); //* [3]
console.log(majorityElement([1])); //* [1]
console.log(majorityElement([1, 2])); //* [1, 2]

//* Time: O(n) - We iterate over the entire array a single time - the time taken scales linearly (with n)

//* Space: O(k) - The memory usage scales with the number of unique keys in the input
