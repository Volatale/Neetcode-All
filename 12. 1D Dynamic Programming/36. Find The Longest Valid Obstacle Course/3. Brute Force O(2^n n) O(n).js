//* At each index, we can either include or exclude the current element
//* This problem is essentially just the Longest Increasing Subsequence problem
//*     - Except it is a Longest Non-decreasing Subsequence performed "n" times

//! TLE
function longestObstacleCourseAtEachPosition(obstacles) {
  function getLongestCourse(i) {
    //* The obstacle course always includes itself (always 1)
    let maxLength = 1;

    //* Consider every element at indices up to i
    for (let j = 0; j < i; j++) {
      if (obstacles[j] <= obstacles[i]) {
        maxLength = Math.max(maxLength, getLongestCourse(j) + 1);
      }
    }

    return maxLength;
  }

  //* Every obstacle course includes at least itself
  const results = new Array(obstacles.length).fill(1);

  //* For each index, calculate the longest course ending at index i
  for (let i = 0; i < obstacles.length; i++) {
    results[i] = getLongestCourse(i);
  }

  return results;
}

console.log(longestObstacleCourseAtEachPosition([1, 2])); //* [1, 2]
console.log(longestObstacleCourseAtEachPosition([1, 2, 3, 2])); //* [1, 2, 3, 3]
console.log(longestObstacleCourseAtEachPosition([2, 2, 1])); //* [1, 2, 1]
console.log(longestObstacleCourseAtEachPosition([3, 1, 5, 6, 4, 2])); //* [1, 1, 2, 3, 2, 2]

//* Time: O(2^n * n) - At each index, we have two choices; include or exclude the current element
//* The branching factor is 2; the depth of the recursion scales with "n"
//* So getLongestCourse() takes O(2^n), but we perform this "n" times (once for each index)

//* Space: O(n) - The results array scales with "n", and so does the recursion depth
