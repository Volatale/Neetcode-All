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

    for (const val of values) {
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

//* Khan's Algorithm / Topological Sort works well here
//*     - The graph is inherently a Directed Acyclic Graph
//!     - We CAN move in all 4 directions
//*         - However, we can ONLY travel to cells strictly greater than the current
//*         - Which implicitly means backtracking is not allowed
//*             - Thus, the matrix can be viewed as a DAG since there cannot be any cycles in a path
//* Each while loop iteration counts as a new cell in the path
//*     - This is because the level order traversal ensures every cell on each level is cleared first
//*     - So in other words, the subproblems are solved in topological order
function longestIncreasingPath(matrix) {
  function isValid(row, col) {
    return row >= 0 && col >= 0 && row < n && col < m;
  }

  if (matrix.length === 0) return 0;

  const n = matrix.length;
  const m = matrix[0].length;
  let maxLength = 0;

  const directions = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  //* Tracks the number of ingoing edges to this cell
  const indegree = new Array(n).fill(0).map(() => new Array(m).fill(0));
  const queue = new MyQueue();

  //* Find the indegree of every cell
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      for (const [r, c] of directions) {
        const newRow = row + r;
        const newCol = col + c;

        //* Only increment VALID neighbors
        if (
          isValid(newRow, newCol) &&
          matrix[newRow][newCol] > matrix[row][col]
        ) {
          indegree[newRow][newCol]++;
        }
      }
    }
  }

  //* Find nodes with no prerequisites (indegree of 0)
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      if (indegree[row][col] === 0) {
        queue.enqueue([row, col]);
      }
    }
  }

  //* Khan's Algorithm
  while (!queue.isEmpty()) {
    const size = queue.length;

    //* Ensure a level-order traversal
    for (let i = 0; i < size; i++) {
      const [row, col] = queue.dequeue();

      //* Explore all 4 neighbors of each cell
      for (const [r, c] of directions) {
        const newRow = row + r;
        const newCol = col + c;

        if (
          isValid(newRow, newCol) &&
          matrix[newRow][newCol] > matrix[row][col]
        ) {
          //* Remove one of the prerequisites
          indegree[newRow][newCol]--;

          if (indegree[newRow][newCol] === 0) {
            //* If this node now has no prerequisites, enqueue it
            queue.enqueue([newRow, newCol]);
          }
        }
      }
    }

    maxLength++;
  }

  return maxLength;
}

console.log(
  longestIncreasingPath([
    [9, 9, 4],
    [6, 6, 8],
    [2, 1, 1],
  ])
); //* 4

console.log(longestIncreasingPath([[1, 2, 3]])); //* 3
console.log(longestIncreasingPath([[1]])); //* 1
console.log(longestIncreasingPath([[0, 0, 0]])); //* 1
console.log(
  longestIncreasingPath([
    [1, 2, 3],
    [6, 5, 4],
    [7, 8, 9],
  ])
); //* 9

//* Time: O(n * m) - We iterate through the entire matrix twice (which takes O(n * m) alone)
//* Then, Khan's Algorithm itself takes O(n + m) we could potentially process every node one more time

//* Space: O(n * m) - In the worst case, where every element is identical, we could have n * m pairs of [x, y]
//* Imagine we had [0, 0, 0]; every cell has 0 dependencies, thus, they are ALL enqueued
