//* We are told the range of numbers is [0, n] (inclusive)
//* We are ALSO told that each number is distinct
//*     - Thus we can assume there is only 1 of each
//* If we take the number "n" to be the length of the array
//* Then we can apply the Gauss formula to get the supposed sum of all elements INCLUDING the missing number
//* After that, we can get the "actual" sum of the array
//* Missing Number = Sum of N Natural Numbers - Actual Sum
function missingNumber(nums) {
  const n = nums.length;

  //* This gives us the "supposed" sum (INCLUDING the missing number)
  const gauss = (n * (n + 1)) >> 1;

  //* This is the "actual" sum
  let sum = nums.reduce((acc, curr) => acc + curr, 0);

  //* This gives us the number we are missing
  return gauss - sum;
}

console.log(missingNumber([3, 0, 1])); //* 2
console.log(missingNumber([0, 1])); //* 2
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); //* 8
console.log(missingNumber([0])); //* 1

//* Time: O(n) - It takes O(1) to get the sum of "n" natural numbers
//* But it takes O(n) to get the "actual" sum of the array

//* Space: O(1) - We are not using any additional space that will scale with the input size
