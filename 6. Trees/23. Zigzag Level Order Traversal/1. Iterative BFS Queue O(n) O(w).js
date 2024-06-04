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

//* Use a deque - we need to alternate between left and right orders
//* If parity is 0, pop from the right, and push to the left (left first)
//* If parity is 1, pop from the left, and push to the right (right first)
//* Keep repeating this process until we are done
//* By PUSHING to the LEFT, the next iteration makes us POP from the LEFT
//* So we process the level in REVERSE order
//* From THIS level, push to the RIGHT (right first)
//* Then on the next iteration, you pop from the right which is left to right ordered
function zigzagOrderTraversal(root) {
  if (!root) return [];

  const results = [];
  const queue = new MyQueue([root]); //* Queue for BFS

  let parity = 0;

  while (queue.length > 0) {
    let size = queue.length; //* Enables level order traversal
    const values = new Array(size);

    for (let i = 0; i < size; i++) {
      let curr = queue.dequeue();

      if (parity === 0) {
        curr[i] = curr.val; //* Set values in NORMAL order
      } else {
        curr[size - i - 1] = curr.val; //* Set values in REVERSE order
      }

      //* Enqueue children if they exist
      if (curr.left) queue.enqueue(curr.left);
      if (curr.right) queue.enqueue(curr.right);
    }

    parity ^= 1; //* Swap parities
    results.push(values);
  }

  return results;
}

const root1 = new TreeNode(3);
root1.left = new TreeNode(9);
root1.right = new TreeNode(20);
root1.right.left = new TreeNode(15);
root1.right.right = new TreeNode(7);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(3);
root2.left.right = new TreeNode(4);
root2.right = new TreeNode(5);
root2.right.left = new TreeNode(6);
root2.right.right = new TreeNode(7);

const root3 = new TreeNode(1);

console.log(zigzagOrderTraversal(root1));
console.log(zigzagOrderTraversal(root2));
console.log(zigzagOrderTraversal(root3));
console.log(zigzagOrderTraversal(null));

//* Time: O(n) - The time taken to push every value to an array scales with "n"

//* Space: O(w) - The size of the deque scales with the width of the tree
//* If the first level has 1 node, and the last has 8, then the deque may store 8 elements at once
