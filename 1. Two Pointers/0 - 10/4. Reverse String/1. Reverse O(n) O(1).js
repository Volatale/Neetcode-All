//* Just reverse the input array
function reverseString(s) {
  return s.reverse();
}

console.log(reverseString(["h", "e", "l", "l", "o"])); //* ["o", "l","l","e","h"]
console.log(reverseString(["H", "a", "n", "n", "a", "h"])); //* ["o", "l","l","e","h"]
console.log(reverseString(["a", "b", "c"])); //* ["c", "b", "a"]

//* Time: O(n) - It takes O(n) time to reverse the input

//* Space: O(1) - The space we use remains constant
//* It does not scale with the input size
