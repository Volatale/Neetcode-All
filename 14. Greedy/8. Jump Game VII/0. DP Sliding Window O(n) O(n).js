function canReach(s, minJump, maxJump) {
  //* It is impossible to make it to the end
  if (s[s.length - 1] === "1") return false;

  const n = s.length;

  //* dp[i] = Whether or not we can reach index "i"
  const dp = new Array(n).fill(false);
  dp[0] = true;

  let pre = 0; //* Number of previous positions we can jump from

  for (let i = 1; i < n; ++i) {
    if (i >= minJump && dp[i - minJump]) {
      pre++;
    }

    if (i > maxJump && dp[i - maxJump - 1]) {
      pre--;
    }

    dp[i] = pre > 0 && s[i] == "0";
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

//* Time: O(n) - We iterate through the array once

//* Space: O(n) - The DP array scales with the number of elements in the input
