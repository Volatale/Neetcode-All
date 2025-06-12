//* Given an int[] and an int `k`, a continous subarray is "nice" if there are `k` odd numbers in it
//*     - In other words, a "nice" subarray contains EXACTLY `k` odd numbers
//* If we take a brute force approach, we could simply compute every possible subarray
//! If we ever get to a point where "oddCount" > k, then we should immediately break out of the inner loop
//*     - Why? Because there needs to be EXACTLY `k` odd integers, not greater than or equal to `k`
//*     - Extending the subarray beyond this point would never lead to a possible solution
//* The numbe of odds will never decrease, it only ever stays the same or increases
//* To check for an odd integer, we can simply check the LSB of the number
//*     - if (n & 1) === 1, then it is an odd number, else it is even
function numberOfSubarrays(nums, k) {
  let niceSubarrays = 0;

  for (let i = 0; i < nums.length; i++) {
    let odds = 0;

    for (let j = i; j < nums.length; j++) {
      //* Check if nums[j] is odd
      if (nums[j] & 1) {
        odds++;
      }

      //* Add occurrences of nice subarrays
      if (odds === k) {
        niceSubarrays++;
      } else if (odds > k) break;
    }
  }

  return niceSubarrays;
}

console.log(numberOfSubarrays([1, 1, 2, 1, 1], 3)); //* 2
console.log(numberOfSubarrays([2, 4, 6], 1)); //* 0
console.log(numberOfSubarrays([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2)); //* 16
console.log(numberOfSubarrays([1, 1, 1, 1, 1], 3)); //* 3
console.log(numberOfSubarrays([1], 1)); //* 1
console.log(numberOfSubarrays([1, 2, 2, 1, 2, 1, 1], 2)); //* 7

//* Time: O(n^2) - The time taken scales quadratically with the input size
//* We have two nested for loops, both of which scale with the input size

//* Space: O(1) - The memory usage remains constant regardless of the input size
