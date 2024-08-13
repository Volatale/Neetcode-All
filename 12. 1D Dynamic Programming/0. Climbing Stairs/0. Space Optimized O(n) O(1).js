//* In the tabulation version, we only need the two latest values
//* So instead of using an array, we can use some variables
function climbStairs(n) {
  if (n <= 2) return n;

  //* No. of Ways from first and second steps
  let first = 1;
  let second = 1;

  //* Get the rest of the ways up until "n"
  for (let i = 2; i <= n; i++) {
    let current = first + second; //* Next step
    first = second;
    second = current;
  }

  return second;
}

console.log(climbStairs(2)); //* 2
console.log(climbStairs(3)); //* 3
console.log(climbStairs(4)); //* 5
console.log(climbStairs(5)); //* 8
console.log(climbStairs(8)); //* 34

//* Time: O(n) - We perform an O(n) loop

//* Space: O(1) - We are using constant space since we removed the DP array
