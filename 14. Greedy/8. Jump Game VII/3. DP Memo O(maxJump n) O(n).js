//* The logic works the same as Jump Game II
//*     - Except the number of jumps is between the range [minJump, maxJump]
function canReach(s, minJump, maxJump) {
  function makeJumps(i, memo) {
    //* Out of Bounds, or invalid spot
    if (i >= s.length || s[i] === "1") return false;

    //* Successfully made it to last index
    if (i === s.length - 1) return true;

    //* Utilize memoized value
    if (memo.hasOwnProperty(i)) return memo[i];

    //* Make any amount of jumps from "i" in range [minJump, maxJump]
    for (let j = minJump; j <= maxJump; j++) {
      if (makeJumps(i + j, memo)) {
        return (memo[i] = true);
      }
    }

    return (memo[i] = false);
  }

  return makeJumps(0, {});
}

console.log(canReach("011010", 2, 3)); //* True
console.log(canReach("01101110", 2, 3)); //* False
console.log(canReach("01110", 4, 4)); //* True
console.log(canReach("00000", 1, 1)); //* True
console.log(canReach("01", 1, 1)); //* False
console.log(canReach("011", 1, 2)); //* False

//* Time: O(maxJump * n) - We are memoizing the results of each subproblem
//* The branching factor scales with "maxJump" and there are "n" possible indices

//* Space: O(n) - We have "n" unique subproblems to cache
