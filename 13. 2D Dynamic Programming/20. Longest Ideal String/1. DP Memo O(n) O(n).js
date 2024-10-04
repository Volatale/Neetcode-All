//* A subsequence is just a subset, but we retain the relative ordering of the elements
//*     - In this case, it means we can't take characters OUT of order
//*     - Therefore, this means we can't sort/manipulate the order of any characters
//* At each step, either include or exclude the current character
//*     - We can only include if the absolute difference of the alphabet order is <= k
//* We have no heuristic that we can use to influence our decision to make better choices
//*     - So we need to try every possible subsequence (brute force)

//* Apply memoization to avoid redundant work
//*     - We have 2D state (i, prevVal)
//*         - Since there are only 26 lowercase English characters
//*         - That also means there are only 26 possible alphabetical values [1:=26]
function longestIdealString(s, k) {
  function findString(i, prevVal, memo) {
    //* Utilize memoized value
    const key = `${i}-${prevVal}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    let longest = 0;

    //* Case 1: Include current character
    const charValue = s[i].charCodeAt(0) - 97 + 1; //* Ascii to Alphabet
    const diff = Math.abs(prevVal - charValue);

    if (diff <= k) {
      //* Add one to include THIS character
      longest = Math.max(longest, findString(i + 1, charValue, memo) + 1);
    }

    //* Case 2: Exclude current character

    longest = Math.max(longest, findString(i + 1, prevVal, memo));

    return (memo[key] = longest);
  }

  //* Minimum s length is 1
  if (k === 0) return 1;

  return findString(0, 0, {});
}

console.log(longestIdealString("abc", 3)); //* 3
console.log(longestIdealString("wwwwww", 0)); //* 1
console.log(longestIdealString("acfgbd", 2)); //* 4
console.log(longestIdealString("adg", 3)); //* 3

//* Time: O(n) - We are memoizing the results of each subproblem
//* There are "n" possible values for "i" and 26 possible "prevVals" (there are 26 possible characters)
//* n * 26 = O(n * 26) = O(n)

//* Space: O(n) - There are n * 26 unique subproblems, thus n * 26 unique keys/values to store
//* The height of the recursion tree scales with the size of "s"
