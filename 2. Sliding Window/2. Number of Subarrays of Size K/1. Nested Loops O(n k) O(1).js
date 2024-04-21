//* Grab all of the subarrays of length "k"
//* If any of them have a value >= valToBeat, then it meets the sum / k >= threshold requiremenet
function numberOfSubarraysSizeK(nums, k, threshold) {
  //* Multiplication is faster than division
  const valToBeat = k * threshold;

  let subarrays = 0;

  //* Make sure there are at least "k" elements left (including this one)
  for (let i = 0; i <= nums.length - k; i++) {
    let sum = 0;

    //* Grab the next "k" elements
    for (let j = i; j < i + k; j++) {
      sum += nums[j];
    }

    if (sum >= valToBeat) {
      subarrays++;
    }
  }

  return subarrays;
}

console.log(numberOfSubarraysSizeK([2, 2, 2, 2, 5, 5, 5, 8], 3, 4)); //* 3
console.log(numberOfSubarraysSizeK([11, 13, 17, 23, 29, 31, 7, 5, 2, 3], 3, 5)); //* 6
console.log(numberOfSubarraysSizeK([1, 2, 3, 4, 5], 2, 3)); //* 2

//* Time: O(n * k) - For each outer loop iteration, there are "k" inner loop iterations
//* Thus we have an O(n * k) time complexity

//* Space: O(1) - We use constant space - no auxillary data structures are used that scale with input size
