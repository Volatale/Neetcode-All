function leastBricks(wall) {
  //* Position : Count of Brick Gaps
  const gapCount = new Map([[0, 0]]); //* Can't use the gap on left of first or right of last brick

  //* Iterate over every row
  for (let row = 0; row < wall.length; row++) {
    let position = 0; //* Find the position in each row

    //* Don't use the last brick
    for (let brick = 0; brick < wall[row].length - 1; brick++) {
      position += wall[row][brick];
      gapCount.set(position, (gapCount.get(position) || 0) + 1);
    }
  }

  return wall.length - Math.max(...gapCount.values());
}

console.log(
  leastBricks([
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ])
); //* 0

console.log(
  leastBricks([
    [1, 2, 2, 1],
    [3, 1, 2],
    [1, 3, 2],
    [2, 4],
    [3, 1, 2],
    [1, 3, 1, 1],
  ])
); //* 2

console.log(leastBricks([[1], [1], [1]])); //* 3

//* Time: O(n * m) - We iterate over every row
//* Then, within each row we iterate over each individual brick

//* Space: O(n * m) - Each position could have a different count of gaps
//* So there are O(n * m) key-value pairs
