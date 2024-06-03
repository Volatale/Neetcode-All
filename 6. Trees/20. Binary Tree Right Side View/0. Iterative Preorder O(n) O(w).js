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

//* Perform a preorder traversal
//* But process the RIGHT node BEFORE the left
//* We only want to push ONE node for each level
//* So by processing the RIGHT node first
//* We ensure that we don't add the blocked left nodes
//* Only push if results.length === level
//* That way any higher nodes on the left are blocked (not added)
function binaryTreeRightSideView(root) {
  //* We have no nodes
  if (root === null) return [];

  const results = [];
  const queue = new MyQueue([root]);

  let level = 0;

  while (!queue.isEmpty()) {
    let size = queue.size;

    //* We should only process nodes on the current level
    for (let i = 0; i < size; i++) {
      const curr = queue.dequeue();

      //* It is the FIRST time we have reached this level
      if (results.length === level) results.push(curr.val);

      //* Enqueue the RIGHT child first to ensure
      if (curr.right) queue.enqueue(curr.right);
      if (curr.left) queue.enqueue(curr.left);
    }

    level++;
  }

  return results;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.left.left = new TreeNode(3);
root1.left.right = new TreeNode(4);
root1.right = new TreeNode(5);
root1.right.left = new TreeNode(6);
root1.right.right = new TreeNode(7);
root1.right.right.left = new TreeNode(8);
root1.right.right.right = new TreeNode(9);

const root2 = new TreeNode(1);
root2.right = new TreeNode(5);
root2.left = new TreeNode(3);
root2.left.left = new TreeNode(1);

const root3 = new TreeNode(10);

const root4 = new TreeNode(5);
root4.left = new TreeNode(1);
root4.right = new TreeNode(15);

console.log(binaryTreeRightSideView(root1)); //* [1, 5, 7, 9]
console.log(binaryTreeRightSideView(root2)); //* [1, 5, 1]
console.log(binaryTreeRightSideView(root3)); //* [10]
console.log(binaryTreeRightSideView(root4)); //* [5, 15]
console.log(binaryTreeRightSideView(null)); //* []

//* Time: O(n) - We have to process every node in the tree
//* We have no guarantee that there was no right node
//* So we have to process the left ones too

//* Space: O(w) - The space used by the queue scales with the maximum width
//* The space used by the results array scales with the height of the tree O(h)
