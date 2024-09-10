//* There are an EVEN number of piles
//* The TOTAL sum of all stones is ODD
//!     - Therefore it is impossible to tie
//* Alice starts the game, then it becomes Bob's turn
//*     - She can choose ALL even indices
//*     - Or she can choose ALL odd indices
//* Take this example: [5, 1, 100, 6]
//*     - If Alice chooses index 0 (even)
//*         - Bob can only choose index 1, or index 3 (odd indices)
//*     - Then, if Bob were to choose index 3 (odd)
//*         - Alice can choose either index 1 or 2
//! Essentially, Alice has full control over the game
//*     - She can take the optimal path (highest sum) between all even, or all odd indices
//*     - Therefore, ALICE WILL ALWAYS WIN
function stoneGame(piles) {
  return true;
}

console.log(stoneGame([7, 10])); //* True
console.log(stoneGame([5, 1, 100, 6])); //* True
console.log(stoneGame([5, 3, 4, 5])); //* True
console.log(stoneGame([3, 7, 2, 3])); //* True

//* Time: O(1)

//* Space: O(1)
