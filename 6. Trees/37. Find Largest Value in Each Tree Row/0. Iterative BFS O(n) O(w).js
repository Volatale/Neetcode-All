class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

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
    this.size = 0;

    for (let val of values) {
      this.enqueue(val);
    }
  }

  isEmpty() {
    return this.size === 0;
  }

  enqueue(val) {
    const newNode = new ListNode(val);

    if (this.size === 0) {
      this.front = newNode;
      this.back = newNode;
    } else {
      this.back.next = newNode;
      this.back = newNode;
    }

    this.size++;
    return this.size;
  }

  dequeue() {
    if (this.size === 0) return;

    const front = this.front;

    if (this.size === 1) {
      this.front = null;
      this.back = null;
    } else {
      this.front = this.front.next;
    }

    this.size--;
    return front.val;
  }
}

//* Perform a BFS
//* BFS lets us do a level order traversal
//* Track the maximum value in the row
//* And test every node in the row to see if it beats the max
//* At the end of the level, push rowMax
function largestValues(root) {
  if (root === null) return [];

  const depthArray = [];

  //* Queue for BFS
  const queue = new MyQueue([root]);

  while (!queue.isEmpty()) {
    let size = queue.size;
    let rowMax = -Infinity; //* Anything beats -Infinity

    //* Enforce Level Order Traversal
    for (let i = 0; i < size; i++) {
      const curr = queue.dequeue();

      //* Try to find a new max
      rowMax = Math.max(rowMax, curr.val);

      //* Enqueue the children if they exist
      if (curr.left) queue.enqueue(curr.left);
      if (curr.right) queue.enqueue(curr.right);
    }

    depthArray.push(rowMax);
  }

  return depthArray;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(3);
root1.left.left = new TreeNode(5);
root1.left.right = new TreeNode(3);
root1.right = new TreeNode(2);
root1.right.right = new TreeNode(9);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.right = new TreeNode(3);

const root3 = new TreeNode(5);

const root4 = new TreeNode(10);
root4.left = new TreeNode(20);
root4.left.left = new TreeNode(30);
root4.left.left.left = new TreeNode(40);
root4.left.left.left.left = new TreeNode(50);

console.log(largestValues(root1)); //* [1, 3, 9]
console.log(largestValues(root2)); //* [1, 3]
console.log(largestValues(root3)); //* [5]
console.log(largestValues(root4)); //* [10, 20, 30, 40, 50]
console.log(largestValues(null)); //* []

//* Time: O(n) - We have to process every node in the tree
//* We have no guarantee of knowing where the max value is
//* Enqueue and Dequeue take constant time

//* Space: O(w) - The queue scales in size proportionally with the width of the tree
//* If the tree resembles a linked list, it only has 1 element at each level
//* Otherwise there will be n / 2 + 1 nodes on the final level
//* This assumes a balanced tree
