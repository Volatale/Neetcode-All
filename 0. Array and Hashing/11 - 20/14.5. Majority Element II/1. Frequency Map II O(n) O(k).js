//* We need to find all of the elements that appear MORE than (n / 3) times
//*     - "All" implies that there could be multiple
//* The number of times an element appears is analogous to its frequency
//* So we could iterate through the entire array and track the frequency of every element
//*     - Use a frequency map for this purpose
//* Then, we can find all of the elements whose frequency > (n / 3)
//* In reality though, there is no need to perform a second iteration
//* We can increment the frequency of the current element, and then immediately check if that value is > (n / 3)
function majorityElement(nums) {
  const results = [];
  const freq = {}; //* Tracks the frequency of nums[i]
  const threshold = Math.floor(nums.length / 3);

  //* Get the frequency of every element
  for (let i = 0; i < nums.length; i++) {
    freq[nums[i]] = (freq[nums[i]] || 0) + 1;

    //* Check if this element is a majority element
    if (freq[nums[i]] > threshold) {
      results.push(nums[i]);
    }
  }

  return results;
}

console.log(majorityElement([1, 2, 3, 1, 2, 1])); //* [1]
console.log(majorityElement([3])); //* [3]
console.log(majorityElement([2, 3, 2])); //* [2]
console.log(majorityElement([1, 2])); //* [1, 2]
console.log(majorityElement([5, 2, 9])); //* []

//* Time: O(n) - We iterate through the array once, which takes O(n)

//* Space: O(n) - In the worst case, every element in nums is unique, so there could be up to "n" keys
