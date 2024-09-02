//* At each step, either draw a line between elements, or don't
//* If we DON'T draw a line, we need to handle two more cases
//*     - Skip current element in nums1
//*     - Skip current element in nums2
//* Take the maximum of all of these cases

//! Recurrence Relation: F(i, j) = max(F(i + 1, j + 1), F(i + 1, j), F(i, j + 1))
//* Apply tabulation to avoid recursion overhead
function maxUncrossedLines(nums1, nums2) {
  //* There cannot be any lines drawn
  if (nums1.length === 0 || nums2.length === 0) return 0;

  const n = nums1.length;
  const m = nums2.length;

  //* dp[i][j] = Maximum lines we can get ending at i in nums1 and j in nums[2]
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (nums1[i - 1] === nums2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[n][m];
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
//* So we need an n x m matrix
