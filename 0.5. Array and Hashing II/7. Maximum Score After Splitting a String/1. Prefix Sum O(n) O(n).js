//* Use a prefix sum array to track the total number of 1s up to each index
//* We know that oneCount[n - 1] will always be ALL of the ones
//* So we can iterate from index 1 to the end (if there are 5 indices, we do 4 splits)
//* oneCount[s.length - 1] - oneCount[i - 1]
//*     - This equation gives us the number of ones we have on the RIGHT of "i"
//* Also keep track of the cumulative number of "zeroes" found
function maxScore(s) {
  //* We need to be able to make 2 non empty substrings (length >= 2)
  if (s.length < 2) return 0;

  //* oneCount[i] = Total number of 1s found upto (and including) index i
  const oneCount = new Array(s.length).fill(0);
  oneCount[0] = s[0] === "1" ? 1 : 0;

  let zeroCount = 0;
  let maximumScore = 0;

  //* Calculate prefix sum array
  for (let i = 1; i < s.length; i++) {
    oneCount[i] = oneCount[i - 1] + (s[i] === "1" ? 1 : 0);
  }

  //* Calculate the maximum score
  for (let i = 1; i < s.length; i++) {
    zeroCount += s[i - 1] === "0" ? 1 : 0;
    const rightOnes = oneCount[s.length - 1] - oneCount[i - 1]; //* pref_i - pref_j-1
    maximumScore = Math.max(maximumScore, zeroCount + rightOnes);
  }

  return maximumScore;
}

console.log(maxScore("011101")); //* 5
console.log(maxScore("00111")); //* 5
console.log(maxScore("0000")); //* 3
console.log(maxScore("1111")); //* 3
console.log(maxScore("010101")); //* 4

//* Time: O(n) - We are iterating through the entire string (twice technically)
//* It also takes O(n) to create the oneCount array

//* Space: (n) - The memory used does not scale with the input size
