//* Apply recursion
//*     - At each level we want to subtract 1 and 2
//*     - Keep doing this until we hit one of the two base cases
function climbStairs(n) {
  function climb(n) {
    if (n < 0) return 0; //* Traveled too far, does not count as a way
    if (n === 0) return 1; //* Traveled to the top, counts as a way

    //* Recurrence relation is f(n) = f(n - 1) + f(n - 2)
    return climb(n - 1) + climb(n - 2);
  }

  return climb(n);
}

console.log(climbStairs(2)); //* 2
console.log(climbStairs(3)); //* 3
console.log(climbStairs(4)); //* 5
console.log(climbStairs(5)); //* 8
console.log(climbStairs(8)); //* 34

//* Time: O(2^n) - At each level of recursion, there are TWO additional calls made
//* Branching factor is 2, depth of recursion tree is "n"
//* The smallest number we can subtract at each step is 1
//* So if "n" is 5, the maximum depth of the recursion will be 5 (5 - 1 - 1 - 1 - 1 - 1) = 0

//* Space: O(n) - The depth of recursion scales linearly
//* Since we can reduce "n" by 1 at each step, the maximum depth of the recursion tree is "n"
