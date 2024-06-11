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

function maxWidthOfBinaryTree(root) {
  if (root === null) return;

  //* [Node, indexOfNode]
  const queue = new MyQueue([[root, 0]]);
  let maxWidth = 1;

  while (!queue.isEmpty()) {
    const size = queue.size;

    //* Get the indices of the front and back nodes
    let start = queue.front.val[1];
    let end = queue.back.val[1];

    //* Count the number of nodes inbetween end and start
    maxWidth = Math.max(maxWidth, end - start + 1);

    //* Level Order Traversal
    for (let i = 0; i < size; i++) {
      const [curr, index] = queue.dequeue();

      //! Stops overflows; effectively, "index" starts at 0 for each level
      index -= start;

      //* Index of left child is: 2 * i + 1
      if (curr.left) {
        queue.enqueue([curr.left, 2 * index + 1]);
      }

      //* Index of right child is: 2 * i + 2
      if (curr.right) {
        queue.enqueue([curr.right, 2 * index + 2]);
      }
    }
  }

  return maxWidth;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(3);
root1.left.left = new TreeNode(5);
root1.left.right = new TreeNode(3);
root1.right = new TreeNode(2);
root1.right.right = new TreeNode(9);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(3);
root2.left.left.left = new TreeNode(4);
root2.left.left.left.left = new TreeNode(5);

const root3 = new TreeNode(1);
root3.left = new TreeNode(5);
root3.right = new TreeNode(6);

console.log(maxWidthOfBinaryTree(root1)); //* 4
console.log(maxWidthOfBinaryTree(root2)); //* 1
console.log(maxWidthOfBinaryTree(root3)); //* 2

//* Time: O(n) - We have to process every node in the tree
//* So the time taken scales with the number of nodes
//* It takes O(1) to enqueue and dequeue from the queue

//* Space: O(w) - The size of the stack scales with the width of the tree
//* In a balanced tree, the stack contains (n / 2) + 1 elements on the final level
