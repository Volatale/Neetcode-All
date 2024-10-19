//* We already know sliding window will work here
//* So count how many times we find a sequence of "AAA" and "BBB"
//* This is a more literal version of sliding window
//*     - Start at index 1 so we can look back
//*     - End at index n-1 so we can look forward
function winnerOfGame(colors) {
  //* Alice can't make a move so she loses
  if (colors.length === 1) return false;

  let aliceScore = 0;
  let bobScore = 0;

  //* Look at the previous, current and next characters for matches
  for (let i = 1; i < colors.length - 1; i++) {
    if (colors[i - 1] === colors[i] && colors[i] === colors[i + 1]) {
      colors[i] === "A" ? aliceScore++ : bobScore++;
    }
  }

  //* If both scores are equal, it is Alice's turn, but she can't make a move
  return aliceScore > bobScore ? true : false;
}

console.log(winnerOfGame("AAABABB")); //* True
console.log(winnerOfGame("AA")); //* False
console.log(winnerOfGame("ABBBBBBBAAA")); //* False
console.log(winnerOfGame("AAABBB")); //* False (alice can't make her move)
console.log(winnerOfGame("B")); //* False (alice can't make her move)
console.log(winnerOfGame("AAABB")); //* True (bob can't make his move)

//* Time: O(n) - We iterate through the entire array, so the time taken scales with input size

//* Space: O(1) - We are only using constant space variables
