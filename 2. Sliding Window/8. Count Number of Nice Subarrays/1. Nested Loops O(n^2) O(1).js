//* Use a nested for loop and check every subarray
//* Count the number of odd elements
//* n & 1 checks if the LSB is set
//* 011 & 001 = 001
function numberOfNiceSubarrays(nums, k) {
  let subarrays = 0;

  for (let i = 0; i < nums.length; i++) {
    let odd = 0; //* Count the number of odd elements

    for (let j = i; j < nums.length; j++) {
      if (nums[j] & 1) odd++; //* Checks if the element is odd
      if (odd === k) subarrays++;
    }
  }

  return subarrays;
}

console.log(numberOfNiceSubarrays([1, 1, 2, 1, 1], 3)); //* 2
console.log(numberOfNiceSubarrays([2, 4, 6], 1)); //* 0
console.log(numberOfNiceSubarrays([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2)); //* 16
console.log(numberOfNiceSubarrays([1, 1, 1, 1, 1], 3)); //* 3
console.log(numberOfNiceSubarrays([1], 1)); //* 1
console.log(numberOfNiceSubarrays([1, 2, 2, 1, 2, 1, 1], 2));

//* Time: O(n^2) - We have a nested for loop, both of which scale with "n"

//* Space: O(1) - We don't use any space that scales with input size
