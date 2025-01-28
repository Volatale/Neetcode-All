//* We either turn "0000" into "0101" or "1010"
//* So both cases must be handled
//*     - We "could" do this using two loops, but that is less efficient
//* Ultimately, the easiest way to detect whether we need to toggle s[i] is:
//*     - If the index is odd, the number should be "1"
//*     - If the index is even, the number should be "0"
//* If either of these cases are NOT the case, we need to make a change
//* Since there are two cases to handle
//* We can take the minimum of min(changes, n - changes)
//*     - Changes handles the "0101" case
//*     - And n - changes handles the "1010" case
//* Remember, if we make a change, the "future" elements may need to change too
function minOperations(s) {
  let n = s.length;
  let changes = 0;

  //* For even indices, expect a 0, for odd, expect a 1; if not, change it
  for (let i = 0; i < n; i++) {
    if (i & 1) {
      changes += s[i] === "0" ? 1 : 0;
    } else {
      changes += s[i] === "1" ? 1 : 0;
    }
  }

  //* Handle both cases (turn n into 1010 or 0101) at once
  return Math.min(changes, n - changes);
}

console.log(minOperations("0100")); //* 1
console.log(minOperations("10")); //* 0
console.log(minOperations("1111")); //* 2
console.log(minOperations("0000")); //* 2
console.log(minOperations("101011")); //* 1

//* Time: O(n) - We iterate through the entire input string
//* So the time taken scales with the input

//* Space: O(1) - We are not using any additional space that will scale with input size
