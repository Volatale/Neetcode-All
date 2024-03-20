function topKFrequent(nums, k) {
  const freq = new Map();

  const countArr = [];
  const results = [];

  //* Iterate over the whole array; get the frequency of every number
  for (let i = 0; i < nums.length; i++) {
    freq.set(nums[i], (freq.get(nums[i]) || 0) + 1);
  }

  //* Iterate backwards, and push the most frequent elements to results
  for (let i = countArr.length - 1; i >= 0; i--) {}

  return results;
}

console.log(topKFrequent([1, 1, 1, 2, 2, 100], 2));
console.log(topKFrequent([1, 2, 1, 2, 3, 3, 4, 5, 5], 4));
console.log(topKFrequent([1], 1));
