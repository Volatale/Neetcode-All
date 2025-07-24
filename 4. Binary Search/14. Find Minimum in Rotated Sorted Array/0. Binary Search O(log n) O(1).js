//* We have an array of length `n` that has been rotated between 1 and `n` times
//* The goal is to return the MINIMUM element in the sorted array
//* We can make some observations:
//*     - The array is sorted (exhibits monotonicity)
//*     - All of the elements are unique
//*     - We are searching for something within the array itself
//*         - i.e. our search space is the array
//* We can apply binary search here and eliminate the majority of the possiblities in each iteration
//* The search space is the array itself
//*     - left = 0
//*     - right = nums.length - 1
//* If nums[mid] > nums[right]
//*     - Then we know there is a monotonically increasing subarray to our right
//*     - left = mid + 1
//* Otherwise, there is one to our left
//*     - Search the left
//*     - right = mid
function findMin(nums) {
  //* The search space is the array itself
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    //* Mid represents the current index we are searching
    const mid = left + ((right - left) >> 1);

    if (nums[mid] > nums[right]) {
      left = mid + 1; //* The minimum exists in the right subarray (partition)
    } else {
      right = mid; //* We either found the minimum or it exists in the left subarray (partition)
    }
  }

  //* The minimum element in the array
  return nums[left];
}

console.log(findMin([1, 2, 3, 4, 5])); //* 1
console.log(findMin([5, 6, 3, 4])); //* 3
console.log(findMin([15, 17, 11, 13])); //* 11
console.log(findMin([20])); //* 20
console.log(findMin([1, 30])); //* 1
console.log(findMin([4, 5, 6, 7, 0, 1, 2])); //* 0

//* Time: O(log n) - The search space (n) is halved within each iteration

//* Space: O(1) - The memory usage remains constant regardless of input size
