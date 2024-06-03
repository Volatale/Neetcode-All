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
    this.next = null;
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

//* Perform a Breadth First Search
//* There are only three cases at each node
//* Case 1: Left AND Right are BOTH null -> true (same structure)
//* Case 2: Left OR Right are null -> false (structures are different)
//* Case 3: Left.val !== Right.val -> false (values are different)
//* We want to traverse the entire tree on both sides at the same time
//* (left.left & right.right) && (left.right & right.left)
function isSymmetric(root) {
  //* A single node is symmetrical
  if (root === null) return true;

  //* We still have to check the left and right subtrees
  const queue = new MyQueue([root.left, root.right]);

  while (!queue.isEmpty()) {
    const left = queue.dequeue();
    const right = queue.dequeue();

    if (left === null && right === null) continue; //* Same struture
    if (left === null || right === null) return false; //* Different structure
    if (left.val !== right.val) return false; //* Different values

    //* Compare outer nodes
    queue.enqueue(left.left);
    queue.enqueue(right.right);

    //* Compare inner nodes
    queue.enqueue(left.right);
    queue.enqueue(right.left);
  }

  return true;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.left.left = new TreeNode(3);
root1.left.right = new TreeNode(4);
root1.right = new TreeNode(2);
root1.right.left = new TreeNode(4);
root1.right.right = new TreeNode(3);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.right = new TreeNode(3);
root2.right = new TreeNode(2);
root2.right.right = new TreeNode(3);

console.log(isSymmetric(root1)); //* True
console.log(isSymmetric(root2)); //* False

//* Time: O(n) - We have to traverse the entire tree to check for symmetricity

//* Space: O(w) - The stack's size scales with the number of nodes on the widest level
//* If the tree is balanced, the space usage is O(2^h) (2 levels 0, 1, 2 = 2^2 = 4))
