//* Track the number of zero filled subarrays
//* Brute Force by checking each individual subarray of size >= 1
function zeroFilledSubarrays(nums) {
  let subarrays = 0;

  for (let i = 0; i < nums.length; i++) {
    //* Avoid the inner loop if element is NOT 0
    if (nums[i] === 0) {
      for (let j = i; j < nums.length; j++) {
        //* The moment you find a NON 0, break the inner loop
        if (nums[j] !== 0) break;

        subarrays++; //* Otherwise, you know nums[j] is a 0
      }
    }
  }

  return subarrays;
}

console.log(zeroFilledSubarrays([1, 0, 1, 0, 0, 1])); //* 4
console.log(zeroFilledSubarrays([0, 0, 0])); //* 6
console.log(zeroFilledSubarrays([0])); //* 1
console.log(zeroFilledSubarrays([1, 3, 0, 0, 2, 0, 0, 4])); //* 6
console.log(zeroFilledSubarrays([0, 0, 0, 2, 0, 0])); //* 9
console.log(zeroFilledSubarrays([2, 10, 2019])); //* 0
console.log(zeroFilledSubarrays([0, 0, 1, 0])); //* 4

//* Time: O(n^2) - The outer loop happens "n" times where "n"= nums.length
//* For each outer loop, there are "n" inner loops (in the worst case)
//* We save some time by checking if nums[i] is not 0
//* But in the absolute worst case, if we have [0] * 10 ** 5
//* 10000 * (10001) / 2 = 5_000_500_0 which is a very large number

//* Space: O(1) - We use no extra auxillary space
