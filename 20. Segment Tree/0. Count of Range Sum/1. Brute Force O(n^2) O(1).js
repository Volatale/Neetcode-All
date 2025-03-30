//* In a brute force manner, we can generate every possible subarray
//*     - rangeSum(s[i..j]) === sum(s[i..j])
//! The input can contain negative numbers, as well as 0 itself
//* We cannot assume that a subarray that is CURRENTLY invalid will still be invalid in the future
//* That is to say, if s[i..j] >= upper, then the range sum (subarray) is not valid
//* However, there could be negative numbers at indices s[j..n-1], so it "could" become valid later on
//*     - Thus, regardless of the current state of the subarray, we never assume it is unfixable
function countRangeSum(nums, lower, upper) {
  let rangeSums = 0;

  //* Generate every possible range sum (subarray sum)
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;

    for (let j = i; j < nums.length; j++) {
      //* Add the jth element to the current subarray
      sum += nums[j];

      //* Found a valid range sum
      if (lower <= sum && sum <= upper) {
        rangeSums++;
      }
    }
  }

  return rangeSums;
}

console.log(countRangeSum([-2, 5, -1], -2, 2)); //* 3
console.log(countRangeSum([1, 2, 3, 4], 0, 10)); //* 10
console.log(countRangeSum([0], 0, 0)); //* 1

//* Time: O(n^2) - Generating every possible subarray takes O(n^2) time
//* There are (n * (n + 1)  / 2) subarrays in total

//* Space: O(1) - The memory usage remains constant regardless of the input size
