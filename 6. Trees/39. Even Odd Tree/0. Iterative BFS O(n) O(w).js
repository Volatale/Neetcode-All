/**
 ** - Binary Tree is Even-Odd if:
 **     - Root of tree is at level 0, children are on the next levels down
 **     - For every EVEN indexed level:
 **         - All nodes should have ODD values
 **         - Be in STRICTLY INCREASING order
 **     - For every ODD indexed level:
 **         - All nodes should have EVEN values
 **         - Be in STRICTLY DECREASING order
 */

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

//* Track the level via parity (alternate between 0 and 1)
//* We need to track the previous value
//* But the initial value of it changes based on the parity
//* Since even parity nodes should INCREASE, prevVal = -Infinity
//* Else, prevVal = Infinity since values should DECREASE
//* If parity === 0, values should be ODD and > prevVal
//* Else parity === 1, values should be EVEN and < prevVal
//* Enqueue the children to validate the subtrees too
function isEvenOddTree(root) {
  const queue = new MyQueue([root]);
  let parity = 0;

  while (!queue.isEmpty()) {
    let size = queue.size; //* Snapshot for level-order traversal
    let prevVal = parity === 0 ? -Infinity : Infinity;

    for (let i = 0; i < size; i++) {
      const curr = queue.dequeue();

      //* If parity is EVEN, values should be ODD and > prevVal
      if (parity === 0 && (curr.val % 2 === 0 || curr.val <= prevVal))
        return false;

      //* If parity is ODD, values should be EVEN and < prevVal
      if (parity === 1 && (curr.val % 2 === 1 || curr.val >= prevVal))
        return false;

      prevVal = curr.val;

      //* Validate the children too
      if (curr.left) queue.enqueue(curr.left);
      if (curr.right) queue.enqueue(curr.right);
    }

    //* Swap parities
    parity ^= 1;
  }

  return true;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(10);
root1.left.left = new TreeNode(3);
root1.left.left.left = new TreeNode(12);
root1.left.left.right = new TreeNode(8);
root1.right = new TreeNode(4);
root1.right.left = new TreeNode(7);
root1.right.left.left = new TreeNode(6);
root1.right.right = new TreeNode(9);
root1.right.right.right = new TreeNode(2);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.right = new TreeNode(4);

const root3 = new TreeNode(10);

const root4 = new TreeNode(1);
root4.left = new TreeNode(4);
root4.left.left = new TreeNode(3);
root4.left.right = new TreeNode(5);
root4.right = new TreeNode(6);
root4.right.left = new TreeNode(7);
root4.right.right = new TreeNode(8);

const root5 = new TreeNode(5);
root5.left = new TreeNode(4);
root5.left.left = new TreeNode(3);
root5.left.right = new TreeNode(3);
root5.right = new TreeNode(2);
root5.right.left = new TreeNode(7);

console.log(isEvenOddTree(root1)); //* True
console.log(isEvenOddTree(root2)); //* True
console.log(isEvenOddTree(root3)); //* False -> Root is Even
console.log(isEvenOddTree(root4)); //* False -> 8 is an even on an even level
console.log(isEvenOddTree(root5)); //* False -> 3 is followed by 3, isn't strictly increasing

//* Time: O(n) - The time taken scales with the number of nodes in the tree
//* It takes O(1) time to enqueue and dequeue nodes

//* Space: O(w) - The queue size scales with the width of the tree
//* If the tree resembles a linked list, the queue will only have 1 element per level
//* When the tree is balanced, the queue holds (n / 2) + 1 nodes on the final level
