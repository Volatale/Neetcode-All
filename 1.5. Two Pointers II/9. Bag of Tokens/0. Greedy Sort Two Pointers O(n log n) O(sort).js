//* We start with an intial power and a score of 0, as well as tokens[], where tokens[i] denotes the value of the token
//* The goal is to MAXIMIZE the total score by playing tokens optimally
//!     - We can only play tokens that have not already been played
//* To play a token face-up, our power must be >= tokens[i]
//*     - In which case we lose tokens[i] power, and gain 1 score
//* To play a token face-down, our power must be >= 1
//*     - In which case we gain tokens[i] power, and lose 1 score
//* In order to play optimally, we need to determine the optimal time to make both of the above choices
//* Since our tokens will DECREASE upon playing a token face-up, we want to MINIMIZE that cost
//* And since our tokens will INCREASE upon playing a token face-down, we want to MAXIMIZE that value
//! If we sort the array, and then use a two pointer approach, we can always make the optimal decision
//*     - This also allows us to avoid playing the same token twice (since we'll increment/decrement the pointers accordingly)
//* Otherwise we'd have to try every possible permutation, which would take O(n!)
//* In order to maximize our score, we greedily choose to play face-up where possible
function bagOfTokensScore(tokens, power) {
  //* Sorting introduces monotonicity, which allows for a two pointer approach
  tokens.sort((a, b) => a - b);

  //* Left indicates the optimal face-up play, right indicates the optimal face-down play
  let left = 0;
  let right = tokens.length - 1;

  let score = 0;
  let maxScore = 0;

  while (left <= right) {
    if (power >= tokens[left]) {
      //* Play token face-up
      power -= tokens[left++];
      score++;
      maxScore = Math.max(maxScore, score);
    } else if (score > 0) {
      //* Play token face-down
      power += tokens[right--];
      score--;
    } else {
      //* Unable to make a play
      break;
    }
  }

  return maxScore;
}

console.log(bagOfTokensScore([100], 50)); //* 0
console.log(bagOfTokensScore([200, 100], 150)); //* 1
console.log(bagOfTokensScore([100, 200, 300, 400], 200)); //* 2
console.log(bagOfTokensScore([1, 4, 7, 8, 5], 7)); //* 2
console.log(bagOfTokensScore([0, 0, 0, 0, 0], 0)); //* 5

//* Time: O(sort) - Sorting the tokens array takes O(n log n) on average (depends on the algorithm used)
//* Actually playing the game only takes O(n)

//* Space: O(sort) - The memory usage scales with the sorting algorithm used
//* If that memory is excluded, then the memory usage is constant
