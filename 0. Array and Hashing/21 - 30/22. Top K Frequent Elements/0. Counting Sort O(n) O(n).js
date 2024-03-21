function topKFrequent(nums, k) {
  const freq = new Map();
  const countArr = new Array(nums.length + 1).fill(0).map(() => new Array());
  const results = [];

  //* Iterate over the whole array; get the frequency of every number
  for (let i = 0; i < nums.length; i++) {
    freq.set(nums[i], (freq.get(nums[i]) || 0) + 1);
  }

  //* Populate the countArr
  for (let [key, count] of freq) {
    countArr[count].push(key);
  }

  //* Iterate backwards, and push the most frequent elements to results
  for (let i = countArr.length - 1; i >= 0; i--) {
    const values = countArr[i];

    //* Each element within countArr is an array of numbers
    for (let val of values) {
      results.push(val);
      if (results.length === k) return results;
    }
  }

  return results;
}

console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
console.log(topKFrequent([1], 1)); // [1]
console.log(topKFrequent([1, 2, 1, 2, 3, 3, 4, 5, 5], 4)); // [1, 2, 3, 4]

//* Time: O(n) - It takes O(n) time to iterate over the array initially (to get the frequency of each number)
//* Then it takes O(n) time (in the worst case) to populate the countArr (if every element appears once, there will be n iterations)
//* Finally, it takes O(n) time to iterate over countArr; the inner loop will only ever activate "n" times

//* Space: O(n) - The space used by the frequency map, count array, and results array scale with "n"
//* If every element is unique, they all use the same amount of space
//* The results array can take O(k) space if not every element is unique, but k < n, so in the worst case we say O(n)
