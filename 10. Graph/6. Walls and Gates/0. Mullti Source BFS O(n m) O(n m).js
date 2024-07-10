class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class MyQueue {
  constructor(values) {
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
    return this.length;
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

//* Multi-Source BFS
//* Iterate through the matrix searching for walls
//* Enqueue them to a queue (and mark as visited)
//* Use the distance variable to track the distance from that these walls
//* BFS and process the current node (set grid[row][col] = distance)
//* Find the neighbors of this node
//*     - If we stay within bounds
//*     - The cell isn't an obstacle (-1)
//*     - And we haven't already visited the cell
//*         - Enqueue this cell to the queue to process it later
//*         - Mark as visited
//* Increment distance since this "level" has been finished
//* Keep doing this until the queue is empty
function wallsAndGates(grid) {
  //* Queue for BFS
  const queue = new MyQueue([]);

  const directions = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  const ROWS = grid.length;
  const COLS = grid[0].length;

  let distance = 0;

  const visited = new Set();

  //* Find the walls and push tuples of their coordinates
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === 0) {
        queue.enqueue([row, col]);
        visited.add(`${row}-${col}`);
      }
    }
  }

  //* BFS
  while (!queue.isEmpty()) {
    let size = queue.size(); //* Snapshot for level order traversal

    //* Perform a level order traversal
    for (let i = 0; i < size; i++) {
      const [row, col] = queue.dequeue();

      //* Update the node's distance
      grid[row][col] = distance;

      //* Find the neighbors of this node
      for (let [r, c] of directions) {
        let newRow = row + r;
        let newCol = col + c;

        if (
          inBounds(newRow, newCol, ROWS, COLS) &&
          grid[newRow][newCol] !== -1 &&
          !visited.has(`${newRow}-${newCol}`)
        ) {
          queue.enqueue([newRow, newCol]);
          visited.add(`${newRow}-${newCol}`);
        }
      }
    }

    distance++;
  }

  return grid;
}

function inBounds(row, col, ROWS, COLS) {
  return row >= 0 && col >= 0 && row < ROWS && col < COLS;
}

console.log(
  wallsAndGates([
    [Infinity, Infinity, Infinity],
    [Infinity, 0, Infinity],
    [Infinity, Infinity, Infinity],
  ])
);

console.log(
  wallsAndGates([
    [Infinity, -1, 0, Infinity],
    [Infinity, Infinity, Infinity, -1],
    [Infinity, -1, Infinity, -1],
    [0, -1, Infinity, Infinity],
  ])
);

console.log(wallsAndGates([[0, Infinity, Infinity, Infinity]]));
console.log(wallsAndGates([[Infinity, 0, 0, Infinity]]));

console.log(
  wallsAndGates([
    [-1, -1, -1],
    [-1, -1, 0],
    [0, 0, Infinity],
  ])
);

//* Time: O(n * m) - Iterating through the array looking for walls takes O(n * m)
//*     - We don't know where the walls are
//* The DFS itself takes O(n * m) since in the worst case we process every node once

//* Space: O(n * m) - In the worst case, every cell is stored within the queue
//* And in the worst case, we store every cell within the visited set
