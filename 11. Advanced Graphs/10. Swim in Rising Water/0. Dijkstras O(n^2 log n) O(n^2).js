class MyPriorityQueue {
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

function swimInWater(grid) {
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

  //* [row, col, maxElevationAlongThisPath]: compare based on elevation in ASCENDING order
  const PQ = new MyPriorityQueue([[0, 0, grid[0][0]]], (a, b) => a[2] - b[2]);
  const visited = new Set();
  visited.add(`${0}-${0}`);

  //* Dijkstra's Algorithm
  while (!PQ.isEmpty()) {
    const [row, col, time] = PQ.dequeue();

    //* Found path to bottom-right cell
    if (row === ROWS - 1 && col === COLS - 1) {
      return time;
    }

    //* Explore neighbors
    for (const [r, c] of directions) {
      const newRow = row + r;
      const newCol = col + c;

      //* Either out of bounds or cell already visited (don't backtrack)
      if (!inBounds(newRow, newCol) || visited.has(`${newRow}-${newCol}`))
        continue;

      //* Elevation = How much time we have to wait, so take the maximum
      const newTime = Math.max(time, grid[newRow][newCol]);

      PQ.enqueue([newRow, newCol, newTime]);
      visited.add(`${newRow}-${newCol}`);
    }
  }
}

console.log(
  swimInWater([
    [0, 2],
    [1, 3],
  ])
); //* 3

console.log(
  swimInWater([
    [0, 1, 2, 3, 4],
    [24, 23, 22, 21, 5],
    [12, 13, 14, 15, 16],
    [11, 17, 18, 19, 20],
    [10, 9, 8, 7, 6],
  ])
); //* 16

console.log(
  swimInWater([
    [3, 2],
    [1, 0],
  ])
); //* 3

console.log(swimInWater([[0]])); //* 0

console.log(
  swimInWater([
    [8, 4, 5],
    [6, 3, 7],
    [2, 1, 0],
  ])
); //* 8

//* Time: O(n^2 log(n)) - Dijkstra's Algorithm takes O(E log(V)) in the worst case
//* That is, assuming we can't add multiple of the same vertex to the PQ
//* In this case, we have the visited set to prevent that behaviour
//* Enqueuing and Dequeuing both take O(log n)
//* O(n^2 * log(n^2)) is simplified to O(n^2 * log(n)) using the power rule of logarithms
//* log(n^2) -> 2 log n, and in Big O we drop constants -> O(log n)

//* Space: O(n^2) - The visited set can potentially store every cell
//* The priority queue itself can also store every cell
