//* Get the frequency of every element in nums
//* Sort the key value pairs based on increasing frequency
//* Finally, push all of the elements in order
function frequencySort(nums) {
  if (nums.length === 1) return nums;

  const result = [];
  const freq = {};

  //* Get the frequency of every element
  for (let i = 0; i < nums.length; i++) {
    freq[nums[i]] = (freq[nums[i]] || 0) + 1;
  }

  //* Get all of the [number, frequency] pairs and sort them
  const entries = Object.entries(freq).sort((a, b) => {
    if (a[1] === b[1]) return b[0] - a[0];
    return a[1] - b[1];
  });

  //* Add all of the elements to the results array
  for (const [number, frequency] of entries) {
    for (let i = 0; i < frequency; i++) {
      result.push(parseInt(number));
    }
  }

  return result;
}

console.log(frequencySort([1, 1, 2, 2, 2, 3])); //* [3, 1, 1, 2, 2, 2]
console.log(frequencySort([2, 3, 1, 3, 2])); //* [1, 3, 3, 2, 2]
console.log(frequencySort([-1, 1, -6, 4, 5, -6, 1, 4, 1])); //* [5, -1, 4, 4, -6, -6, 1, 1, 1]

//* Time: O(n log n) - The time taken to sort every element is O(n log n)
//* It takes O(n) to get the frequency of every element
//* And in the worst case, it also takes O(n) to add all the elements to the array
