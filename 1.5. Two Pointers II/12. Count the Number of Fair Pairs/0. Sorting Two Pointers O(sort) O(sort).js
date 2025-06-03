//* We are given two integers `lower` and `higher` and an int[]
//* The goal is to count the total number of pairs such that:
//*     - 0 <= i < j < n
//*     - lower <= nums[i] + nums[j] <= upper
//* Essentially, we cannot reuse the same index in a pair, and the sum of the values must be within the valid range
//* Instead of checking each pair in a brute force manner, we can use a more efficient approach
//! Ultimately, we need to find the maximum subarray such that the two boundary elements form a valid "fair" pair
//* By sorting the array, we can introduce monotonicity, which ensures that nums[i] <= nums[i + 1] <= ... <= nums[n - 1]
//* If the boundary elements form a valid pair, and the above invariant holds true, then every possible subarray in this range is ALSO valid
//* Since we always need to know what the boundary element is, we can use a two pointer approach
//* Sorting the array is valid since addition is commutative (a + b = b + a)
//*     - We don't necessarily care about the pairs themselves, only that the number of pairs is correct
//! Use the "Exactly(k)" variation to guarantee the correct result
//* Simply reducing the sum relative only to the `upper` value alone will not guarantee a correct result
function countFairPairs(nums, lower, upper) {
  function count(val) {
    let fairPairs = 0;

    //* Two pointer approach to find the boundary elements
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
      //* Sum is too large, need a smaller sum
      while (left < right && nums[left] + nums[right] > val) {
        right--;
      }

      fairPairs += right - left;
      left++;
    }

    return fairPairs;
  }

  //* Sorting the array introduces monotonicity, which enables two pointers
  nums.sort((a, b) => a - b);

  //* count(upper) gives all pairs <= upper, count(lower - 1) gives pairs < lower
  //* Difference gives no. of pairs between lower and upper inclusive
  return count(upper) - count(lower - 1);
}

debugger;
console.log(countFairPairs([1, 1, 1, 1], 2, 2)); //* 6
console.log(countFairPairs([0, 1, 7, 4, 4, 5], 3, 6)); //* 6
console.log(countFairPairs([1, 7, 9, 2, 5], 11, 11)); //* 1
console.log(countFairPairs([1, 2, 3, 4], 0, 10)); //* 6

//* Time: O(sort) - The time taken to sort depends on the internal sorting algorithm used
//* It takes O(n) to find all of the fair pairs

//* Space: O(sort) - The memory usage scales with the sorting algorithm used
