//* There are pockets throughout the array that are monotonically non-decreasing
//*     - This problem is essentially the same as Longest Increasing Subsequence
//*         - Except we care about the length of longest (non-decreasing) subsequences
//* Use Binary Search (lower bound) to find the insertion position of each element
//*     - The returned index + 1 = Length of longest obstacle course ending at index i
function longestObstacleCourseAtEachPosition(obstacles) {
  if (obstacles.length === 0) return [];

  const subsequence = [];
  const results = [];

  //* Find the FIRST (leftmost) index where each element should be placed
  for (let i = 0; i < obstacles.length; i++) {
    const index = lowerBound(subsequence, obstacles[i]);

    if (index < subsequence.length) {
      subsequence[index] = obstacles[i]; //* Overwrite the value at that index
    } else {
      subsequence.push(obstacles[i]); //* Otherwise, extend the the subsequence
    }

    //* Index + 1 = Length of Longest Obstacle Course
    results[i] = index + 1;
  }

  return results;
}

//* Find the FIRST (leftmost) index where target "should" be placed
function lowerBound(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = left + ((right - left) >> 1);

    //* We want to find the LEFTMOST insertion index
    if (arr[mid] > target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

console.log(longestObstacleCourseAtEachPosition([1, 2])); //* [1, 2]
console.log(longestObstacleCourseAtEachPosition([1, 2, 3, 2])); //* [1, 2, 3, 3]
console.log(longestObstacleCourseAtEachPosition([2, 2, 1])); //* [1, 2, 1]
console.log(longestObstacleCourseAtEachPosition([3, 1, 5, 6, 4, 2])); //* [1, 1, 2, 3, 2, 2]
console.log(longestObstacleCourseAtEachPosition([1, 2, 1, 3])); //* [1, 2, 1, 3]
console.log(longestObstacleCourseAtEachPosition([5, 5, 5, 5])); //* [5, 5, 5, 5]
console.log(longestObstacleCourseAtEachPosition([])); //* []
console.log(longestObstacleCourseAtEachPosition([3, 1, 2, 3])); //* [1, 1, 2, 3]

//* Time: O(n log n) - We have "n" elements in total
//* For each element we perform a binary search on the subsequence array
//* The binary search takes O(log n) (where n depends on the length of the subsequence array itself, not nums)
//* But the length of the subsequence array is bounded by the input array (in the worst case where nums[i + 1] >= nums[i])

//* Space: O(n) - The subsequence array can hold "n" elements in the worst case
//* If every element in obstacles is monotonically non-decreasing, our array will hold "n" elements
