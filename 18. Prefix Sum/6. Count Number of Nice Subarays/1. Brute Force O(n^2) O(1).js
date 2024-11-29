//* In a brute force manner, check every possible subarray
//* If we find an odd number, increment "odd"
//* When "odd" is greater than "k", we can stop searching using this subarray
//*     - There must be EXACTLY "k" odd numbers in a subarray for it to be considered "nice"
//*     - Therefore, going above "k" does not bring us any closer to the goal
function numberOfSubarrays(nums, k) {
  let subarrays = 0;

  //* Check every possible subarray
  for (let i = 0; i < nums.length; i++) {
    let odds = 0;

    for (let j = i; j < nums.length; j++) {
      //* Found an odd number
      if (nums[j] & 1) {
        odds++;
      }

      if (odds === k) {
        //* Found a "nice" subarray
        subarrays++;
      } else if (odds > k) {
        //* There must be EXACTLY "k" odd numbers, no point adding more
        break;
      }
    }
  }

  return subarrays;
}

console.log(numberOfSubarrays([1, 1, 2, 1, 1], 3)); //* 2
console.log(numberOfSubarrays([2, 4, 6], 1)); //* 0
console.log(numberOfSubarrays([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2)); //* 16

//* Time: O(n^2) - We need to perform a nested for loop to check every possible subarray

//* Space: O(1) - No additional space that will scale with the input size is used
