//* Count the number of consecutive zeroes
//* [0, 0, 0] would give us the subarrays:
//*     - [0], [0, 0], [0, 0, 0]: 3
//*     - [0], [0, 0]: 2
//*     - [0]: 1
//* 3 + 2 + 1 = 6
//* So we know there are 6 subarrays within this group of consecutive 0s
function zeroFilledSubarrays(nums) {
  let subarrays = 0;
  let count = 0; //* Number of Consecutive Zeroes

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      count++;
      subarrays += count;
    } else {
      count = 0;
    }
  }

  return subarrays;
}

console.log(zeroFilledSubarrays([1, 3, 0, 0, 2, 0, 0, 4])); //* 6
console.log(zeroFilledSubarrays([1, 0, 1, 0, 0, 1])); //* 4
console.log(zeroFilledSubarrays([0, 0, 0])); //* 6
console.log(zeroFilledSubarrays([0])); //* 1
console.log(zeroFilledSubarrays([0, 0, 0, 2, 0, 0])); //* 9
console.log(zeroFilledSubarrays([2, 10, 2019])); //* 0
console.log(zeroFilledSubarrays([0, 0, 1, 0])); //* 4
console.log(zeroFilledSubarrays([0, 0, 0, 0])); //* 10

//* Time: O(n) - There are "n" iterations of the loop (scales with the input size)
//* We only do constant time operations within each iteration

//* Space: O(1) - We use two variables that are constant space
//* No auxillary data structures that scale with "n" are used
