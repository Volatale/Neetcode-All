//* We are trying to detect the most recent character found on the stack
//* Then compare that with the ith character
//* If they match, increment the frequency of the top element
//* If the frequency === k, that means you found 3 of that character in a row
//* So pop it from the stack
//* If they don't match, just push a new tuple of [char, 1] because its not in a row
//* Then, we need to iterate through the stack and rebuild the string
function removeAllAdjacentDuplicates(s, k) {
  //* Track the consecutive frequency of characters found so far
  //* This lets us track the state of [char, count]
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    //* If the top char of the stack matches the current char
    if (stack.length > 0 && s[i] === stack[stack.length - 1][0]) {
      stack[stack.length - 1][1]++; //* Update the consecutive frequency of this char

      //* If the consecutive count === k, pop this element
      if (stack[stack.length - 1][1] === k) {
        stack.pop();
      }
    } else {
      stack.push([s[i], 1]); //* New element, so push a new state to track
    }
  }

  //* Rebuild the string using the stack's contents
  const string = [];

  for (let [char, count] of stack) {
    string.push(char.repeat(count));
  }

  return string.join("");
}

console.log(removeAllAdjacentDuplicates("aaa", 3)); //* "x"
console.log(removeAllAdjacentDuplicates("aabbbax", 3)); //* "x"
console.log(removeAllAdjacentDuplicates("abcd", 2)); //* "abcd"
console.log(removeAllAdjacentDuplicates("adeeeddad", 3)); //* "aa"
console.log(removeAllAdjacentDuplicates("deeedbbcccbdaa", 3)); //* "aa"
console.log(removeAllAdjacentDuplicates("abcd", 2)); //* "pbbcggttciiippooaais"

//* Time: O(n) - We keep track of the consecutive frequencies in the stack
//* It takes α(1) time to push to the stack, and O(1) to pop from it
//* Then we have another loop to rebuild the string - at worst, this takes O(n) time

//* Space: O(n) - At worst, the input is entirely unique
//* That means the stack would have "n" elements
//* "sonic" -> [["s", 1], ["o", 1], ["n", 1], ["i", 1], ["c", 1]]
//* Length 5
