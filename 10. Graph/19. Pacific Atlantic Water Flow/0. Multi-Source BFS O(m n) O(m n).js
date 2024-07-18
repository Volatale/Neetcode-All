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

//* Enqueue all of the border cells
//* Track which cells are able to be visited from one ocean
//* See which ones overlap, and push those to the results array
function pacificAtlantic(heights) {
  function bfs(queue, visited) {
    while (!queue.isEmpty()) {
      const [row, col] = queue.dequeue();

      //* Explore neigbors
      for (let [r, c] of directions) {
        const newRow = row + r;
        const newCol = col + c;

        if (
          !inBounds(newRow, newCol) || //* Out of Bounds
          visited.has(`${newRow}-${newCol}`) || //* Already visited
          heights[newRow][newCol] < heights[row][col]
        )
          continue;

        visited.add(`${newRow}-${newCol}`);
        queue.enqueue([newRow, newCol]);
      }
    }
  }

  function inBounds(row, col) {
    return row >= 0 && col >= 0 && row < ROWS && col < COLS;
  }

  const ROWS = heights.length;
  const COLS = heights[0].length;

  const pQueue = new MyQueue();
  const aQueue = new MyQueue();

  const pVisited = new Set();
  const aVisited = new Set();

  const directions = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  //* Get all of the ROW-wise border cells
  for (let row = 0; row < ROWS; row++) {
    pQueue.enqueue([row, 0]);
    pVisited.add(`${row}-${0}`);

    aQueue.enqueue([row, COLS - 1]);
    aVisited.add(`${row}-${COLS - 1}`);
  }

  //* Get all of the COL-wise border cells
  for (let col = 0; col < COLS; col++) {
    pQueue.enqueue([0, col]);
    pVisited.add(`${0}-${col}`);

    aQueue.enqueue([ROWS - 1, col]);
    aVisited.add(`${ROWS - 1}-${col}`);
  }

  const results = [];
  bfs(pQueue, pVisited);
  bfs(aQueue, aVisited);

  //* Push the cells that BOTH Pacific AND Atlantic can reach
  for (let position of pVisited) {
    if (aVisited.has(position)) {
      const [row, col] = position.split("-").map(Number);
      results.push([row, col]);
    }
  }

  return results;
}

console.log(
  pacificAtlantic([
    [4, 5, 7],
    [2, 3, 6],
    [1, 2, 5],
  ])
);

console.log(pacificAtlantic([[1]]));

console.log(pacificAtlantic([[1, 2, 3]]));

console.log(
  pacificAtlantic([
    [1, 2, 3],
    [4, 1, 4],
  ])
);
