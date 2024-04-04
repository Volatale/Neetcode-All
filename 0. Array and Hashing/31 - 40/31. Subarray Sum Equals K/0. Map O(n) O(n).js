//* Use a map to track the number of subarrays that equal "sum"
//* { prefixSum : count } means "We can reach a subarray of sum : this many ways"
//* We track the prefix sum of the elements encountered thus far
//* Subtract "k" from that to see if there exists a subarray (up to this index) that we can subtract to equal "k"
//* If map[sum - k] exists in the map, we can subtract a subarray that equals sum - k to reach a total of "k"
//* Add an occurrence of "sum" to say that we can create a subarray of "sum"
function subarraySumEqualsK(nums, k) {
  let result = 0;
  let sum = 0; //* Cummulative Sum of elements encountered thus far

  //* Start with {0:1} to say "Can we subtract a subarray of sum 0 from 'k' to make k?"
  const prefixTable = new Map([[0, 1]]);

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];

    //* "Is there a subarray that we can subtract from sum to equal k?"
    result += prefixTable.get(sum - k) || 0;

    //* Add an occurrence of sum; that is to say, add a way to reach "sum"
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
console.log(subarraySumEqualsK([1], 0)); //* 0
console.log(subarraySumEqualsK([-1, -1, 1], 0)); //* 1

//* Time: O(n) - The time taken to iterate over the entire input scales with the input size1
//* It takes Θ(1) time on average to perform a lookup in a hashtable

//* Space: O(n) - The space usage scales with the input size; in the worst case, we could have "n" keys
