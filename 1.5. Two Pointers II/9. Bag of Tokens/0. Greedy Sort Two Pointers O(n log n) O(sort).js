//* The only operation that actually GETS us some score is operation 1
//* But we can ONLY play tokens face-up if we have enough "power"
//* Regardless of the token's value, our score only goes up by 1 per face-up play
//* So logically speaking, to MAXIMIZE our score, we want to MAXIMIZE the amount of tokens played face-up
//* Since the score only increases by 1 per face-up play (regardless of the token's value)
//*     - Our goal becomes "play as many tokens face-up as possible"
//* Prioritizing the lower-valued tokens effectively MINIMIZES the reduction to "power"
//* We ONLY want to play tokens face-down if we CAN'T play them face-up
//*     - Why? Because playing tokens face-down REDUCES our score, which we don't really want to do
//* To ensure we always have the best possible choice for each step, we can employ a Greedy approach
//*     - Sort the array in ascending order
//*     - Then use Two Pointers to track what will be played face-up and what gets played face-down
//* We ALWAYS play elements at tokens[left], since we know these are LOWER valued
//*     - Which gives us the highest chance to play LATER tokens since the reduction to "power" is MINIMIZED
function bagOfTokensScore(tokens, power) {
  //* There are no tokens to play, thus our max score is 0
  if (tokens.length === 0) return 0;

  let score = 0;
  let maxScore = 0;

  //* Sort the tokens in a monotonically non-decreasing order
  tokens.sort((a, b) => a - b);

  //* Ideally, we play "left" tokens face up and "right" tokens face down
  let left = 0;
  let right = tokens.length - 1;

  while (left <= right) {
    if (power >= tokens[left]) {
      //* Play face-up
      power -= tokens[left++];
      maxScore = Math.max(maxScore, ++score);
    } else if (score > 0) {
      //* Play face-down (but only if we have score to spend)
      power += tokens[right--];
      score--;
    } else {
      //* Neither is possible, break the loop
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

//* Time: O(n log n) - We have to sort the tokens array, so this takes n log n
//* Then, we iterate over the entire array in the worst case (all n elements)

//* Space: O(sort) - The memory usage scales depending on the sorting algorithm used
