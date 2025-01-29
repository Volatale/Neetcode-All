//* In order to make all of the strings equal
//* We first need to know how many strings we need to make equal
//* If words.length === 3, then we need to make three strings equal
//* The total number of characters must be divisible by words.length
//*     - If not, it would be impossible to evenly split the characters
//* The most important thing to do is track the frequency of every character
//* If the frequency of any character is NOT divisible by words.length
//*     - It means we cannot evenly split this character among all the words
//*     - So we need to return false
function makeEqual(words) {
  //* A single string is equal to itself
  if (words.length === 1) return true;

  const freq = {};
  let totalCharCount = 0;

  //* Get frequency of all characters in words[]
  for (let word of words) {
    for (let i = 0; i < word.length; i++) {
      freq[word[i]] = (freq[word[i]] || 0) + 1;
    }

    totalCharCount += word.length;
  }

  //* Check if we cannot possibly split the characters
  if (totalCharCount % words.length !== 0) {
    return false;
  }

  //* Ensure the frequency each character matches the number of words
  for (let char of Object.keys(freq)) {
    if (freq[char] % words.length !== 0) {
      return false;
    }
  }

  return true;
}

console.log(makeEqual(["abc", "aabc", "bc"])); //* True
console.log(makeEqual(["ab", "a"])); //* False
console.log(makeEqual(["ab", "a"])); //* False
console.log(makeEqual(["www", "www"])); //* True
console.log(makeEqual(["fhjj", "hf"])); //* True

//* O(n * m) - We have to get the frequency of every character in
//* "n" = words.length and "m" = the length of the longest word

//* Space: O(1) - The space usage remains constant regardless of input size
//* We are always working with the same 26 lowercase english characters (at most)
