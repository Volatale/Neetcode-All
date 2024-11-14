//* There are only 4 directions we can travel in
//* Using a variable, and an array of directions, we can track the robot's direction
//*     - 0 = North
//*     - 1 = East
//*     - 2 = South
//*     - 3 = West
//* "G" means the robot travels in that direction
//* "L" or "R" means the robot will turn in that direction
//*     - "L" means a anti-clockwise turn, so the array index decrements
//*     - "R" means a clockwise turn, so the array index increments
//! If at the very end, the robot is STILL at the origin (0, 0)
//*     - It means the robot moved in a cyclic manner
//! Otherwise, if the direction the robot is facing is NOT "north"
//*     - The robot will eventually make it back to (0, 0)
//* If the robot does NOT face north by the end
//*     - Then by repeating the instructions 2 to 4 times, it will stay AT or near the origin
//*     - Its path therefore forms a closed loop, regardless of whether x or y is non-zero after the first pass
function isRobotBounded(instructions) {
  let dir = 0; //* 0 = north

  const directions = [
    [0, 1], //* North
    [1, 0], //* East
    [0, -1], //* South
    [-1, 0], //* West
  ];

  //* Robot position
  let x = 0;
  let y = 0;

  for (let d of instructions) {
    if (d === "G") {
      x += directions[dir][0];
      y += directions[dir][1];
    } else if (d === "L") {
      dir = (dir + 3) % 4; //* Turn anti-clockwise
    } else {
      dir = (dir + 1) % 4; //* Turn clockwise
    }
  }

  //* Position did not change (back at 0, 0), OR, it did, and we aren't facing the same way anymore
  return (x === 0 && y === 0) || dir !== 0;
}

console.log(isRobotBounded("GGLLGG")); //* True
console.log(isRobotBounded("GG")); //* False
console.log(isRobotBounded("GL")); //* True
console.log(isRobotBounded("GRRRRG")); //* True

//* Time: O(n) - We iterate over the entire input once, so the time taken scales with the input size

//* Space: O(1) - We always use a constant amount of space regardless of input size
