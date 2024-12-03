//* Try every possible pair of elements
//* We can reverse a number in log10(n) time
//*     - Simply use place value and mod by 10 to get the next digit we need
function countNicePairs(nums) {
  //* We need at least two elements to form a pair
  if (nums.length <= 1) return 0;

  const MOD = 10 ** 9 + 7;
  let pairs = 0;

  //* Try every possible pair
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      //* Found a valid "nice" pair
      if (nums[i] + rev(nums[j]) === nums[j] + rev(nums[i])) {
        pairs = (pairs + 1) % MOD; //* Mod in each iteration; doing it at the end may not suffice
      }
    }
  }

  return pairs;
}

function rev(n) {
  //* There is nothing to reverse
  if (n === 0) return 0;

  let reversed = 0;

  //* In base 10, we mod by 10 to get the last digit (build number using place value)
  while (n > 0) {
    reversed = reversed * 10 + (n % 10);
    n = Math.floor(n / 10);
  }

  return reversed;
}

console.log(countNicePairs([42, 11, 1, 97])); //* 2
console.log(countNicePairs([13, 10, 35, 24, 76])); //* 4
console.log(countNicePairs([1, 2, 3, 4])); //* 6
console.log(countNicePairs([5, 2, 6, 9, 1, 4])); //* 15
console.log(countNicePairs([2, 1, 2])); //* 3

//* Time: O(n^2 * log10(n)) - We have a nested for loop, both of which scale with the input size
//* The time complexity of rev() scales with the number of digits in the input (n)
//* We are dividing by 10 each iteration, so the "true" time complexity of rev() is actually log10(n)

//* Space: O(1) - We are not using any additional space that will scale with input size
