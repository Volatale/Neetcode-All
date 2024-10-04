//* Track the previously chosen element
//*     - This lets us know where we can go on the NEXT call
//* By pre-determining the choices we can make from each character
//*     - We can avoid redundant paths
//* We start the call for each of the 5 vowels
//*     - This lets us use each character as a potential starting character
//*     - Which ultimately effects the number of valid paths we get
function countVowelPermutations(n) {
  function countWays(n, prevChar) {
    //* Base Case: Found a valid string of length "length"
    if (n === 0) return 1;

    let ways = 0;

    //* Explore every possible "next" character from the prev
    for (const vowel of links[prevChar]) {
      ways = (ways + countWays(n - 1, vowel)) % MOD;
    }

    return ways;
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

//* Time: O(4^n) - In the worst case, each call generates "4" more calls (because of the "i" links)
//* There are 5 outer loop iterations (a constant number), and the loop within each call is also constant (4 at most)
//* The depth of the recursion tree scales with "n" itself

//* Space: O(n) - The depth of the recursion tree scales with "n"
//* The links object and vowels array always us the same amount of space regardless of input size (constant space)
