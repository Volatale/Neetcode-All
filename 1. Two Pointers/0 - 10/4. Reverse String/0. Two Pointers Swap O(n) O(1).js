//* Use two pointers since we need to swap two elements at once
function reverseString(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    swap(s, left++, right--);
  }

  return s;
}

function swap(s, left, right) {
  let temp = s[left];
  s[left] = s[right];
  s[right] = temp;
}

console.log(reverseString(["h", "e", "l", "l", "o"])); //* ["o", "l","l","e","h"]
console.log(reverseString(["H", "a", "n", "n", "a", "h"])); //* ["o", "l","l","e","h"]
console.log(reverseString(["a", "b", "c"])); //* ["c", "b", "a"]

//* Time: O(n) - It takes O(n / 2) time to iterate over the whole input
//* But we drop constants in Big O Notation, so it simplifies to O(n)

//* Space: O(1) - The space we use remains constant
//* It does not scale with the input size
