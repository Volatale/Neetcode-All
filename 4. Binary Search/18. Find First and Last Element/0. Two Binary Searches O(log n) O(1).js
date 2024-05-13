//* Perform two binary searches
//* Find the lower bound (leftmost) of target
//* Find the upper bound (rightmost) of target
//* The binary searches will return -1 if target does not exist
//* So all we have to do is record the indices of both calls
//* If target only exists in ONE index in the input
//* Then the start and end positions are the same
function findFirstAndLastElement(nums, target) {
  let left = lowerBound(nums, target);
  let right = upperBound(nums, target);

  return [left, right];
}

//* Return the leftmost target
function lowerBound(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    //* Mid represents the index of the element we are checking
    //* "right - left" ensures a LEFT-biased mid
    let mid = left + ((right - left) >> 1);

    if (nums[mid] >= target) {
      right = mid; //* Search the left side, but don't eliminate mid (could be our value)
    } else {
      left = mid + 1;
    }
  }

  //* We ONLY want values that are target
  return nums[left] === target ? left : -1;
}

//* Return the rightmost target
function upperBound(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    //* Mid represents the index of the element we are checking
    //* "right - left + 1" ensures a RIGHT-biased mid
    let mid = left + ((right - left + 1) >> 1);

    if (nums[mid] <= target) {
      left = mid; //* Search the right side, don't eliminate mid
    } else {
      right = mid - 1;
    }
  }

  //* We ONLY want values that are target
  return nums[left] === target ? left : -1;
}

console.log(findFirstAndLastElement([5, 7, 7, 8, 8, 10], 8)); //* [3, 4]
console.log(findFirstAndLastElement([1, 2, 3, 4, 5], 6)); //* [-1, -1]
console.log(findFirstAndLastElement([1, 2, 3, 3], 2)); //* [1, 1]
console.log(findFirstAndLastElement([4, 5, 5, 6], 5)); //* [1, 2]
console.log(findFirstAndLastElement([10], 10)); //* [0, 0]
console.log(findFirstAndLastElement([3, 4, 5, 5, 7, 8], 5)); //* [2, 3]

//* Time: O(log n) - It takes O(log n) to perform ONE binary search
//* We halve the search space each iteration of the loop
//* TWO binary searches are performed in total, so O(log n) + O(log n)
//* But that simplifies to O(log n)

//* Space: O(1) - The space usage remains constant regardless of the input size
//* We only use constant space variables
