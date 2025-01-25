//* Get the frequency of characters in chars
//*     - We need a point of reference to use to determine the "good"ness of words[i]
//* Then, we can simply iterate through words and check if each word is individually good
//* Iterate through words[i][j]
//*     - Increment the frequency of the current character
//!     - If the frequency of this character is higher than that of chars, words[i] is NOT good
//*         - At this point, we mark it as "not" good and immediately break
//*         - There is no point in checking the rest of the characters anymore
//* If the string remains good after checking all of the characters, add its length to lengthSum
function countCharacters(words, chars) {
  let lengthSum = 0;

  //* words[i] is "good" if it doesn't have any chars with higher freq
  const charsFreq = new Array(26).fill(0);

  //* Get frequency of characters in chars
  for (let char of chars) {
    charsFreq[char.charCodeAt(0) - 97]++;
  }

  //* Check if each word is good
  for (let word of words) {
    //! Object used instead, otherwise we create a 26 length array in every iteration
    const wordFreq = {};
    let isGood = true;

    //* Get the frequency of each character in this word
    for (let char of word) {
      wordFreq[char] = (wordFreq[char] || 0) + 1;

      if (wordFreq[char] > charsFreq[char.charCodeAt(0) - 97]) {
        isGood = false;
        break;
      }
    }

    if (isGood) {
      lengthSum += word.length;
    }
  }

  return lengthSum;
}

console.log(countCharacters(["cat", "bt", "hat", "tree"], "atach")); //* 6
console.log(countCharacters(["hello", "world", "leetcode"], "welldonehoneyr")); //* 10
console.log(countCharacters(["aa", "aaa", "a"], "aa")); //* 3
console.log(
  countCharacters(["wdwakdwa", "fwadacs", "fwadsd"], "awkdoawkdoawkdlsa")
); //* 8

//* Time: O(n * m) - Where "n" is words.length and "m" is the average length of words[i]
//* It takes O(26) to create the intial array, and each frequency map is (technically) O(1) to create

//* Space: O(26) - We are only working with lowercase English characters
//* We essentially delete a frequency map after each iteration, so we are always using the same amount of memory
