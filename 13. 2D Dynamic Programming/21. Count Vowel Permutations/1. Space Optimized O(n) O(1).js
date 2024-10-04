//* Track the previously chosen element
//*     - This lets us know where we can go on the NEXT call
//* By pre-determining the choices we can make from each character
//*     - We can avoid redundant paths
//* We start the call for each of the 5 vowels
//*     - This lets us use each character as a potential starting character
//*     - Which ultimately effects the number of valid paths we get

//* Apply tabulation to avoid redundant work
//*     - We have 2D state (n, prevChar)
//* We only need to keep the previous row and the current row in memory simultaneously
//*     - Use bitwise alternation to reduce the space complexity to constant
function countVowelPermutations(n) {
  if (n === 1) return 5;

  const MOD = 10 ** 9 + 7;

  //* We start our call from each of these
  const vowels = ["a", "e", "i", "o", "u"];

  const links = {
    0: [1], // 'a' -> 'e'
    1: [0, 2], // 'e' -> 'a', 'i'
    2: [0, 1, 3, 4], // 'i' -> 'a', 'e', 'o', 'u'
    3: [2, 4], // 'o' -> 'i', 'u'
    4: [0], // 'u' -> 'a'
  };

  //* dp[n][prevVal] = Number of valid strings of length "n" at prevVal
  const dp = new Array(2).fill(0).map(() => new Array(5).fill(0));

  //* 1 way to make a string of length 1 using any vowel
  dp[1] = [1, 1, 1, 1, 1];

  //* Start at length 2 since 0 doesn't count, and 1 was handled
  for (let length = 2; length <= n; length++) {
    //* Reset values, we are ACCUMULATING, so we'd be using invalid values
    dp[length & 1].fill(0);

    for (let prevChar = 0; prevChar < vowels.length; prevChar++) {
      for (const nextChar of links[prevChar]) {
        dp[length & 1][nextChar] =
          (dp[length & 1][nextChar] + dp[(length - 1) & 1][prevChar]) % MOD;
      }
    }
  }

  //* Sum the total number of ways on the final row
  return dp[n & 1].reduce((acc, curr) => (acc + curr) % MOD, 0);
}

console.log(countVowelPermutations(1)); //* 5
console.log(countVowelPermutations(2)); //* 10
console.log(countVowelPermutations(5)); //* 68
console.log(countVowelPermutations(10)); //* 1739
console.log(countVowelPermutations(144)); //* 18208803

//* Time: O(n) - We are caching the results of each subproblem
//* There are "n" possible values for "n" itself, and 5 possible values for "prevChar"
//* That gives us n * 5 unique subproblems
//* n * 5 possible vowels * 4 links (in the worst case of "i")

//* Space: O(1) - We are only keeping two rows in memory at the same time, and we alternate between them
