//! Choose a subset of cuboids and place them ontop of each other
//* We can place cuboid "i" on cuboid "j" if:
//*     - width_i <= width_j
//*     - length_i <= length_j
//*     - height_i <= height_j
//* You can rearrange cubioids dimension by rotating it
//* However, rotation means for each cuboid, there are 6 permutations (3!)
//*     - To save time, we could generate each rotation beforehand
//*     - But we know that only ONE permutation per cuboid will actually be beneficial
//! Instead, we should try to avoid rotating altogether
//* By sorting the cuboids internally (as in, the dimensions [w, l, h]), we can avoid rotating
//*     - The cuboid's dimensions will become monotonically increasing
//*     - At that point, rotations don't help because we already have the "best" orientation
//! Why does this work?
//* By normalizing the ordering of dimensions, we create an INVARIANT:
//*     - w <= l <= h for every cuboid
//* Each cuboid is stored in a consistent, canonical form
//*     - Thus, we don't need to consider multiple orientations
//*     - We already have the best rotation for each cuboid
//! Here's an example:
//* Imagine we have a cuboid [5, 3, 8], normally, we have 6 possible orientations:
//*     - [5, 3, 8]
//*     - [3, 5, 8],
//*     - [8, 3, 5], etc.
//* If we ALWAYS sort it as [3, 5, 8], then we have IMPLICITLY rotated it into the best form:
//*     - The smallest dimension is always the width
//*     - The middle dimension is always the length
//*     - The largest dimension is always the height
//* Any valid stacking must follow the invariant:
//*     - w_i <= w_j, l_i <= l_j, h_i <= h_j
//* Sorting this way means whenever a cuboid can be stacked, it would have been possible in one of the original 6 orientation
//! We don't lose any stacking possibilities because every valid configuration was already achievable via some rotation
//! Finally, we sort the cuboids globally based on their dimensions
//*     - This ensures the cuboids are sorted in a monotonically non-decreasing order
//* Now, the problem has been reduced to a regular Longest Increasing Subsequence
//*     - Which means a Dynamic Programming approach is possible
function maxHeight(cuboids) {
  //* Sort the dimensions of each cuboid internally in ascending order (removes necessity to rotate)
  cuboids = cuboids.map((cuboid) => cuboid.sort((a, b) => a - b));

  //* Sort the cuboids into ascending order: if we have ties (if a[0] - b[0] === 0) then compare a[1] and b[1] and so on
  cuboids.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

  //* dp[i] = Maximum HEIGHT of stacked cuboids up to and including index "i" (we only care aboutb the HEIGHT)
  const dp = new Array(cuboids.length).fill(0);
  let maxHeight = 0;

  //* "i" represents the END of the current subsequence
  for (let i = 0; i < cuboids.length; i++) {
    dp[i] = cuboids[i][2]; //* Start with the height of the cuboid's height itself

    //* "j" represents the elements before "i" (the end)
    for (let j = 0; j < i; j++) {
      if (
        cuboids[i][0] >= cuboids[j][0] && //* Width
        cuboids[i][1] >= cuboids[j][1] && //* Length
        cuboids[i][2] >= cuboids[j][2] //* Height
      ) {
        //* Add the current cuboid to the stack (dp[j] is the height WITHOUT this cuboid)
        dp[i] = Math.max(dp[i], dp[j] + cuboids[i][2]);
      }
    }

    maxHeight = Math.max(maxHeight, dp[i]);
  }

  return maxHeight;
}

console.log(
  maxHeight([
    [50, 45, 20],
    [95, 37, 53],
    [45, 23, 12],
  ])
); //* 190

console.log(
  maxHeight([
    [38, 25, 45],
    [76, 35, 3],
  ])
); //* 76

console.log(
  maxHeight([
    [7, 11, 17],
    [7, 17, 11],
    [11, 7, 17],
    [11, 17, 7],
    [17, 7, 11],
    [17, 11, 7],
  ])
); //* 102

console.log(
  maxHeight([
    [1, 2, 4],
    [1, 2, 3],
    [1, 2, 3],
  ])
);

//* Time: O(n^2) - It takes O(n log n) to sort the cuboids locally (internally) AND globally
//* Then, we have a pair of nested for loops which both scale with "n"

//* Space: O(n) - The memory used to sort scales with the sorting algorithm used
//* The dp array scales with the input size
