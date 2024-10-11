//* Use a sliding window approach
//* We can make any number of jumps in the range [minJump, maxJump]
//*     - A "range" can be thought of as a sliding window
//*     - In this case, it would be a fixed size sliding window (i + minJump, i + maxJump)
//* Track the number of "valid" positions we can jump from
//* dp[i - minJump] and dp[i - maxJump - 1] IMPLICITLY check for "0"
//*     - We only set dp[i] to true if s[i] itself is true (because we can jump to this index)
//*     - Technically we could also check for s[i - minJump] === "0" etc, but it would be redundant
function canReach(s, minJump, maxJump) {
  //* It is impossible to make it to the end
  if (s[s.length - 1] === "1") return false;

  const n = s.length;

  //* dp[i] = Whether or not "i" is reachable
  const dp = new Array(n).fill(false);
  dp[0] = true;

  //* Window tracks no. of valid indices we can jump FROM (to i)
  let valid = 0;

  for (let i = 1; i < n; i++) {
    //* We can now begin making jumps (from i - minjump to here)
    if (i >= minJump && dp[i - minJump]) {
      valid++;
    }

    //* Moved past maxJump range (remove element from window)
    if (i > maxJump && dp[i - maxJump - 1]) {
      valid--;
    }

    //* Valid > 0 means there is at least 1 valid way to get here
    dp[i] = valid > 0 && s[i] == "0";
  }

  //* Whether or not we can reach the last index
  return dp[n - 1];
}

console.log(canReach("000", 1, 2)); //* True
console.log(canReach("011010", 2, 3)); //* True
console.log(canReach("01101110", 2, 3)); //* False
console.log(canReach("01110", 4, 4)); //* True
console.log(canReach("00000", 1, 1)); //* True
console.log(canReach("01", 1, 1)); //* False
console.log(canReach("011", 1, 2)); //* False
console.log(canReach("00000001", 1, 7)); //* False

//* Time: O(n) - We iterate through the entire array once
//* So the time taken scales with the input size

//* Space: O(n) - The DP array scales with the number of elements in the input
