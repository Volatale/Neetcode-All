function subarraysWithKDistinct(nums: number[], k: number) {
  return atMost(nums, k) - atMost(nums, k - 1);
}

function atMost(nums: number[], k: number) {
  let start = 0;
  let end = 0;

  let subarrays = 0;

  const uniques = new Set();

  while (end < nums.length) {
    uniques.add(nums[end]);
  }

  return subarrays;
}

console.log(subarraysWithKDistinct([1, 2, 3, 1, 2], 2)); //* 4
console.log(subarraysWithKDistinct([1, 2, 1, 2, 3], 2)); //* 7
console.log(subarraysWithKDistinct([1, 2, 1, 3, 4], 3)); //* 3
console.log(subarraysWithKDistinct([1, 2, 3, 4, 5, 6], 6)); //* 1
console.log(subarraysWithKDistinct([5, 2], 4)); //* 0
console.log(subarraysWithKDistinct([10], 1)); //* 1
