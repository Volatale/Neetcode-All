//* At each level of recursion, try every substring
//* Start is static for each stack frame
//* "i" increments, so the substring for each stack increases by 1 each iteration
//*     - Example: 4 -> 43 -> 432 -> 4321
//* If the CURRENT substring === prevVal - 1
//*     - Travel down this path
//* Else, don't travel down this path; it is a waste of time
//* Pass i + 1 since we cannot reuse the same index again
function splitString(s) {
  //* Try every possible starting substring
  for (let i = 0; i < s.length - 1; i++) {
    const val = parseInt(s.substring(0, i + 1));
    if (backtrack(i + 1, val, s)) return true;
  }

  return false;
}

function backtrack(start, prevVal, s) {
  //* Base Case; Managed to sucessfully make it to the end of the string
  if (start === s.length) {
    return true;
  }

  //* Try every combination of substrings for each level
  for (let i = start; i < s.length; i++) {
    const num = parseInt(s.substring(start, i + 1));

    //* Ensure this number is ONE LESS than prev
    //* Pass i + 1 because we can't reuse the same index again
    if (num === prevVal - 1) {
      if (backtrack(i + 1, num, s)) return true;
    }
  }

  //* Failed to split string into descending consecutive values
  return false;
}

console.log(splitString("4321")); //* True (descending order)
console.log(splitString("0090089")); //* True
console.log(splitString("050043")); //* True
console.log(splitString("001")); //* False
console.log(splitString("1234")); //* False (ascending order)
console.log(splitString("1")); //* False (ascending order)

//* Time: O(n^n) - The depth of the recursion is "n"
//* "start" increases by 1 each successive call to backtrack
//* Each call to backtrack generates "n" branches
//* branchingFactor ^ depthOfRecursion = n^n
//* But we prune branches, so the actual runtime is a lot lower than n^n

//* Space: O(n) - The depth of the recursion is "n"
//* Each call to backtracking creates a substring that can be "n" length in the worst case
//* We DO create substrings at each level of recursion (which can be O(n) space usage at worst)
//* But these substrings are transient; they exist only briefly
//* The substrings are also not stored on each stack frame
