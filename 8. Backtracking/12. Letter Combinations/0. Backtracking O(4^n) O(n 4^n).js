//* Create a mapping of numbers to an array of strings
//* At each level of recursion, get the current digit's array
//* Iterate over that array to ensure we can create very combination
//* The base case is if curr.length === digits
//* We building "curr" (a string) up to an entire combination
//*     - Each combination is "digits" length long
function letterCombinations(digits) {
  //* There are no combinations if this "digits" empty
  if (digits.length === 0) return [];

  const mapping = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };

  const results = [];
  backtrack(0, "", mapping, digits, results);
  return results;
}

function backtrack(start, curr, mapping, digits, results) {
  //* Base Case; we are building "curr" to be digits.length
  //* Each combination has a size === "digits" length
  if (curr.length === digits.length) {
    results.push(curr);
    return;
  }

  //* Use the current character to get the array of chars mapped to it
  const selectedChars = mapping[digits[start]];

  //* Iterate over every character in that array
  for (let char of selectedChars) {
    backtrack(start + 1, curr + char, mapping, digits, results);
  }
}

console.log(letterCombinations("23"));
console.log(letterCombinations(""));
console.log(letterCombinations("252"));
console.log(letterCombinations("777"));

//* Time: O(4^n) - In the worst case, we get a number like "7777" or "9999"
//* 7 and 9 have an array of length 4 whereas the others are all length 3
//* Therefore, in the worst case, each recursive call creates 4 more calls
//* The depth of the recursion scales with the length of digits
//* So branchingFactor ^ treeDepth = 4^n

//* Space: O(n * 4^n) - The depth of the recursion scales with "n"
//* In the worst case, there are 4^n combinations (repeated 7s or 9s)
//* Each combination is a string of length "n"
