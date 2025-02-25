//* Strings in JavaScript are immutable, so convert the string into an array
//* Then, we simply need to reverse each word
//* "i" is used to mark the FIRST index of a word
//* And "j" is used to mark the LAST index of a word
//* So we are essentially using a two pointer approach
//* Reverse all of the characters in the range [i, j]
//* When we reverse a word, set i = j (we don't want to process them again)
function reverseWords(s) {
  //* Split the string so we can reverse it
  const string = s.split("");

  for (let i = 0; i < string.length; i++) {
    //* Skip empty strings
    if (string[i] === " ") continue;

    //* Tracks the END of the current word
    let j = i;

    //* Move the "j" pointer to the end of the current word (" ")
    while (j + 1 < string.length && string[j + 1] !== " ") {
      j++;
    }

    //* Then reverse the string
    reverse(string, i, j);
    i = j;
  }

  return string.join("");
}

function reverse(s, left, right) {
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++, right--;
  }
}

console.log(reverseWords("Let's take LeetCode contest"));
console.log(reverseWords("Hi! My name's Goku and I'm a saiyan, from earth!"));
console.log(reverseWords("Mr Ding"));

//* Time: O(n) - We process each character twice at most

//* Space: O(n) - The "string" array's size scales with the input size
