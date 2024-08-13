//* Apply Dynamic Programming (memoization)
//* We have the following properties
//*     - Optimal Substructure
//*         - F(n) = F(n-1) + F(n-2)
//*         - F(n) = number of ways from step "n"
//*     - Overlapping Subproblems
function climbStairs(n) {
  function climb(n, memo) {
    if (memo.hasOwnProperty(n)) return memo[n]; //* Utilize memoized values
    if (n < 0) return 0; //* Traveled too far, does not count as a way
    if (n === 0) return 1; //* Traveled to the top, counts as a way

    //* Recurrence relation is f(n) = f(n - 1) + f(n - 2)
    memo[n] = climb(n - 1, memo) + climb(n - 2, memo);
    return memo[n];
  }

  return climb(n, {});
}

console.log(climbStairs(2)); //* 2
console.log(climbStairs(3)); //* 3
console.log(climbStairs(4)); //* 5
console.log(climbStairs(5)); //* 8
console.log(climbStairs(8)); //* 34

//* Time: O(n) - There is only one non-constant parameter, "n"
//* In the worst case, we only compute "n" solutions

//* Space: O(n) - The depth of recursion scales linearly
//* The memo object contains "n" keys (one key per f(n)) in the end
