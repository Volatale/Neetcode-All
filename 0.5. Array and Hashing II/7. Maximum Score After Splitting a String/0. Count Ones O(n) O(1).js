//* We "could" handle this in a brute force manner
//*     - But doing so would mean nested for loops
//* Instead of doing that, we can simply check how many 1s exist in the string
//* Then, iterate through the string (up until index n - 1)
//* We initially assumed all of the 1s existed on the right
//* So now we are going to "move" things to the left
//*     - This simulates the creation of a "left" substring
//* If s[i] === "0", then we increment zeroes
//*     - We do NOT decrement ones because a zero is ONLY counted on the left (not on the right)
//*         - Hence we are not losing any score by moving a 0 to the left
//* If s[i] === "1", then we decrement ones
//*     - We are losing a one (which contributes to the score when on the right)
//*     - Zeroes are not incremented because we are not putting an extra 0 on the left
//! Why does this work? Only one element is changing per split
//*     - Only one element is going to be changing sides
function maxScore(s) {
  //* We need to be able to make 2 non empty substrings (length >= 2)
  if (s.length < 2) return 0;

  let maximumScore = 0;
  let zeroes = 0;
  let ones = 0;

  //* Get the number of ones in the input
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "1") {
      ones++;
    }
  }

  //* Assume "everything" is on the left, gradually move things to the right
  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] === "0") {
      zeroes++; //* Add the zero that was on the right to the left
    } else {
      ones--; //* This one WAS in the right portion, but not anymore
    }

    maximumScore = Math.max(maximumScore, zeroes + ones);
  }

  return maximumScore;
}

console.log(maxScore("011101")); //* 5
console.log(maxScore("00111")); //* 5
console.log(maxScore("0000")); //* 3
console.log(maxScore("1111")); //* 3
console.log(maxScore("010101")); //* 4

//* Time: O(n) - We are iterating through the entire string (twice technically)

//* Space: (1) - The memory used does not scale with the input size
