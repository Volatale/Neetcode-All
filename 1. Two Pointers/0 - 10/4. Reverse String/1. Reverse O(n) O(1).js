//* We need to reverse an input string (in the form of an array)
//* The most brute solution would be to simply call reverse()
function reverseString(s) {
  return s.reverse();
}

console.log(reverseString(["h", "e", "l", "l", "o"])); //* ["o", "l","l","e","h"]
console.log(reverseString(["H", "a", "n", "n", "a", "h"])); //* ["o", "l","l","e","h"]
console.log(reverseString(["a", "b", "c"])); //* ["c", "b", "a"]

//* Time: O(n) - There are "n" characters in the input, so it takes O(n) to reverse them

//* Space: O(1) - The memory usage remains constant - reverse is an inplace algorithm
