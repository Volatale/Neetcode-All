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

//* Instead of lazily computing safeness values
//* Perform a Multi-Source BFS from the thieves' cells
//* Get the shortest path (Manhattan Distance) to every cell in one go
//!     - Otherwise we have to get the positions of every thief mid Dijkstra's
//!         - Then we'd get the Manhattan Distance of every thief using those positions
//!         - If there are "k" thieves, we would have to do an an O(k) loop every for every cell
//*     - So use the Multi-Source BFS approach instead
//* Instead of exploring every path (which could potentially be exponential)
//*     - We use Dijkstra's Algorithm to only explore the safest path
//*     - At each step, take the highest valued cell in the PQ (use a Max Heap)
function maximumSafenessFactor(grid) {
  function inBounds(row, col) {
    return row >= 0 && col >= 0 && row < ROWS && col < COLS;
  }

  const ROWS = grid.length;
  const COLS = grid[0].length;

  //* There is a thief on the start and/or end
  if (grid[0][0] === 1 || grid[ROWS - 1][COLS - 1] === 1) return 0;

  const directions = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  const queue = new MyQueue(); //* [row, col, distance]
  const visited = new Set();
  visited.add(`${0}-${0}`);

  //* dist[i][j] = Distance away from the nearest thief
  const dist = new Array(ROWS)
    .fill(0)
    .map(() => new Array(COLS).fill(Infinity));

  //* Get positions of each thief
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === 1) {
        queue.enqueue([row, col, 0]);
      }
    }
  }

  //* BFS - Get distance of closest thief for every cell
  while (!queue.isEmpty()) {
    const [row, col, distance] = queue.dequeue();

    //* Explore cell's neighbors
    for (let [r, c] of directions) {
      const newRow = row + r;
      const newCol = col + c;

      //* Already found a smaller distance
      if (
        !inBounds(newRow, newCol) ||
        distance + 1 >= dist[newRow][newCol] || //* Already found shorter distance
        grid[newRow][newCol] === 1 //* Ignore other thieves
      )
        continue;

      dist[newRow][newCol] = distance + 1;
      queue.enqueue([newRow, newCol, distance + 1]);
    }
  }

  //* [row, col, safeness]: Compare based on the safeness in DESCENDING order
  const PQ = new MyPriorityQueue([[0, 0, dist[0][0]]], (a, b) => b[2] - a[2]);

  //* Dijkstra's Algorithm (greedily choose largest safeness cell)
  while (!PQ.isEmpty()) {
    const [row, col, safeness] = PQ.dequeue();

    //* Found safest path
    if (row === ROWS - 1 && col === COLS - 1) {
      return safeness;
    }

    //* Explore neighbors
    for (let [r, c] of directions) {
      const newRow = row + r;
      const newCol = col + c;

      if (
        !inBounds(newRow, newCol) ||
        grid[newRow][newCol] === 1 ||
        visited.has(`${newRow}-${newCol}`)
      )
        continue;

      //* Get the safeness value from the dist array
      PQ.enqueue([newRow, newCol, Math.min(safeness, dist[newRow][newCol])]);
      visited.add(`${newRow}-${newCol}`);
    }
  }

  return 0;
}

console.log(
  maximumSafenessFactor([
    [0, 1, 1],
    [0, 0, 0],
    [0, 0, 0],
  ])
); //* 1

console.log(
  maximumSafenessFactor([
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 1],
  ])
); //* 0

console.log(
  maximumSafenessFactor([
    [0, 0, 1],
    [0, 0, 0],
    [0, 0, 0],
  ])
); //* 2

console.log(
  maximumSafenessFactor([
    [0, 0, 0, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 0, 0, 0],
  ])
); //* 2

console.log(
  maximumSafenessFactor([
    [0, 1, 1],
    [0, 0, 0],
    [0, 1, 0],
  ])
); //* 1

console.log(
  maximumSafenessFactor([
    [0, 1, 1],
    [1, 1, 1],
    [1, 1, 0],
  ])
); //* 0

console.log(
  maximumSafenessFactor([
    [0, 1, 1],
    [0, 0, 0],
    [0, 0, 0],
  ])
); //* 1

//* Time: O(E log V) - It takes O(K) to enqueue all of the thieves
//* Where "k" = number of thieves in the grid
//* Each cell is processed once and each cell's neighbors a constant no. f times
//* The BFS itself takes O(n * m)
//* Each cell is enquued at most once for Dijkstra's
//* Enqueuing and Dequeuing take O(log n) where "n" = PQ.size()
//* The no of edges is 4 * n * m, but the 4 is constant

//* Space: O(n * m) - The queue itself can potentially hold every cell
//* And so can the priority queue
