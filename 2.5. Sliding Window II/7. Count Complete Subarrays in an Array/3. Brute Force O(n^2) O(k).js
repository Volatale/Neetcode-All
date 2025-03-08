//* Iterate through nums and add every element to a set
//*     - Set is used to track distinct elements, and how many there are
//* We only need to track the UNIQUE elements in the subarray, not ALL of the elements
//* If we had an array of [1, 3, 1, 2, 2]
//*     - We know our subarrays need {1, 2, 3}
//*         - Our original set's size is 3
//*     - So if our current subarray set's size === original size, we have all of the elements
//* The distinct elements that exist in our subarray are limited to those that ALSO exist in nums
//*     - So we'll never have MORE distinct elements in our subarray than exist in nums
function countCompleteSubarrays(nums) {
  let subarrays = 0;

  const unique = new Set(); //* Tracks the number of unique elements in nums
  const curr = new Set(); //* Tracks no. of distinct elements in the subarray

  //* Determine which elements in nums are unique
  for (let i = 0; i < nums.length; i++) {
    unique.add(nums[i]);
  }

  for (let i = 0; i < nums.length; i++) {
    curr.clear();

    for (let j = i; j < nums.length; j++) {
      //* Add the current element to the subarray
      curr.add(nums[j]);

      //* We have all of the unique elements we need
      if (curr.size === unique.size) {
        subarrays++;
      }
    }
  }

  return subarrays;
}

console.log(countCompleteSubarrays([1, 3, 1, 2, 2])); //* 4
console.log(countCompleteSubarrays([5, 5, 5, 5])); //* 10
console.log(countCompleteSubarrays([1, 2, 3, 4])); //* 1
console.log(countCompleteSubarrays([8])); //* 1

//* Time: O(n^2) - We have nested for loops, both of which scale with the input size

//* Space: O(k) - Where "k" is the number of unique elements in nums
