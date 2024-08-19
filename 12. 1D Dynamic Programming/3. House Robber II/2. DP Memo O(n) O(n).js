//* We either decide to rob the first or leave it
//* If we do, we cannot rob the final (nums[0]) house

//! Recurrence Relation: F(n) = max(F(n-2) + nums[n],F(n-1)
//! Return 0 if i < 0
//! Return nums[0] if i = 0 AND !robbedFirst, else 0
function rob(nums) {
  function robHouses(i, end) {
    if (i < end) return 0; //* No houses left to rob

    const key = `${i}-${end}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    const result = Math.max(
      robHouses(i - 2, end) + nums[i], //* Rob the current house
      robHouses(i - 1, end) //* Skip the current house
    );

    memo[key] = result;
    return result;
  }

  //* Base Case
  if (nums.length === 1) return nums[0];

  const n = nums.length;

  const memo = {};
  return Math.max(
    robHouses(n - 2, 0), //* Rob first house, skip last
    robHouses(n - 1, 1) //* Skip first, rob last
  );
}

console.log(rob([2, 3, 2])); //* 3
console.log(rob([1, 2, 3, 1])); //* 4
console.log(rob([1, 2, 3])); //* 3

//* Time: O(n) - There are 2 * n subproblems that we can memoize
//* One where end = 0 and another where end = 1

//* Space: O(n) - Since there are 2 * n possible subproblems to compute
//* That also means there are 2 * n possible keys we can have at most
//* There are two variants of each subproblem; one with end = 0, and another with end = 1
