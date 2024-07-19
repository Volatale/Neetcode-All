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

//* This is basically a regular shortest path problem
//* So we use a queue
//* Perform a Level Order Traversal so we always get the MINIMUM number of moves
function shortestPathBinaryMatrix(grid) {
  function inBounds(row, col) {
    return row >= 0 && col >= 0 && row < ROWS && col < COLS;
  }
  const ROWS = grid.length;
  const COLS = grid[0].length;

  //* There is no possible path
  if (grid[0][0] === 1 || grid[ROWS - 1][COLS - 1] === 1) return -1;

  const directions = [
    [-1, 0], //* Up
    [-1, 1], //* Up Right
    [0, 1], //* Right
    [1, 1], //* Down Right
    [1, 0], //* Down
    [1, -1], //* Down Left
    [0, -1], //* Left
    [-1, -1], //* Up Left
  ];

  const visited = new Set();

  //* Queue for BFS; enqueue the top-left cell (we know it is a 0)
  const queue = new MyQueue();
  queue.enqueue([0, 0]);

  let moves = 0;

  //* Perform the BFS
  while (!queue.isEmpty()) {
    let size = queue.size();
    moves++;

    //* Level Order Traversal
    for (let i = 0; i < size; i++) {
      const [row, col] = queue.dequeue();

      //* Base Case; arrived at the bottom right cell
      if (row === ROWS - 1 && col === COLS - 1) return moves;

      //* Explore neigbors
      for (let [r, c] of directions) {
        const newRow = row + r;
        const newCol = col + c;

        if (
          !inBounds(newRow, newCol) || //* Out of bounds
          visited.has(`${newRow}-${newCol}`) || //* Already visited
          grid[newRow][newCol] === 1 //* Blocked Cell
        )
          continue;

        visited.add(`${newRow}-${newCol}`);
        queue.enqueue([newRow, newCol]);
      }
    }
  }

  //* No path
  return -1;
}

console.log(shortestPathBinaryMatrix([[0]])); //* 1
console.log(
  shortestPathBinaryMatrix([
    [0, 0],
    [0, 0],
  ])
); //* 2

//* Time: O(n * n) - In the worst case, we have to visit every cell in the matrix
//* Since we track the cells we have already visited, we only process each cell at most once

//* Space: O(n * n) - The queue can potentially contain every cell in the worst case
