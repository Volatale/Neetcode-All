//* We either decide to rob the first or leave it
//* If we do, we cannot rob the final (nums[0]) house

//! Recurrence Relation: F(n) = max(F(n-2) + nums[n],F(n-1)
//! Return 0 if i < 0
//! Return nums[0] if i = 0 AND !robbedFirst, else 0

//* The recurrence relation tells us we only need the two previous states
//*     - Avoid making arrays of length n
//* Just call robHouses starting from 0 to n - 2
//* Then call it again from 1 to n - 1
//* Take the maximum of both calls
function rob(nums) {
  function robHouses(start, end) {
    let first = 0; //* F(n-2)
    let second = 0; //* F(n-1)

    //* F(n) = max(F(n-2) + nums[i], F(n-1))
    for (let i = start; i <= end; i++) {
      const third = Math.max(first + nums[i], second);
      first = second;
      second = third;
    }

    return second;
  }

  //* Base Cases
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);

  const n = nums.length;

  //* Take the maximum of both cases; rob houses 0 to n-2, and 1 to n-1
  return Math.max(robHouses(0, n - 2), robHouses(1, n - 1));
}

console.log(rob([2, 3, 2])); //* 3
console.log(rob([1, 2, 3, 1])); //* 4
console.log(rob([1, 2, 3])); //* 3

//* Time: O(n) - We need to perform two loops in total
//* The first handles the case where we DO rob the first house
//* The second handles the case where we DIDN'T rob the first house

//* Space: O(n) - There are 2 * n possible subproblems
//* But since we always create two arrays, the 2 is constant
