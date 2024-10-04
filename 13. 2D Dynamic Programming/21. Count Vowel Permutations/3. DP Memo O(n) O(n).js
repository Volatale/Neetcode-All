//* Track the previously chosen element
//*     - This lets us know where we can go on the NEXT call
//* By pre-determining the choices we can make from each character
//*     - We can avoid redundant paths
//* We start the call for each of the 5 vowels
//*     - This lets us use each character as a potential starting character
//*     - Which ultimately effects the number of valid paths we get

//* Apply memoization to avoid redundant work
//*     - We have 2D state (n, prevChar)
function countVowelPermutations(n) {
  function countWays(n, prevChar) {
    //* Base Case: Found a valid string of length "length"
    if (n === 0) return 1;

    //* Utilize memoized value
    const key = `${n}-${prevChar}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    let ways = 0;

    //* Explore every possible "next" character from the prev
    for (const vowel of links[prevChar]) {
      ways = (ways + countWays(n - 1, vowel)) % MOD;
    }

    return (memo[key] = ways);
  }

  const MOD = 10 ** 9 + 7;

  //* We start our call from each of these
  const vowels = ["a", "e", "i", "o", "u"];

  const links = {
    a: ["e"],
    e: ["a", "i"],
    i: ["a", "e", "o", "u"],
    o: ["i", "u"],
    u: ["a"],
  };

  const memo = {};

  let totalWays = 0;

  //* We have 5 different vowels to use as the initial character
  for (const vowel of vowels) {
    totalWays = (totalWays + countWays(n - 1, vowel)) % MOD;
  }

  return totalWays;
}

console.log(countVowelPermutations(1)); //* 5
console.log(countVowelPermutations(2)); //* 10
console.log(countVowelPermutations(5)); //* 68
console.log(countVowelPermutations(10)); //* 1739

//* Time: O(n) - We are memoizing the results of each subproblem
//* There are "n" possible values for "n" itself, and 5 possible values for "prevChar"
//* That gives us n * 5 unique subproblems

//* Space: O(n) - Since there are n * 5 unique subproblems, there are n * 5 unique keys/values in the worst case
//* The depth of the recursion tree scales with "n"
//* The links object and vowels array always us the same amount of space regardless of input size (constant space)
