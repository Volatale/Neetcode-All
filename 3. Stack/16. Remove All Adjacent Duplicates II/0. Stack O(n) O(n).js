//* We are given a string `s` and an integer `k`
//* The goal is to make repeated removals of `k` adjacent duplicate characters
//*     - Keep repeating removals until it is no longer possible
//* A removal can, in and of itself, create further removals
//*     - For example: "aabbcccbcc", k = 3
//*     - The "ccc" is removed, which leaves us with "aabbbcc"
//*     - Since "bbb" is "k-adjacent", we need to remove those too, but we couldn't until "ccc" was removed first
//* So in other words, some removals are dependent on other removals happening first
//* Since we are working with adjacency, we can handle this using a stack
//* But "k" can essentially be any number >= 1, so we should track the number of adjacent duplicates of the current character
//*     - "aabbba", k = 3 would result in "" after all removals are done
//* All we have to do is push tuples of the character itself, along with the no. of consecutive occurrences up to index "i"
//*     - Like so: [char, adjacentOccurrences]
//*     - "aaabb": at index 1, we'd have [["a", 2]]
//*     - Then, at index 2, we'd have [["a", 3]], so we need to pop the "a"
//* Since we are working with tuples, we can simply iterate over the stack's elements at the very end and .repeat() the occurrences
function removeDuplicates(s, k) {
  const stack = []; //* Stores tuples of [char, adjacentOccurrences]
  const string = []; //* String builder (more efficient than repeated string concatenation)

  for (let char of s) {
    if (stack.length > 0 && char === stack[stack.length - 1][0]) {
      stack[stack.length - 1][1]++; //* Add an occurrence

      //* Remove the character(s) if there are `k` adjacent occurrences
      if (stack[stack.length - 1][1] === k) {
        stack.pop();
      }
    } else {
      stack.push([char, 1]); //* Found an occurrence of a "new" character
    }
  }

  //* Concatenate all of the occurrences of the remaining characters
  for (let [char, occurrences] of stack) {
    string.push(char.repeat(occurrences));
  }

  //* Concatenate all of the characters in one operation
  return string.join("");
}

console.log(removeDuplicates("aaa", 3)); //* ""
console.log(removeDuplicates("aabbbax", 3)); //* "x"
console.log(removeDuplicates("abcd", 2)); //* "abcd"
console.log(removeDuplicates("adeeeddad", 3)); //* "aa"
console.log(removeDuplicates("deeedbbcccbdaa", 3)); //* "aa"
console.log(removeDuplicates("abcd", 2)); //* "abcd"

//* Time: O(n) - The time taken scales with the input size
//* In the worst case, no removals happen, and the stack holds up to `n` characters

//* Space: O(n) - The memory usage scales with the input size in the worst case
