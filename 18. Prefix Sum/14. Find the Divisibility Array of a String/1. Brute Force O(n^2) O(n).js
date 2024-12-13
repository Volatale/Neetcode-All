//* Try all "n" substrings start from 0 up to n - 1
function divisibilityArray(word, m) {
  //* Assume nothing is divisible by m
  const div = new Array(word.length).fill(0);

  //* Check the divisibility for "n" strings
  for (let i = 0; i < word.length; i++) {
    const num = parseInt(word.substring(0, i + 1));

    //* Numeric value from [0,...,i] is divisible by m
    if (num % m === 0) {
      div[i] = 1;
    }
  }

  return div;
}

console.log(divisibilityArray("998244353", 3)); //* [1, 1, 0, 0, 0, 1, 1, 0, 0]
console.log(divisibilityArray("1010", 10)); //* [0, 1, 0, 1]
console.log(divisibilityArray("525920321", 2)); //* [0, 1, 0, 0, 1, 1, 0, 1, 0]

//* Time: O(n^2) - We only have a single for loop, but the substring() call within does O(n) work itself (in the worst case)
//* So we get O(n) * O(n) = O(n^2)

//* Space: O(n) - The div array scales with word.length (n)
//* In the worst case, we create a string (using substring()) whose length === n
