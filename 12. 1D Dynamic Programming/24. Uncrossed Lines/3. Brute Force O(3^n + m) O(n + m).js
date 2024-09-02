//* At each step, either draw a line between elements, or don't
//* If we DON'T draw a line, we need to handle two more cases
//*     - Skip current element in nums1
//*     - Skip current element in nums2
//* Take the maximum of all of these cases

//! Recurrence Relation: F(i, j) = max(F(i + 1, j + 1), F(i + 1, j), F(i, j + 1))
function maxUncrossedLines(nums1, nums2) {
  function crossLines(i, j) {
    //* Base Case: No more elements to connect
    if (i === nums1.length || j === nums2.length) return 0;

    let lines = 0;

    //* Case 1: Connect the elements
    if (nums1[i] === nums2[j]) {
      lines = crossLines(i + 1, j + 1) + 1;
    }

    //* Case 2: Try progressing "i"
    lines = Math.max(lines, crossLines(i + 1, j));

    //* Case 3: Try progressing "j"
    lines = Math.max(lines, crossLines(i, j + 1));

    return lines;
  }

  return crossLines(0, 0);
}

console.log(maxUncrossedLines([1, 4, 2], [1, 2, 4])); //* 2
console.log(maxUncrossedLines([2, 5, 1, 2, 5], [10, 5, 2, 1, 5, 2])); //* 3
console.log(maxUncrossedLines([1, 3, 7, 1, 7, 5], [1, 9, 2, 5, 1])); //* 2
console.log(maxUncrossedLines([1, 1, 1], [1, 1, 1])); //* 3
console.log(maxUncrossedLines([1, 2, 3], [3, 2, 1])); //* 1
console.log(maxUncrossedLines([5], [4, 5, 6, 7, 8])); //* 1

//* Time: O(3^max(n,m)) - At each step there are three different cases to consider
//* If both numbers are equal, we can draw a line between them
//* Otherwise, we need to progress EITHER i or j (which is 2 choices)
//* The branching factor is 3 and the depth of the recursion tree is n + m
//* The inputs do not necessarily have the same length

//* Space: O(n + m) - The inputs are not required to have the same length
//* So the depth of the recursion tree scales with the length of both nums1 and nums2
