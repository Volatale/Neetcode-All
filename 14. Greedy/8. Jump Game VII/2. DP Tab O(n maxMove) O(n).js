//* The logic works the same as Jump Game II
//*     - Except the number of jumps is between the range [minJump, maxJump]
function canReach(s, minJump, maxJump) {
  //* It is impossible to make it to the end
  if (s[s.length - 1] === "1") return false;

  const n = s.length;

  //* dp[i] = Whether or not we can reach the goal from "i"
  const dp = new Array(n).fill(false);

  //* Last index is not a "1", (we start at the goal)
  dp[n - 1] = true;

  for (let i = n - 2; i >= 0; i--) {
    //* Can't make any moves from this position
    if (s[i] === "1") continue;

    //* Make between [minJump, maxJump] jumps ahead
    for (let j = minJump; i + j <= Math.min(i + maxJump, s.length - 1); j++) {
      if (s[i + j] === "0") {
        dp[i] = dp[i] || dp[i + j];
      }
    }
  }

  //* Whether or not we can get to goal from index 0
  return dp[0];
}

console.log(canReach("011010", 2, 3)); //* True
console.log(canReach("01101110", 2, 3)); //* False
console.log(canReach("01110", 4, 4)); //* True
console.log(canReach("00000", 1, 1)); //* True
console.log(canReach("01", 1, 1)); //* False
console.log(canReach("011", 1, 2)); //* False
console.log(canReach("00000001", 1, 7)); //* False

//* Time: O(maxJump * n) - We are caching the results of each subproblem
//* The maximum number of jumps is bounded by maxJump

//* Space: O(n) - We have "n" unique subproblems to cache
