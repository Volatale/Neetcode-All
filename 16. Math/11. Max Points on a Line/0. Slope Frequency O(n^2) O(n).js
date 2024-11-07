//* To determine if two points are on the same line
//*     - We use Rise over Run, or, the point-based slope formula
//*     - m = (change in y) / (change in x) = rise / run = (y2 - y1) / (x2 - x1)
//! Use a hashtable to track the lines that share a mutual slope
//*     - RESET the hashtable after each outer iteration
//*     - Parallel lines DO exist, but a single point can only be on ONE parallel line
//*         - If it is part of TWO, they are the SAME line
//*         - Thus by reseting the hashtable, we can avoid the parallel line case
//*     - The hashtable tracks the frequency of slopes (slope -> count)
//*         - Using a hashtable allows us to avoid a THIRD (nested) loop
//! Vertical Lines have an UNDEFINED slope
//*     - The x (run) values of both points will be the same: take these two points
//*         - (1, 3), (1, 2)
//*         - (2 - 3) / (1 - 1) = -1 / 0
//!             - Division by ZERO is always undefined
//*         - So for these cases, we use INFINITY as the key
//! Horizontal lines have a slope of 0
//*     - The y (rise) values will be the same
//*         - (1, 2), (2, 2), (3, 2)
//*         - (2 - 2) / (2 - 1) =  0 / 1
// !            - n / ZERO is always 0
function maxPoints(points) {
  //* There is only 1 point
  if (points.length === 1) return 1;

  //* We are guaranteed at least one point
  let longest = 1;

  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i]; //* This is the "starting" point
    const freq = {}; //* Track the frequency of slopes -> count

    //* Get the slope between every other point
    for (let j = i + 1; j < points.length; j++) {
      const [x2, y2] = points[j];

      //* If both x are the same, they form a VERTICAL line (undefined slope), so we use infinity as the key
      //* Otherwise, calculate the slope between the two points (Rise over Run, or Change in X / Change in Y)
      const slope = x1 === x2 ? Infinity : (y2 - y1) / (x2 - x1);

      //* Found another point that lies along this line / slope
      freq[slope] = (freq[slope] || 0) + 1;

      //* +1 because we need to include THIS point
      longest = Math.max(longest, freq[slope] + 1);
    }
  }

  return longest;
}

console.log(
  maxPoints([
    [1, 1],
    [2, 2],
    [3, 3],
  ])
); //* 3

console.log(
  maxPoints([
    [1, 1],
    [3, 2],
    [5, 3],
    [4, 1],
    [2, 3],
    [1, 4],
  ])
); //* 4

console.log(
  maxPoints([
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
  ])
);
//* 4

console.log(maxPoints([[1, 2]])); //* 1

console.log(
  maxPoints([
    [0, 1],
    [0, 3],
    [0, 5],
  ])
); //* 3 (all three points form a vertical line (infinity))

//* Time: O(n^2) - We need to iterate over pairs of points to compare slopes
//* So we have two nested loops (the first is for the origin) and the second is for the other point

//* Space: O(n) - The number of keys and values is equal to the number of unique slopes in the worst case
