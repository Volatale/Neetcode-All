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
//* Add every rotten orange's position to the queue
//* Use a variable to track how many minutes have passed
//* Track the nummber of fresh oranges
//*     - At the end, if fresh oranges > 0 we have to return -1
//* Iterate through the entire matrix
//*     - if grid[row][col] === 2, this is a rotting orange; enqueue([row, col])
//*     - else if grid[row][col] === 1, this a fresh orange, increment freshOranges
//* If fresh oranges === 0, just return 0; we didn't have to do anything
//* Perform a BFS (level order traversal) and get all of the neighbors on the current level
//*     - Enqueue the neighbors that are fresh orange cells (1 cells)
//*     - Decrement fresh oranges
//*     - Set the cell to a 2 so we don't have to track visited nodes
//* At the end of each while loop iteration
//*     - Increment time; one minute has passed by
//* Finally, return minutes if freshOranges === 0 and -1 otherwise
function rottingOranges(grid) {
  const queue = new MyQueue();

  const ROWS = grid.length;
  const COLS = grid[0].length;

  const directions = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  let minutes = 0;
  let freshOranges = 0;

  //* Find positions of all rotting oranges
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === 1) {
        freshOranges++;
      } else if (grid[row][col] === 2) {
        queue.enqueue([row, col]);
      }
    }
  }

  //* There are already no fresh oranges
  if (freshOranges === 0) return 0;

  //* Perform BFS
  while (!queue.isEmpty() && freshOranges > 0) {
    let size = queue.size();

    //* Level order traversal
    for (let i = 0; i < size; i++) {
      const [row, col] = queue.dequeue();

      //* Check for neighbors (fresh oranges)
      for (let [r, c] of directions) {
        let newRow = row + r;
        let newCol = col + c;

        if (!inBounds(newRow, newCol, ROWS, COLS) || grid[newRow][newCol] !== 1)
          continue;

        grid[newRow][newCol] = 2; //* This orange rots
        freshOranges--;
        queue.enqueue([newRow, newCol]);
      }
    }

    //* Time passes
    minutes++;
  }

  //* Check if every fresh orange is now rotten
  return freshOranges === 0 ? minutes : -1;
}

function inBounds(row, col, ROWS, COLS) {
  return row >= 0 && col >= 0 && row < ROWS && col < COLS;
}

console.log(
  rottingOranges([
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1],
  ])
);

console.log(
  rottingOranges([
    [2, 1, 1],
    [0, 1, 1],
    [1, 0, 1],
  ])
);
console.log(rottingOranges([[0, 2]]));
