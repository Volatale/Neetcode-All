//* Use Gauss' Formula
//* The numbers in the array range from [0, n] where "n" is the length of the array
//* Therefore, if we get the sum of all natural numbers including n
//* Subtract that from what the ACTUAL sum of the array is
//* And you get the missing number as the remainder
function missingNumber(nums) {
  const n = nums.length;
  const gauss = (n * (n + 1)) / 2;

  const actualSum = nums.reduce((acc, curr) => acc + curr, 0);

  return gauss - actualSum;
}

console.log(missingNumber([3, 0, 1])); // 2
console.log(missingNumber([0, 1])); // 2
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8

//* Time: O(n) - It takes O(n) time to get the sum of the array
//* But it takes O(1) time to use Gauss' Formula to get the sum of the first n natural numbers

//* Space: O(1) - The space usage remains constant; we only use constant space variables
