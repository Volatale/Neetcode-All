//* We need 2 elements minimum for there to be an equal amount
//*     - If the length is 1, we can't have an equal amount of either
//*     - So immediately return 0 (not possible to make a valid subarray)
//* If we have an array that exclusively contains 0s or 1s
//*     - Return 0, since we can't get an equal amount
//* Otherwise, we should just try every possible subarray
//* Track the number of 0s and 1s that exist within the current subarray
//* Whenever we have an equal amount of both, potentially update the max length
function findMaxLength(nums) {
  //* Impossible to have an equal amount AND length > 0
  if (nums.length <= 1) return 0;

  let maxLength = 0;

  //* Try every possible subarray
  for (let i = 0; i < nums.length; i++) {
    let zeroes = 0;
    let ones = 0;

    for (let j = i; j < nums.length; j++) {
      //* Increment the corressponding count
      nums[j] === 0 ? zeroes++ : ones++;

      //* Potentially update the maximum length
      if (zeroes === ones) {
        maxLength = Math.max(maxLength, j - i + 1);
      }
    }
  }

  return maxLength;
}

console.log(findMaxLength([0, 1])); //* 2
console.log(findMaxLength([0, 1, 1, 0])); //* 4
console.log(findMaxLength([1, 1, 1])); //* 0
console.log(findMaxLength([0])); //* 0
console.log(findMaxLength([0, 1, 0])); //* 2
console.log(findMaxLength([0, 1, 1, 0, 1, 1, 1, 0])); //* 4
console.log(findMaxLength([1, 1, 0, 0, 0, 1, 1, 1])); //* 6
console.log(findMaxLength([0, 0, 1, 0, 0, 0, 1, 1])); //* 6

//* Time: O(n^2) - The time taken scales with the length of the input

//* Space: O(1) - The memory usage does not scale with the input size
