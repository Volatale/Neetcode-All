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

//* We are looking for the SHORTEST PATH to the second connected component
//* Use DFS to traverse the first connected component
//*     - Mark cells as visited
//*     - Push [row, col] to an array
//* Then, use BFS and put the pushed elements into a queue
//* Track the number of flips that have occurred
//*     - Use Level Order Traversal to handle this
//*     - Every iteration of the while loop we should increment flips
//* The base case is if we manage to encounter an UNVISITED LAND CELL
//*     - This indicates we have managed to traverse to the OTHER island
function shortestBridge(grid) {
  //* Push all of the land cell's coordinates to an array
  function dfs(row, col) {
    if (!inBounds(row, col) || grid[row][col] === 0 || visited[row][col])
      return;

    ones.push([row, col]);
    visited[row][col] = true;

    for (let [r, c] of directions) {
      dfs(row + r, col + c);
    }
  }

  function bfs() {
    let flips = 0;
    const queue = new MyQueue(ones);

    while (!queue.isEmpty()) {
      let size = queue.size();

      //* Level Order
      for (let i = 0; i < size; i++) {
        const [row, col] = queue.dequeue();

        //* Explore neighbors
        for (let [r, c] of directions) {
          const newRow = row + r;
          const newCol = col + c;

          if (
            !inBounds(newRow, newCol) || //* Out of Bounds
            visited[newRow][newCol] //* Visited cells are cells on the OTHER island
          )
            continue;

          //* Found a cell on the OTHER island
          if (grid[newRow][newCol] === 1) return flips;

          queue.enqueue([newRow, newCol]);
          visited[newRow][newCol] = true;
        }
      }

      flips++;
    }
  }

  const ROWS = grid.length;
  const COLS = grid[0].length;

  function inBounds(row, col) {
    return row >= 0 && col >= 0 && row < ROWS && col < COLS;
  }

  const directions = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  const ones = [];
  const visited = new Array(ROWS)
    .fill(false)
    .map(() => new Array(COLS).fill(false));

  //* Get positions of the ones
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === 1) {
        dfs(row, col);
        return bfs();
      }
    }
  }
}

console.log(
  shortestBridge([
    [0, 1],
    [1, 0],
  ])
); //* 1

console.log(
  shortestBridge([
    [0, 1, 0],
    [0, 0, 0],
    [0, 0, 1],
  ])
); //* 2

console.log(
  shortestBridge([
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ])
); //* True

//* Time: O(n * m) - We perform a DFS AND a BFS
//* Both individually take O(n * m)

//* Space: O(n * m) - In the worst case, the space usage of the DFS is O(n * m)
//* Every cell (minus a few) could be a LAND cell
//* So the "ones" array scales with O(n * m) in the worst case
//* Therefore the queue itself scales the same way, as the elements in the ones array are placed in the queue
