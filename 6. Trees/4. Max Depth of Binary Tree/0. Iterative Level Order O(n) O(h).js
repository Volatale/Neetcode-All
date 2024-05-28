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

  isEmpty() {
    return this.size === 0;
  }
}

//* Find the max depth of the left and right subtrees recursively
//* The depth is the number of nodes along the longest path
//* To find the depth of the root node, we need the children's depths, then we add 1
function maxDepth(root) {
  if (root === null) return 0;

  let maxDepth = 0;

  const queue = new MyQueue();
  queue.enqueue(root);

  while (!queue.isEmpty()) {
    //* Ensures we only do up to 2^L dequeues per level
    //* Where "L" is the level we are on
    let size = queue.size;

    //* Level-Order Traversal
    for (let i = 0; i < size; i++) {
      const curr = queue.dequeue();

      //* Enqueue the children
      if (curr.left) queue.enqueue(curr.left);
      if (curr.right) queue.enqueue(curr.right);
    }

    //* Count the number of levels we have
    maxDepth++;
  }

  return maxDepth;
}

const root1 = new TreeNode(3);
root1.left = new TreeNode(9);
root1.right = new TreeNode(20);
root1.right.left = new TreeNode(15);
root1.right.right = new TreeNode(7);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(3);
root2.right = new TreeNode(3);

const root3 = new TreeNode(1);
root3.right = new TreeNode(2);

const root4 = new TreeNode(5);
root4.left = new TreeNode(10);
root4.left.left = new TreeNode(15);
root4.left.left.left = new TreeNode(20);
root4.left.left.left.left = new TreeNode(25);

console.log(maxDepth(root1)); //* 3
console.log(maxDepth(root2)); //* 3
console.log(maxDepth(root3)); //* 2
console.log(maxDepth(root4)); //* 5
console.log(maxDepth(null)); //* 0

//* Time: O(n) - We process every node in the tree, so the time taken scales with "n"

//* Space: O(h) - The space usage scales with the number of nodes on the bottom floor
//* In a perfect binary tree, the final row has 2**h nodes
//* So if there are 2 levels (0, 1, 2), there are 4 nodes in the queue at max
