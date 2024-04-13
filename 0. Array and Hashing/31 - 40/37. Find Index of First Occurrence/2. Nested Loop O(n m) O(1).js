//* If the ith character in haystack matches the first character in needle
//* We can start our substring search
//* We need to do haystack[i + j] to allow haystack to take into account the next character in "needle"
function findIndex(haystack, needle) {
  if (haystack.length < needle.length) return -1;

  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[0]) {
      for (let j = 0; j < needle.length; j++) {
        if (haystack[i + j] !== needle[j]) break;

        if (j === needle.length - 1) return i;
      }
    }
  }

  return -1;
}

console.log(findIndex("sonic", "ic")); //* 3
console.log(findIndex("supermario", "mario")); //* 5
console.log(findIndex("a", "b")); //* -1
console.log(findIndex("a", "a")); //* 0

//* Time: O(n * m) - The outer loop iterates through each character in haystack (haystack.length) (n)
//* The inner loop iterates through every character in needle (m)

//* Space: O(1) - The space complexity does not scale with the input; in fact, we use no space at all
