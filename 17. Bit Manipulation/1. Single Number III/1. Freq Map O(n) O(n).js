//* Create a frequency map of all the elements
//* Iterate through the map and find the two elements with a single occurrence
function singleNumber(nums) {
  //* There are only two elements
  if (nums.length === 2) return nums;

  const freq = {}; //* Frequency map
  const results = [];

  //* Get the frequency of every element
  for (let i = 0; i < nums.length; i++) {
    freq[nums[i]] = (freq[nums[i]] || 0) + 1;
  }

  //* Find elements two a frequency of 1
  for (let num in freq) {
    if (freq.hasOwnProperty(num) && freq[num] === 1) {
      results.push(Number(num));
    }
  }

  return results;
}

console.log(singleNumber([1, 2, 1, 3, 2, 5])); //* [3, 5]
console.log(singleNumber([-1, 0])); //* [-1, 0]
console.log(singleNumber([4, 1, 2, 3, 4, 2, 1, 7])); //* [3, 7]

//* Time: O(n) - Iterating through the input array takes O(n)
//* Then, we iterate over the object, which has n / 2 + 1 keys in the worst case

//* Space: O(n) - If there are 8 elements in the input, there are n / 2 + 1 keys
