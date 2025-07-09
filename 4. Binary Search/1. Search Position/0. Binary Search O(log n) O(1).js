//* Given a SORTED array of distinct integers, we need to find "target"
//* The goal is to return the index of target if it is found
//* And if it isn't, return the index where it "would" be
//* The input array exhibits monotonicity
//*     - (nums[i] < nums[i + 1] < ... < nums[n-1])
//* Additionally, the search space is the array itself (+ 1 because it could be the nth index)
//* Thus, we can use a binary search approach to solve the problem
//* In our case, we need to use "modified" binary search
//* We can't always eliminate the current index
function searchInsert(nums, target) {
  //* The search space is the array itself
  let left = 0;
  let right = nums.length;

  while (left < right) {
    //* The index we are searching
    const mid = left + ((right - left) >> 1);

    if (nums[mid] >= target) {
      right = mid; //* Search the left
    } else {
      left = mid + 1; //* Search the right
    }
  }

  //* The index of target, or the index it "would" be
  return left;
}

console.log(searchInsert([1, 3, 5, 6], 5)); //* 2
console.log(searchInsert([0, 1, 2, 3], 4)); //* 4
console.log(searchInsert([1, 3, 4, 5], 2)); //* 1
console.log(searchInsert([1, 5, 7, 10], 4)); //* 1
console.log(searchInsert([1, 5, 7, 10], 2)); //* 1
console.log(searchInsert([1], 0)); //* 0
console.log(searchInsert([1], 2)); //* 1

//* Time: O(log n) - Each iteration of the loop, we eliminate half of the search space

//* Space: O(1) - The memory usage does not scale with the input size
