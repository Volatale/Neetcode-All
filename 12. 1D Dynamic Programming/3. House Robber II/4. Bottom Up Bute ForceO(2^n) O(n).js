//* We either decide to rob the first or leave it
//* If we do, we cannot rob the final (nums[0]) house

//! Recurrence Relation: F(n) = max(F(n-2) + nums[n],F(n-1)
//! Return 0 if i < 0
//! Return nums[0] if i = 0 AND !robbedFirst, else 0
function rob(nums) {
  function robHouses(i, end) {
    if (i > end) return 0; //* No houses left to rob

    return Math.max(
      robHouses(i + 1, end), //* Skip the current house
      robHouses(i + 2, end) + nums[i] //* Rob the current house
    );
  }

  //* Base Case
  if (nums.length === 1) return nums[0];

  const n = nums.length;

  return Math.max(
    robHouses(0, n - 2), //* Rob first house, skip last
    robHouses(1, n - 1) //* Skip first, rob last
  );
}

console.log(rob([2, 3, 2])); //* 3
console.log(rob([1, 2, 3, 1])); //* 4
console.log(rob([1, 2, 3])); //* 3

//* Time: O(2^n) - Each call generates two more calls
//* So the branching factor is 2, and the height of the recursion tree is "n"
//* At each step, the smallest amount we can move "i" by is 1

//* Space: O(n) - The depth of the recursion tree is "n"
