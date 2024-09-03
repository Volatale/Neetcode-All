//* At each step, either draw a line between elements, or don't
//* If we DON'T draw a line, we need to handle two more cases
//*     - Skip current element in nums1
//*     - Skip current element in nums2
//* Take the maximum of all of these cases

//! Recurrence Relation: F(i, j) = max(F(i + 1, j + 1), F(i + 1, j), F(i, j + 1))
//* This problem is basically Longest Common Subsequence

//* Apply memoization to avoid redundant work
function maxUncrossedLines(nums1, nums2) {
  function crossLines(i, j, memo) {
    //* Base Case: No more elements to connect
    if (i === nums1.length || j === nums2.length) return 0;

    //* Utilize memoized value
    const key = `${i}-${j}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    if (nums1[i] === nums2[j]) {
      //* Case 1: Connect the elements
      return (memo[key] = crossLines(i + 1, j + 1, memo) + 1);
    } else {
      //* Case 2 & 3: Try progressing "i" or "j"
      return (memo[key] = Math.max(
        crossLines(i + 1, j, memo),
        crossLines(i, j + 1, memo)
      ));
    }
  }

  return crossLines(0, 0, {});
}

console.log(maxUncrossedLines([1, 4, 2], [1, 2, 4])); //* 2
console.log(maxUncrossedLines([2, 5, 1, 2, 5], [10, 5, 2, 1, 5, 2])); //* 3
console.log(maxUncrossedLines([1, 3, 7, 1, 7, 5], [1, 9, 2, 5, 1])); //* 2
console.log(maxUncrossedLines([1, 1, 1], [1, 1, 1])); //* 3
console.log(maxUncrossedLines([1, 2, 3], [3, 2, 1])); //* 1
console.log(maxUncrossedLines([5], [4, 5, 6, 7, 8])); //* 1

//* Time: O(n * m) - There are two non-constant parameters (i and j)
//* n = nums1 length and m = nums2 length
//* (n + 1) * (m + 1) = nm + 2 = O(n * m)

//* Space: O(n * m) - There are n * m + 2 unique subproblems to store
//* So the memo object scales with the size of both inputs
//* The depth of the recursion tree scales with n + m in the worst case
