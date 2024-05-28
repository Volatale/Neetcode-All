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

//* Use BFS, we need to be able to swap both children at the same time
//* DFS would be more tedious to perform
//* Like the recursive version, we essentially just swap at every level
//* Once the swapping is done, enqueue the left and right children (if valid)
//* Repeat the process until we are done
function invertTree(root) {
  if (root === null) return root;

  //* A Queue for BFS
  const queue = new MyQueue();
  queue.enqueue(root);

  while (!queue.isEmpty()) {
    const curr = queue.dequeue();

    //* Swap the left and right children
    const temp = curr.left;
    curr.left = curr.right;
    curr.right = temp;

    //* Do the same thing for the left and right children (if they exist)
    if (curr.left) queue.enqueue(curr.left);
    if (curr.right) queue.enqueue(curr.right);
  }

  return root;
}

const root = new TreeNode(4);
root.left = new TreeNode(7);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(2);
root.right = new TreeNode(2);
root.right.left = new TreeNode(1);
root.right.right = new TreeNode(5);

const root2 = new TreeNode(5);
root2.left = new TreeNode(10);
root2.right = new TreeNode(15);

const root3 = new TreeNode(5);

const root4 = new TreeNode(2);
root4.left = new TreeNode(1);
root4.right = new TreeNode(3);

const root5 = new TreeNode(4);
root5.left = new TreeNode(2);
root5.left.left = new TreeNode(1);
root5.left.right = new TreeNode(3);
root5.right = new TreeNode(7);
root5.right.left = new TreeNode(6);
root5.right.right = new TreeNode(9);

const root6 = new TreeNode(1);

console.log(invertTree(root));
console.log(invertTree(root2));
console.log(invertTree(root3));
console.log(invertTree(root4));
console.log(invertTree(root5));
console.log(invertTree(null));

//* Time: O(n) - We have to process every node eventually
//* So the time taken scales with the number of nodes we have

//* Space: O(n) - In a perfect binary tree, the max number of nodes in the queue is 2^h
//* So if there are 2 levels (levels 0 through 2), then the last row has 4 nodes
//* So essentially, the space usage scales with the number of nodes in the last row
