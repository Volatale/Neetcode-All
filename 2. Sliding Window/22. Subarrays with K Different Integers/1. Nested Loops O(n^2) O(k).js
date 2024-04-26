//* Use a set to track the number of unique elements
//* If set.size === k, we have a valid subarray
//* If set.size > k, you know that the subarray is invalid beyond this point
function subarraysWithKDistinct(nums, k) {
  const uniques = new Set();
  let subarrays = 0;

  for (let i = 0; i < nums.length; i++) {
    uniques.clear();

    for (let j = i; j < nums.length; j++) {
      uniques.add(nums[j]);

      if (uniques.size === k) subarrays++;
      if (uniques.size > k) break; //* Minor optimization; subarray is invalid
    }
  }

  return subarrays;
}

console.log(subarraysWithKDistinct([1, 2, 3, 1, 2], 2)); //* 4
console.log(subarraysWithKDistinct([1, 2, 1, 2, 3], 2)); //* 7
console.log(subarraysWithKDistinct([1, 2, 1, 3, 4], 3)); //* 3
console.log(subarraysWithKDistinct([1, 2, 3, 4, 5, 6], 6)); //* 1
console.log(subarraysWithKDistinct([5, 2], 4)); //* 0
console.log(subarraysWithKDistinct([10], 1)); //* 1

//* Time: O(n^2) - We have nested for loops, both of which scale with "n"
//* It takes Θ(1) to clear the set
//* It also takes Θ(1) to add elements to the set

//* Space: O(k) - The set can only store up to "k" elements
//* The inner loop will break if you go beyond that
