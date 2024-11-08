class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor(values) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of values) {
      this.append(val);
    }
  }

  size() {
    return this.length;
  }

  getHead() {
    return this.head;
  }

  getValues() {
    if (this.head === null) return [];

    const values = [];
    let curr = this.head;

    while (curr !== null) {
      values.push(curr.val);
      curr = curr.next;
    }

    return values;
  }

  append(val) {
    const newNode = new ListNode(val);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }
}

//* Create a matrix to store the values in the linked list
//* We have a singly linked list, so we just need to expend all of the values
//* Keep traveling in the same direction until we go out of bounds
//*     - If you end up going out of bounds, we need to change directions
//*     - Initially, we start at the top left, and we move right
//* We don't progress the linked list if we need to change directions
//*     - Doing so would give us an invalid result
function spiralMatrix(m, n, head) {
  function isInBounds(row, col) {
    return row >= 0 && col >= 0 && row < m && col < n;
  }

  //* Assume the linked list is empty
  const matrix = new Array(m).fill(0).map(() => new Array(n).fill(-1));

  const directions = [
    [0, 1], //* Right (0)
    [1, 0], //* Down (1)
    [0, -1], //* Left (2)
    [-1, 0], //* Up (3)
  ];

  let dir = 0; //* Start by moving right
  let row = 0;
  let col = 0;

  let curr = head;
  matrix[row][col] = curr.val;
  curr = curr.next; //* Move to next node

  //* Keep populating the natrix until the linked list is finished
  while (curr !== null) {
    const [r, c] = directions[dir];
    const newRow = row + r;
    const newCol = col + c;

    if (isInBounds(newRow, newCol) && matrix[newRow][newCol] === -1) {
      row = newRow;
      col = newCol;
      matrix[row][col] = curr.val;
      curr = curr.next;
    } else {
      //* Change directions
      dir = (dir + 1) % 4;
    }
  }

  return matrix;
}

const head = new LinkedList([3, 0, 2, 6, 8, 1, 7, 9, 4, 2, 5, 5, 0]).head;
const head2 = new LinkedList([0, 1, 2]).head;
const head3 = new LinkedList([0]).head;

console.log(spiralMatrix(3, 5, head));
console.log(spiralMatrix(1, 4, head2));
console.log(spiralMatrix(1, 1, head3));

//* Time: O(m * n) - It takes O(m * n) to create the matrix to store the values
//* Technically, we only iterate through every element in the linked list
//* So the while loop takes O(k) where "k" is the linked list size, but this is dominated by the O(m * n)

//* Space: O(m * n) - The matrix scales in size proportionally with the input size
//* It takes O(1) memory to traverse through the linked list
