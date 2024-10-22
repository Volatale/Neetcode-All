//* We only have two options at each step
//*     - Append an "a"
//*     - Change the final character
//* Either way, we end up at the target using the minimum number of moves
//*     - It is impossible to use more moves than necessary
//*     - Just don't modify the last character more than we need to
//*         - Otherwise it takes another cycle of 26 characters to fix it
function stringSequence(target) {
  const string = [];
  const results = [];

  //* Try to match every character
  for (let char of target) {
    //* Press key 1
    string.push("a");
    results.push(string.join(""));

    //* Keep pressing key 2 until the characters match
    while (string[string.length - 1] !== char) {
      const lastChar = string.at(-1).charCodeAt(0);

      //* Modify last character
      string[string.length - 1] =
        lastChar < 122 ? String.fromCharCode(lastChar + 1) : "a";
      results.push(string.join(""));
    }
  }

  return results;
}

console.log(stringSequence("abc")); //* ["a", "aa", "ab", "aba", "abb", "abc"]
console.log(stringSequence("a")); //* ["a"]
console.log(stringSequence("d")); //* ["a", "b", "c", "d"]
console.log(stringSequence("xyz"));

//* Time: O(n^2) - We iterate through the entire string
//* Within each iteration, in the worst case we build a string of length "n" (twice)

//* Space: O(n^2) - The results array scales with the length of the input
//* We also potentially create temporary strings within each iteration
//* The creation of the temporary strings increases the space usage
