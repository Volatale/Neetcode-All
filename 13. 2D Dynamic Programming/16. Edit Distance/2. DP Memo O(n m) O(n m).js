//* Similar to Longest Common Subsequence
//* Exceot we have THREE choices instead of two
//* If the characters match, we don't need to perform any operations
//*     - Just progress both i and j at th esame time
//* When we insert/delete, we insert/delete at the CURRENT index
//*     - So essentially, either i or j will stay the same, respectively
//*     - While the other one progresses
//!     - Conceptually, one of the strings would "change" if we literally inserted/deleted
//*         - So that is why one of the pointers does not mov
//*         - "" vs "abc"
//*             - Inserting an "a" does not move the "i" pointer, only the "j" pointer
//*             - We basically forced a match by inserting an "a"
//* When replacing, progress both i and j
//*     - Neither string needs to be modified, but this counts as an operation

//* Apply memoization to avoid redundant work
//*     - We have 2D state (i, j)
function minDistance(word1, word2) {
  function getDistance(i, j) {
    if (i === word1.length) return word2.length - j; //* Insert the rest of the characters
    if (j === word2.length) return word1.length - i; //* Delete the rest of the characters

    //* Utilize memoized value
    const key = `${i}-${j}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    let operations = Infinity;

    //* Case 1: Both characters match; doesn't count as operation
    if (word1[i] === word2[j]) {
      operations = Math.min(operations, getDistance(i + 1, j + 1));
    } else {
      //* Case 2: They don't match; try all three operations
      const insertOp = getDistance(i, j + 1); //* One character less to match on j's side
      const deleteOp = getDistance(i + 1, j); //* One character less to match on i's side (total chars - 1)
      const replaceOp = getDistance(i + 1, j + 1); //* Replacing char changes both (one char less to match on both sides)

      operations = Math.min(insertOp, deleteOp, replaceOp) + 1;
    }

    return (memo[key] = operations);
  }

  const memo = {};
  return getDistance(0, 0);
}

console.log(minDistance("", "abc")); //* 3
console.log(minDistance("horse", "ros")); //* 3
console.log(minDistance("intention", "execution")); //* 5
console.log(minDistance("xyz", "fgh")); //* 3
console.log(minDistance("qwertyuyupopds", "ds")); //* 12
console.log(minDistance("zxcvbnmqwertyuiop", "ros")); //* 15
console.log(minDistance("abcd", "")); //* 4
console.log(
  minDistance("ydaskjdsfwiodwaldaskl", "fjowakdlsakdlsdowklawdwasgejfdkal")
); //* 23
console.log(minDistance("abc", "abc")); //* 0

//* Time: O(n * m) - We are memoizing the results of each subproblem
//* There are "n" possible indices for word1 and "m" possible indices for word2
//* That gives us n * m unique subproblems

//* Space: O(n * m) - Since there are n * m unique subproblems, there are an equivalent amount of keys in the worst case
//* The height of the recursion tree scales with the size of both word1 and word2
