//* To delete a piece from the line, that piece needs to be surrounded by 2 of its color
//!     - In other words, you can only remove a piece if are 3+ consecutive pieces
//* Take this example: "AAA"
//*     - There are three "A"s in a row
//*     - Thus, we can delete the A in the middle
//*         - We CANNOT delete the first or last A (they exist on the edge of the line)
//* So all we have to do is track the number of consecutive streaks that exist
//*     - If the streak started with "A" then Alice's score would increase
//*     - Else, it had to have started with "B" so Bob's score will increase
//* Reset the count the moment we find a character that does NOT match the current tracked character
//* "AAAA" means we can delete TWO characters
//* Whoever can delete MORE characters than the other wins the game
//! If both scores are equal, BOB wins
//*     - The game starts with Alice's turn
//*     - Therefore if Alice scored 1, then Bob scored 1 it is now Alice's turn again
//*         - But Alice has no moves left to make
//! There is no move a player can make that would unlock a move for another player
//*     - That would mean we could do something like removing a B inbetween two As which is impossible
//*     - "AAABBA", here, we can only delete the second a
//*         - That would leave us with "AABBA"
function winnerOfGame(colors) {
  //* Alice can't make a move so she loses
  if (colors.length === 1) return false;

  let aliceScore = 0;
  let bobScore = 0;

  let turnChar = colors[0];
  let count = 1;

  for (let i = 1; i < colors.length; i++) {
    if (colors[i] !== turnChar) {
      count = 1; //* Reset the count
      turnChar = colors[i];
    } else {
      count++; //* Otherwise extend the count
    }

    //* We can delete the middle character(s) if we find 3+ in a row
    if (count > 2) {
      turnChar === "A" ? aliceScore++ : bobScore++;
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
