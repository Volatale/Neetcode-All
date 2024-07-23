class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class MyQueue {
  constructor(values = []) {
    this.front = null;
    this.back = null;
    this.length = 0;

    for (let val of values) {
      this.enqueue(val);
    }
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  enqueue(val) {
    const newNode = new ListNode(val);

    if (this.length === 0) {
      this.front = newNode;
      this.back = newNode;
    } else {
      this.back.next = newNode;
      this.back = newNode;
    }

    this.length++;
  }

  dequeue() {
    if (this.length === 0) return undefined;

    const front = this.front;

    if (this.length === 1) {
      this.front = null;
      this.back = null;
    } else {
      this.front = this.front.next;
    }

    this.length--;
    return front.val;
  }
}

//* Multi Source BFS starting from the LAND cells
//* Track the MAXIMUM distance that we can travel from all of them
//*     - Ignore the other LAND cells
function maxDistance(grid) {
  function inBounds(row, col) {
    return row >= 0 && col >= 0 && row < ROWS && col < COLS;
  }

  const ROWS = grid.length;
  const COLS = grid[0].length;

  const directions = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  const queue = new MyQueue();
  const visited = new Array(ROWS)
    .fill(false)
    .map(() => new Array(COLS).fill(false));

  let maxDistance = -1;
  let landCells = 0;
  let waterCells = 0;

  //* Enqueue all of the ones
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === 1) {
        queue.enqueue([row, col, 0]);
        visited[row][col] = true;
        landCells++;
      } else {
        waterCells++;
      }
    }
  }

  //* Both need to exist to have a path
  if (waterCells === 0 || landCells === 0) return -1;

  //* Perform a multi-source BFS
  while (!queue.isEmpty()) {
    const [row, col, distance] = queue.dequeue();

    for (let [r, c] of directions) {
      const newRow = row + r;
      const newCol = col + c;

      if (
        !inBounds(newRow, newCol) || //* Out of Bounds
        grid[newRow][newCol] === 1 || //* Ignore land cells
        visited[newRow][newCol] //* Already visited
      )
        continue;

      visited[newRow][newCol] = true;
      queue.enqueue([newRow, newCol, distance + 1]);
      maxDistance = Math.max(maxDistance, distance + 1); //* Check for new max distance
    }
  }

  return maxDistance;
}

console.log(
  maxDistance([
    [1, 0, 1],
    [0, 0, 0],
    [1, 0, 1],
  ])
);

console.log(
  maxDistance([
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ])
);

console.log(maxDistance([[1, 0, 0]]));

//* Time: O(n * m) - We potentially have to process every node in the grid
//* So the time taken scales with the number of rows and columns
//* We only process each node twice (initial scan) at most since we track the visited nodes

//* Space: O(n * m) - The queue can potentially store positions for every cell
//* The visited matrix scales with the input size (rows * cols)
