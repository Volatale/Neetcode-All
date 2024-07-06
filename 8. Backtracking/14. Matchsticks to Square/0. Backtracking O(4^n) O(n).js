//* There are 4 sides to a square
//*     - All sides have equal length
//* We have "n" matchsticks that ALL have to be used
//* So we should try placing every matchstick in all positions
//*     - At least until we arrive at a successful result
//*     - This implies the use of backtracking
//* Get the sum of all of the matchsticks
//* Divide the sum by 4
//*     - This tells us the length of each side of the square
//* But if that sum does not evenly divide into 4, return false immediately
//!     - It is impossible to create a square (all sides have equal length)
//* Track the length of all 4 sides in a squares array
//* Within each call, do 4 iterations (since we have 4 sides)
//*     - Try placing the matchstick in all 4 sides for all levels of recursion
//* If we are past the final matchstick, we successfully made an equal length square
function matchsticksToSquare(matchsticks) {
  //* We need 4 sides to make a square
  if (matchsticks.length < 4) return false;

  //* Track the total length of all matchsticks, and the supposed side length
  const sumOfSticks = matchsticks.reduce((acc, curr) => acc + curr, 0);
  const sideLength = sumOfSticks / 4;

  //* Sides are not evenly divisible by 4 (gives a decimal)
  if (sumOfSticks % 4 !== 0) return false;

  //   //* Put the largest sticks on the left
  matchsticks.sort((a, b) => b - a);

  //* Represents all 4 sides of the square
  const square = new Array(4).fill(0);

  return backtrack(0, square, sideLength, matchsticks);
}

function backtrack(index, square, sideLength, matchsticks) {
  //* Base Case; used every matchstick
  //* We already validated each side being <= sideLength
  if (index === matchsticks.length) {
    return true;
  }

  //* There are 4 sides to a square, so try putting the matchstick on all 4 sides
  for (let i = 0; i < 4; i++) {
    if (
      //* Ensures each side <= sideLength
      square[i] + matchsticks[index] > sideLength ||
      //* If the prev group's value is the same and THAT failed, THIS one will too
      (i > 0 && square[i - 1] === square[i])
    )
      continue;

    square[i] += matchsticks[index]; //* Explore with this matchstick on "side i"
    if (backtrack(index + 1, square, sideLength, matchsticks)) return true;
    square[i] -= matchsticks[index]; //* Unexplore
  }

  //* Failed to create 4 sides of equal length
  return false;
}

console.log(matchsticksToSquare([1, 1, 1, 1])); //* True
console.log(matchsticksToSquare([5, 5, 5, 1, 1, 1, 1, 1])); //* True
console.log(matchsticksToSquare([1, 1, 2, 2, 2])); //* True
console.log(matchsticksToSquare([3, 3, 3, 3, 4])); //* False
console.log(matchsticksToSquare([10])); //* False

//* Time: O(4^n) - It takes O(n log n) to sort the matchsticks
//* Getting the sum of the matchsticks takes O(n)
//* Each call to backtrack creates 4 more calls
//*     - There are 4 sides to a square and we call backtrack for each side (4)
//* The depth of the recursion is matchsticks.length (O(n))
//* So branchingFactor ^ depthOfRecursiveTree = O(4^n)

//* Space: O(n) - The square array takes O(4) space (constant)
//* The sorting takes O(1) to O(log n) to O(n) space (depends on sorting algorithm)
//* The recursion depth is O(n) too (matchsticks.length)
