//* We want to MINIMIZE robot2's score
//!     - This does NOT inherently involve maximizing robot1's score
//* The should be to force robot2 into a situation where it ends up with the SMALLEST possible score
//* So essentially, we want to BLOCK OFF the "valuable" cells such that robot2 barely gets any
//* Since we can only move right and down, we only really get to move down ONCE
//*     - So now the question becomes "when is the optimal time to move down"
//*     - Once we go down, we can never return
//! An important observation to make is that when we go down, robot2 can only get the top or bottom cells
//*     - But it CANNOT get both, so the optimal move is for robot1 to move down at "some" point
//*       We just don't know WHEN that should happen
//* Prefix Sums work because robot2 has to choose between the maximum of points in the top or bottom
//* We iterate through the array and make robot1 move down at every potential index (0 to n-1)
//* Then, we use the prefix sums array to "remove" the points that robot1 would have gotten in BOTH rows at the same time
//* Robot2 still wants to MAXIMIZE its own score, so we take the maximum of whichever row leads to the most points
//*     - After which, we try to MINIMIZE that result
//* So essentially, we are MINIMIZING the MAXIMUM
function gridGame(grid) {
  const n = grid[0].length;
  let maxPoints = Infinity;

  //* Set up the prefix sums so we can immediately calculate the points robot1 missed
  const row1Prefix = new Array(n).fill(0);
  const row2Prefix = new Array(n).fill(0);
  row1Prefix[0] = grid[0][0];
  row2Prefix[0] = grid[1][0];

  //* Get the prefix sum arrays for both rows
  for (let i = 1; i < n; i++) {
    row1Prefix[i] = row1Prefix[i - 1] + grid[0][i];
    row2Prefix[i] = row2Prefix[i - 1] + grid[1][i];
  }

  //* Anything <= index i has been taken by robot1, so we use prefix sums to get the remaining robot2 points
  //* So for every index and position, we try to get the amount that robot2 can STILL get (for both top and bottom)
  //* "i" represents the index that robot1 crosses over; robot2 only has a choice between TOP and BOTTOM (not both)
  for (let i = 0; i < n; i++) {
    const top = row1Prefix[n - 1] - row1Prefix[i]; //* Robot2 gets everything AFTER i (in top row)
    const bottom = i > 0 ? row2Prefix[i - 1] : 0; //* Or, Robot2 gets everything BEFORE i (in bottom row)
    const secondRobotChoice = Math.max(top, bottom); //* (Robot2's goal is to maximize its own points)
    maxPoints = Math.min(maxPoints, secondRobotChoice); //* Minimize the maximum points robot2 can get(robot1's goal)
  }

  return maxPoints;
}

console.log(
  gridGame([
    [2, 5, 4],
    [1, 5, 1],
  ])
); //* 4

console.log(
  gridGame([
    [3, 3, 1],
    [8, 5, 2],
  ])
); //* 4

console.log(
  gridGame([
    [1, 3, 1, 15],
    [1, 3, 3, 1],
  ])
); //* 7

console.log(
  gridGame([
    [4, 7, 5],
    [1, 7, 3],
  ])
); //* 5

//* Time: O(n) - Where "n" is the number of columns in each row
//* We iterate through the input array to build the prefix arrays
//* Then, we iterate from 0 to n - 1 to minimize the maximum points robot2 can get

//* Space: O(n) - The memory used scales with the number of columns each row has
