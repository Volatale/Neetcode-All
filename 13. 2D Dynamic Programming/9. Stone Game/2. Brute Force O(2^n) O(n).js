//* Alice starts, then Bob, then Alice again etc
//* We ONLY care about whether or not Alice's score > Bob's score
//*     - If Alice's score - Bob's score > 0, Alice's score was higher
//*     - If Alice's score - Bob's score < 0, Bob's score was higher
//* Both players are playing OPTIMALLY, which means we need to try every possible choice at each step
//*     - We have no idea what the "optimal" move is until we have seen all of them
//!         - Hence, this is a Brute Force problem
//!         - We can apply Dynamic Programming since we have the "optimal substructure" property
//*     - There are two choices to make (take leftmost, or, take rightmost)
//*     - We transition the state by "1" each step, so the height of the recursion tree is "n"
//! piles[left] and piles[right] represent either Alice's or Bob's score at this level
//*     - Then we SUBTRACT from that score, the opponent's score at the current stack frame
//*         - So we have (Alice - Bob) in every "odd" call
//*         - Then we have (Bob - Alice) in every "even" call
//*     - This logic works because we only care about who's is higher
//!         - We DON'T necessarily care about the scores themselves
function stoneGame(piles) {
  function takeStones(left, right) {
    //* No more stones to consider
    if (left > right) return 0;

    let maxStones = -Infinity;

    //* Case 1: Take stone from beginning
    maxStones = Math.max(maxStones, piles[left] - takeStones(left + 1, right));

    //* Case 2: Take stone from end
    maxStones = Math.max(maxStones, piles[right] - takeStones(left, right - 1));

    return maxStones;
  }

  //* Does Alice have more points than Bob?
  return takeStones(0, piles.length - 1) > 0 ? true : false;
}

console.log(stoneGame([7, 10])); //* True
console.log(stoneGame([5, 1, 100, 6])); //* True
console.log(stoneGame([5, 3, 4, 5])); //* True
console.log(stoneGame([3, 7, 2, 3])); //* True

//* Time: O(2^n) - There are two choices to make at each step; take from left or take from right
//* The height of the recursion tree scales with "n" since we transition the state by 1 each call

//* Space: O(n) - The space used scales with the input size since we can be at most (n + 1) calls deep
