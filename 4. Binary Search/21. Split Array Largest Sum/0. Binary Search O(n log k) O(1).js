//* We are given an int[] `nums` and an int `k`
//* The goal is to split `nums` to `k` non-empty subarrays while MINIMIZING the sum of each subarray
//* Then we need to return the minimized largest sum of the split
//*     - Thus, minimise the sum of every subarray, and then return the largest sum of them all
//* This is an optimization problem that involves partitioning
//* So binary search may be applicable; we are searching for the optimal spots to split
//* We can compare splits by summing the array and using an absolute difference
//* The splits that result in the LEAST absolute difference are the optimal splits
//* We are trying to minimize the SUM of each split, so our `mid` can represent the MAX sum we are testing
//*     - if(!canSplit) -> right = mid
//*         - Success, we found a valid candidate, but we still want the smallest
//*     - if(canSplit) -> left = mid + 1
//*         - Failure, we need a larger sum per subarray
//* As for the splitting, the splits happen left to right, so we can just simulate it mathematically
//*     - If the sum of a subarray > maxSum (k), simply start the count again (simulates a new array)
//*     - Increment the number of "subarrays" that would be created
function splitArray(nums, k) {
  function canSplit(maxSum) {
    let sum = 0;
    let subarrays = 1;

    //* Greedily add each element to a subarray from left-to-right
    for (let i = 0; i < nums.length && subarrays <= k; i++) {
      sum += nums[i];

      //* If an overflow occurs, then begin a "new" subarray
      if (sum > maxSum) {
        sum = nums[i];
        subarrays++;
      }
    }

    return subarrays <= k;
  }

  //* The search space is the range of sums [max(nums), sum(nums)]
  let left = Math.max(...nums);
  let right = nums.reduce((acc, curr) => acc + curr, 0);

  while (left < right) {
    //* `mid` represents the current "maxSum" we are testing
    const mid = left + ((right - left) >> 1);

    if (canSplit(mid)) {
      right = mid; //* Found a new min candidate, don't eliminate it
    } else {
      left = mid + 1; //* We created too many arrays, need a larger sum
    }
  }

  //* The minimized maximum sum of the optimal splits
  return left;
}

console.log(splitArray([7, 2, 5, 10, 8], 2)); //* 18
console.log(splitArray([1, 2, 3, 4, 5], 1)); //* 15
console.log(splitArray([1, 2, 3, 4, 5], 2)); //* 9

//* Time: O(n log(r)) - Where `n` is nums.length and `r` is the following range [max(nums), sum(nums)]
//* Within each while loop iteration, we do O(n) work to check for the split validity
//* The total search space is halved within each iteration

//* Space: O(1) - The memory usage remains constant regardless of input size
