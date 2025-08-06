//* We are given an int[] and a threshold (also int)
//* Our task is to choose some `divisor`, then divide every element in int[] by divisor
//*     - Whilst doing so, we need to sum the quotients of each division (floored)
//! The result of the above operation (the sum) should be <= threshold
//* We want to find the SMALLEST possible `divisor` such that the above constraint holds
//* So, we have a constraint and something to measure against
//* The problem exhbits a monotonic property
//*     - There is a series of "success" (true) cases, followed by a series of "failure" (false) cases
//* We want to find the SMALLEST success value
//* Thus, we have a search space in the range of possible divisors
//* We can't divide by 0, so the minimum possible divisor has to be 1
//* The maximum possible divisor is the maximum element in nums
//! We can apply a binary search approach since we have:
//*     - The monotonic property (a series of success values followed by infinite failure values)
//*     - A search space (that happens to also be sorted)
//* Specifically, we binary search over the range of possible divisors
//*     - left = 1 (can't divide by 0)
//*     - right = Math.max(...nums) (imagine a situation like call([10], 10))
//*     - `mid` represents the current divisor we are trying
//* For each `divisor` (mid), we will sum the quotients of each division and return
//*     - If the sum <= threshold, then we found a candidate
//*     - Else, the sum > threshold, so we need a larger divisor
function smallestDivisor(nums, threshold) {
  function canDivide(divisor) {
    let sum = 0;

    //* Divide all elements by divisor, sum quotients as we go
    for (let i = 0; i < nums.length && sum <= threshold; i++) {
      sum += Math.ceil(nums[i] / divisor);
    }

    return sum <= threshold;
  }

  //* Our search space is the range of possible divisors [1, max(nums)]
  let left = 1;
  let right = Math.max(...nums);

  while (left < right) {
    const mid = left + ((right - left) >> 1);

    if (canDivide(mid)) {
      right = mid; //* Found a potential candidate; don't eliminate from search space
    } else {
      left = mid + 1; //* Need a larger sum; increase the divisor
    }
  }

  //* The smallest possible divisor that satifies our constraint
  return left;
}

console.log(smallestDivisor([1, 2, 5, 9], 6)); //* 5
console.log(smallestDivisor([44, 22, 33, 11, 1], 5)); //* 44
console.log(smallestDivisor([10], 10)); //* 1

//* Time: O(n log r) - Where `r` is the range of possible divisors [1, max(nums)]
//* Within each while loop iteration, we iterate over the entire nums array (n)

//* Space: O(1) - The memory usage remains constant regardless of input size
