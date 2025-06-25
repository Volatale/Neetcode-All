//* We are given a string `s` and we need to make as many "duplicate removals" as possible
//* A "duplicate" in this case is two adjacent identical characters
//*     - In "aaabbc", we'd get "ac", since "aa" and "bb" are removed
//* Since proximity is the key here, we can handle characters left to right or right to left
//* A stack works here because we know we only remove if the previous character is equal to the current
//*     - If the top of the stack === s[i], pop the stack and simply move onto the next iteration
function removeDuplicates(s) {
  //* Holds the final string and allows us to detect duplicates
  const stack = [];

  for (let char of s) {
    if (stack.length > 0 && char === stack[stack.length - 1]) {
      stack.pop(); //* Pop the duplicate, and simply move on
    } else {
      stack.push(char); //* Otherwise, add the element to the stack (not a duplicate)
    }
  }

  //* Whatever is left on the stack becomes our final string
  return stack.join("");
}

console.log(removeDuplicates("abbaca")); //* "ca"
console.log(removeDuplicates("azxxzy")); //* "ay"
console.log(removeDuplicates("aabbcc")); //* ""
console.log(removeDuplicates("yx")); //* "yx"
console.log(removeDuplicates("paapo")); //* "o"
console.log(removeDuplicates("aaaaaa")); //* ""
console.log(removeDuplicates("abaabawo")); //* "wo"

//* Time: O(n) - The time taken scales with the size of the input

//* Space: O(n) - The memory usage scales with the input size
