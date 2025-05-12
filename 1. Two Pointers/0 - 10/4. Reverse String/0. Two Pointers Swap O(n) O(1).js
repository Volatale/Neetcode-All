//* We need to reverse an input string (in the form of an array)
//* Reversing the string via a method is probably the most method
//* However, we can also simply use two pointers for a more algorithmic approach
//* Both pointers initialize to opposite ends of the input array
//* Then, simply swap(s[left], s[right]) in place
//* After the swap, increment left and decrement left
//*     - Every index before "left" is reversed
//*     - Every index after "right" is also reversed
function reverseString(s) {
  //* These pointers mark the next characters to swap
  let left = 0;
  let right = s.length - 1;

  //* Swap each character in-place
  while (left < right) {
    swap(s, left, right);
    left++;
    right--;
  }
}

function swap(s, left, right) {
  const temp = s[left];
  s[left] = s[right];
  s[right] = temp;
}

console.log(reverseString(["h", "e", "l", "l", "o"])); //* ["o", "l","l","e","h"]
console.log(reverseString(["H", "a", "n", "n", "a", "h"])); //* ["o", "l","l","e","h"]
console.log(reverseString(["a", "b", "c"])); //* ["c", "b", "a"]

//* Time: O(n) - There are "n" characters in the input, so it takes O(n) to reverse them

//* Space: O(1) - The memory usage remains constant - reverse is an inplace algorithm
