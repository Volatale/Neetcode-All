//* Given an int[] and an int `k`, a continous subarray is "nice" if there are `k` odd numbers in it
//*     - In other words, a "nice" subarray contains EXACTLY `k` odd numbers
//* Since we know exactly how many odd elements we need at any given point, we can use a sliding window approach
//* The only issue is that is that a pure sliding window approach may lead to us missing some possible subarrays/
//* So, we can use the "atMost `k`" variation of sliding window
//*     - Exactly(k) = atMost(k) - atMost(k - 1)
//*     - The former call gives every possible subarray, and the latter call removes the extra (unneeded) subarrays
//! If we ever get to a point where "oddCount" > k, then we should immediately shrink the window until the invariant is upheld
//*     - Why? Because there needs to be EXACTLY `k` odd integers, not greater than or equal to `k`
//*     - Extending the subarray beyond this point would never lead to a possible solution
//* The numbe of odds will never decrease, it only ever stays the same or increases
//* To check for an odd integer, we can simply check the LSB of the number
//*     - if (n & 1) === 1, then it is an odd number, else it is even
function numberOfSubarrays(nums, k) {
  return atMost(nums, k) - atMost(nums, k - 1);
}

function atMost(nums, k) {
  let odds = 0;
  let subarrays = 0;

  //* Pointers that mark the start/end of the sliding window
  let start = 0;
  let end = 0;

  while (end < nums.length) {
    //* If the LSB is set, then it is an odd number
    if (nums[end] & 1) {
      odds++;
    }

    //* Ensure the invariant is upheld (window never contains > `k` odd elements)
    while (odds > k) {
      odds -= nums[start++] & 1;
    }

    subarrays += end - start + 1;
    end++;
  }

  return subarrays;
}

console.log(numberOfSubarrays([2, 2, 2, 1], 1)); //* 4
console.log(numberOfSubarrays([1, 1, 2, 1, 1], 3)); //* 2
console.log(numberOfSubarrays([2, 4, 6], 1)); //* 0
console.log(numberOfSubarrays([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2)); //* 16
console.log(numberOfSubarrays([1, 1, 1, 1, 1], 3)); //* 3
console.log(numberOfSubarrays([1], 1)); //* 1
console.log(numberOfSubarrays([1, 2, 2, 1, 2, 1, 1], 2)); //* 7

//* Time: O(n) - Each call to atMost() takes O(n), so we have a O(2n) time complexity, but this simplifies to O(1)

//* Space: O(1) - The memory usage remains constant regardless of the input size
