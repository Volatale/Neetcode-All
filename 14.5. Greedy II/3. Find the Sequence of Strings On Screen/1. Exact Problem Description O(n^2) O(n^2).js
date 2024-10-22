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
  let i = 0; //* Only progress "i" if the indices match

  while (i < target.length) {
    if (string.length <= i) {
      string.push("a");
      results.push(string.join(""));
    } else {
      const char = string[i].charCodeAt(0);

      //* Push next alphabetical character
      char < 122
        ? (string[i] = String.fromCharCode(char + 1))
        : (string[i] = "a");
      results.push(string.join(""));
    }

    //* Move to next character if they match
    if (string[i] === target[i]) {
      i++;
    }
  }

  return results;
}

console.log(stringSequence("abc")); //* ["a", "aa", "ab", "aba", "abb", "abc"]
console.log(stringSequence("a")); //* ["a"]
console.log(stringSequence("d")); //* ["a", "b", "c", "d"]
console.log(stringSequence("xyz"));

//* Time: O(n^2) - We iterate through the entire string
//* Within each iteration, in the worst case we build a string of length "n"

//* Space: O(n) - The results array scales with the length of the input
//* We also potentially create temporary strings within each iteration
