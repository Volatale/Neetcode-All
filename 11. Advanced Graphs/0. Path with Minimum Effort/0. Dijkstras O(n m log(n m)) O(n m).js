class PriorityQueue {
  constructor(values = [], func = (a, b) => a - b) {
    this.heap = values;
    this.func = func;
    this.heapify();
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  swap(x, y) {
    [this.heap[x], this.heap[y]] = [this.heap[y], this.heap[x]];
  }

  heapify() {
    for (let i = Math.floor((this.heap.length - 2) / 2); i >= 0; i--) {
      this.sinkDown(i);
    }
  }

  enqueue(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(i) {
    let parent = Math.floor((i - 1) / 2);

    while (i !== 0 && this.func(this.heap[i], this.heap[parent]) < 0) {
      this.swap(i, parent);
      i = parent;
      parent = Math.floor((i - 1) / 2);
    }
  }

  dequeue() {
    if (this.heap.length === 0) return undefined;

    this.swap(0, this.heap.length - 1);
    const popped = this.heap.pop();
    this.sinkDown(0);

    return popped;
  }

  sinkDown(i) {
    let length = this.heap.length;

    while (true) {
      let leftChild = 2 * i + 1;
      let rightChild = 2 * i + 2;
      let swapIndex = i;

      if (
        leftChild < length &&
        this.func(this.heap[leftChild], this.heap[swapIndex]) < 0
      ) {
        swapIndex = leftChild;
      }

      if (
        rightChild < length &&
        this.func(this.heap[rightChild], this.heap[swapIndex]) < 0
      ) {
        swapIndex = rightChild;
      }

      if (i === swapIndex) break;

      this.swap(i, swapIndex);
      i = swapIndex;
    }
  }
}

//* Start at (0, 0), travel to (ROWS-1, COLS-1)
//!     - Nothing will impede our progress (there is always a path)
//* We have a MATRIX, so we should use some sort of graph traversal algorithm
//*     - Use Dijkstra's (or Greedy BFS)
//* When we want to move to another cell
//*     - We need to track the MAXIMUM absolute difference found along THIS path
//* The priority queue should store [row, col, effort]
//!     - The priority queue will be a MIN HEAP that compares based on effort
//* So in other words, we MINIMIZE the effort taken by enqueuing to a MIN HEAP / PQ
//* Whenever a move is made:
//*     - const newEffort = Math.max(effort, abs([r][c] - [nR][nC]))
//! Why Dijkstra's?
//*     - The effort CANNOT DECREASE (which would translate to a negative edge weight in Dijkstra's)
//*     - We want to GREEDILY choose the MINIMUM effort cells
//*         - Dijkstra's naturally uses a priority queue for optimization
//*         - So why not just use a Min Heap and enqueue the current maxEffort for each path?
function minimumEffortPath(heights) {
  function inBounds(row, col) {
    return row >= 0 && col >= 0 && row < ROWS && col < COLS;
  }

  const ROWS = heights.length;
  const COLS = heights[0].length;

  const directions = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  //* Compare based on EFFORT (min heap lets us greedily MINIMIZE effort)
  //* [row, col, effort]: 0 effort because we have no comparison
  const PQ = new PriorityQueue([[0, 0, 0]], (a, b) => a[2] - b[2]);

  const visited = new Set();

  //* Perform Djikstra's Algorithm (BFS with min heap)
  while (!PQ.isEmpty()) {
    const [row, col, effort] = PQ.dequeue();

    //* Avoid revisiting
    if (visited.has(`${row}-${col}`)) continue;

    visited.add(`${row}-${col}`);

    //* The Min Heap ensures we prioritize the MINIMUM effort cells first
    if (row === ROWS - 1 && col === COLS - 1) return effort;

    //* Explore all of the neighbor cells
    for (let [r, c] of directions) {
      let newRow = row + r;
      let newCol = col + c;

      if (!inBounds(newRow, newCol) || visited.has(`${newRow}-${newCol}`))
        continue;

      //* Check if this move has a new "max" effort
      const newEffort = Math.max(
        effort,
        Math.abs(heights[row][col] - heights[newRow][newCol])
      );

      //* Retain the maximum effort along this path
      PQ.enqueue([newRow, newCol, newEffort]);
    }
  }

  //* Input is invalid
  return -1;
}

console.log(
  minimumEffortPath([
    [1, 2, 2],
    [3, 8, 2],
    [5, 3, 5],
  ])
); //* 2

console.log(
  minimumEffortPath([
    [1, 2, 3],
    [3, 8, 4],
    [5, 3, 5],
  ])
); //* 1

console.log(
  minimumEffortPath([
    [1, 2, 1, 1, 1],
    [1, 2, 1, 2, 1],
    [1, 2, 1, 2, 1],
    [1, 2, 1, 2, 1],
    [1, 1, 1, 2, 1],
  ])
); //* 0

console.log(minimumEffortPath([[100]])); //* 0

//* Time: O(n * m log(m * n))
//* There are ROWS * COLS cells in the grid
//* Enqueuing and Dequeuing take O(log n) where "n" is the size of the PQ
//* In the worst case we add every cell of the matrix to the PQ once

//* Space: O(n * m) - The priority queue could potentially store every cell in the matrix
//* The visited set could also store every cell
