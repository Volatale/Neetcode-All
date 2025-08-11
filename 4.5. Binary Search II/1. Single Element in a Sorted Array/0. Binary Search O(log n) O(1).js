//* We are given an int[] `nums` where every element appears TWICE, except for ONE (that appears once)
//* Our goal is to return the single element
//* Ultimately, this is a frequency-related problem
//! However, we are told that the array is sorted
//*     - In other words, the array exhibits monotonicity
//* The array can be said to be sorted in non-decreasing order
//*     - Thus, nums[i] <= nums[i + 1] <= ... <= nums[n - 1]
//* We are searching for an element within the array
//* And we know the array is sorted monotonically
//! Therefore, we can likely apply binary search to optimize for time complexity
//*     - The range of potential values is [nums[0], nums[n - 1]]
//*     - The range of indices in the array is [0, n - 1]
//*     - The values are sorted in non-monotonically decreasing order (duplicates exist)
//! Mathematically speaking, the array is guaranteed to have an odd length
//* There are `m` pairs, and one extra element
//*     - Array length = n
//*         - m = (nums.length - 1) / 2
//*     - So the array length is 2n + 1
//! The single element MUST exist at one of the even indices
//* Within each iteration, we can determine which side contains MORE elements and travel in THAT direction
//*     - But we must ensure we exclude the current element in our check
//* If mid is ODD, then the left element CANNOT be out of bounds
//* If mid is EVEN, then the right element CANNOT be out of bounds
function singleNonDuplicate(nums) {
  //* The search space is our range of indices [0, n - 1]
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    //* `mid` represents the index of the element we (currently) think is the single
    const mid = left + ((right - left) >> 1);

    //* Found the single element (not equal to adjacent elements)
    if (
      (mid & 1 && nums[mid - 1] !== nums[mid]) ||
      (!(mid & 1) && nums[mid] !== nums[mid + 1])
    ) {
      right = mid; //* Found a potential candidate, or it exists on the left
    } else {
      left = mid + 1; //* The single element exists on the right portion
    }
  }

  //* The single element
  return nums[left];
}

console.log(singleNonDuplicate([1, 2, 2])); //* 1
console.log(singleNonDuplicate([1, 1, 2, 3, 3])); //* 2
console.log(singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8])); //* 2
console.log(singleNonDuplicate([3, 3, 7, 7, 10, 11, 11])); //* 10
console.log(singleNonDuplicate([50, 51, 51, 52, 52])); //* 50
console.log(singleNonDuplicate([0, 0, 1, 2, 2])); //* 1
console.log(singleNonDuplicate([5])); //* 5

//* Time: O(log n) - We eliminate half of the search space every iteration

//* Space: O(1) - The memory usage remains constant regardless of the input size
