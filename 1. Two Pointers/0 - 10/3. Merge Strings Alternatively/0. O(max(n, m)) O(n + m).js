//* Use the Two Pointer technique, we have to track the progress through two strings simultaneously
//* I chose to use an array because it is more performant than multiple string concatenations
//*     - "a" + "b" = "ab" + "c" = "abc" etc
//*     - Every iteration we have to do an O(n) loop where "n" is the input length to add them to the NEW string
//* We are essentially using the same logic as:
//*     - The Merge portion of Merge Sort
//*     - Merge Two Sorted Arrays
//*     - Merge Two Linked Lists
//* The inputs don't have to have the same length, so one pointer will reach the end before the other
//* We can't predict which it will be, so prepare for both cases with two separate for loops
//*     - We can repeatedly add the remaining strings in the leftover characters to the array
function mergeStringsAlternatively(word1, word2) {
  //* Two Pointers - one for each string
  let left = 0;
  let right = 0;

  //* String Builder (more performant than string concatenation "n" times)
  const string = [];

  while (left < word1.length && right < word2.length) {
    if (left < word1.length) {
      string.push(word1[left++]);
    }

    if (right < word2.length) {
      string.push(word2[right++]);
    }
  }

  //* We don't know which string finished early
  while (left < word1.length) {
    string.push(word1[left++]);
  }

  while (right < word2.length) {
    string.push(word2[right++]);
  }

  return string.join("");
}

console.log(mergeStringsAlternatively("ab", "qrts")); //* "aqbrts"
console.log(mergeStringsAlternatively("abc", "xyz")); //* "axbycz"
console.log(mergeStringsAlternatively("", "xyz")); //* "xyz"
console.log(mergeStringsAlternatively("abc", "")); //* "abc"
console.log(mergeStringsAlternatively("q", "t")); //* "qt"
console.log(mergeStringsAlternatively("abc", "pqr")); //* "apbqcr"

//* Time: O(max(n, m)) - The time taken scales linearly with the longest of the two strings
//* So technically the true time complexity is O(max(word1.length, word2.length))
//* n = word1.length
//* m = word2.length

//* Space: O(n + m) - The returned value is the combination of BOTH input strings
//* You can either do string concatenation (which means "n" string concatenations happen)
//* Or just push to an array (like a Java StringBuilder) and turn it into a string at the very end
//* JavaScript has immutable strings, so we can't modify them in-place
