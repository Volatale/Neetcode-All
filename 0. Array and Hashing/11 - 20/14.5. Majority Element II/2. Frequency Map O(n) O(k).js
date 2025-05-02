//* We need to find all of the elements that appear MORE than (n / 3) times
//*     - "All" implies that there could be multiple
//* The number of times an element appears is analogous to its frequency
//* So we could iterate through the entire array and track the frequency of every element
//*     - Use a frequency map for this purpose
//* Then, we can find all of the elements whose frequency > (n / 3)
function majorityElement(nums) {
  const results = [];
  const freq = {}; //* Tracks the frequency of nums[i]
  const threshold = Math.floor(nums.length / 3);

  //* Get the frequency of every element
  for (let i = 0; i < nums.length; i++) {
    freq[nums[i]] = (freq[nums[i]] || 0) + 1;
  }

  //* Find all of the elements whose frequency > (n / 3)
  for (let key in freq) {
    if (freq.hasOwnProperty(key)) {
      if (freq[key] > threshold) {
        results.push(Number(key));
      }
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
//* Then we iterate through all of the keys in freq, and there can be up to "n" unique keys

//* Space: O(k) - In the worst case, every element in nums is unique, so there could be up to "n" keys
//* On average though, we can say the memory usage scales with "k" where "k" is the number of unique keys
