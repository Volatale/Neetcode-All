//* sum - k is us checking how many subarrays equal "k" starting from index sum - k
function subarraySumEqualsK(nums, k) {
  let result = 0;
  let sum = 0; //* Cummulative Sum of elements encountered thus far

  //* PrefixSum : Count. No. of ways to reach "key"
  //* We start with {0 : 1} to ensure that subarrays starting from index 0 are accounted for
  const prefixTable = new Map([[0, 1]]);

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];

    //* Add the number of subarrays that equal "k" starting from index sum - k
    result += prefixTable.get(sum - k) || 0;

    //* We found an occurrence of a subarray that equals sum
    prefixTable.set(sum, (prefixTable.get(sum) || 0) + 1);
  }

  return result;
}

console.log(subarraySumEqualsK([1, 1, 1], 2)); //* 2 {0 : 1, 1 : 1}
console.log(subarraySumEqualsK([1, 2, 3], 6)); //* 1
console.log(subarraySumEqualsK([4, 2, 1], 4)); //* 1
console.log(subarraySumEqualsK([1, 2, 4, 2, 3, 1, 1], 6)); //* 3
console.log(subarraySumEqualsK([3], 3)); //* 1
console.log(subarraySumEqualsK([5, 5], 5)); //* 2
console.log(subarraySumEqualsK([10, 2, 10, 2], 2)); //* 2
console.log(subarraySumEqualsK([1], 0)); //
console.log(subarraySumEqualsK([-1, -1, 1], 0)); //* 1

//* Time: O(n) - The time taken to iterate over the entire input scales with the input size1

//* Space: O(n) - The space usage scales with the input size; in the worst case, we could have "n" keys
