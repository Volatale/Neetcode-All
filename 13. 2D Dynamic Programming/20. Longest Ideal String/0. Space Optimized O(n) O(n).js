//* A subsequence is just a subset, but we retain the relative ordering of the elements
//*     - In this case, it means we can't take characters OUT of order
//*     - Therefore, this means we can't sort/manipulate the order of any characters
//* At each step, either include or exclude the current character
//*     - We can only include if the absolute difference of the alphabet order is <= k
//* We have no heuristic that we can use to influence our decision to make better choices
//*     - So we need to try every possible subsequence (brute force)

//* Apply tabulation to avoid redundant work
//*     - We have 2D state (i, prevVal)
//*         - Since there are only 26 lowercase English characters
//*         - That also means there are only 26 possible alphabetical values [1:=26]
function longestIdealString(s, k) {
  const n = s.length;

  //* dp[i][prevVal] = Length of longest ideal string starting at index 0
  let dp = new Array(26 + 1).fill(0);

  for (let i = 0; i < n; i++) {
    const newRow = [...dp];
    const charValue = s[i].charCodeAt(0) - 97 + 1; //* Ascii to Alphabet

    for (let prevVal = 1; prevVal <= 26; prevVal++) {
      const diff = Math.abs(prevVal - charValue);

      if (diff <= k) {
        newRow[charValue] = Math.max(newRow[charValue], dp[prevVal] + 1);
      }
    }

    dp[charValue] = newRow[charValue];
  }

  return Math.max(...dp);
}

console.log(longestIdealString("abc", 3)); //* 3
console.log(longestIdealString("wwwwww", 0)); //* 1
console.log(longestIdealString("acfgbd", 2)); //* 4
console.log(longestIdealString("adg", 3)); //* 3

//* Time: O(n) - We are memoizing the results of each subproblem
//* There are "n" possible values for "i" and 26 possible "prevVals" (there are 26 possible characters)
//* n * 26 = O(n * 26) = O(n)

//* Space: O(1) - The DP arrays are always 26 length, so the space used is constant
