function smallestDivisorGivenThreshold(nums, threshold) {
  function divideAll(divisor) {
    let sum = 0;

    //* Divide all the elements by divisor, and sum the results
    for (let i = 0; i < nums.length; i++) {
      sum += Math.ceil(nums[i] / divisor);
    }

    return sum;
  }

  //! Reduce version
  //   const divideAllII = (divisor) =>
  //     nums.reduce((acc, curr) => (acc += Math.ceil(curr / divisor)), 0);

  //* Minimum (positive) divisor has to be 1
  //* Maximum divisor is the largest value in nums (imagine [10], 10)
  let left = 1;
  let right = Math.max(...nums);

  //* Left & right congregate to the smallest valid value
  while (left < right) {
    //* Mid represents the divisor we are testing
    let mid = left + ((right - left) >> 1);

    if (divideAll(mid) <= threshold) {
      right = mid; //* Mid is a potential value, don't eliminate mid
    } else {
      left = mid + 1; //* Divisor is too small, eliminate left
    }
  }

  //* Smallest divisor that results in <= threshold
  return left;
}

console.log(smallestDivisorGivenThreshold([1, 2, 5, 9], 6)); //* 5
console.log(smallestDivisorGivenThreshold([44, 22, 33, 11, 1], 5)); //* 44
console.log(smallestDivisorGivenThreshold([10], 10)); //* 1

//* Time: O(n log(m)) - The range of divisors scales with the maximum value in nums
//* Within each binary search O(log n), there is a for loop, that at worst, can take O(n) time

//* Space: O(1) - The space usage remains constant regardless of input size
