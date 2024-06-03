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

//* Perform a BFS Level Order Traversal
//* Track the size of the queue BEFORE processing nodes at each level
//* We only want to process the nodes on the current level
//* The children that get enqueued will be processed on the next iteration
//* At the start of each iteration of the while loop, create a new array
//* Push all of the elements that exist on this level to that array
//* Then, after the for loop is done, push the array to the results array
function levelOrderTraversal(root) {
  //* There are no nodes
  if (root === null) return [];

  const results = [];
  const queue = new MyQueue([root]); //* Queue for BFS

  while (!queue.isEmpty()) {
    let size = queue.size;
    const values = []; //* Array to hold the values on this level

    //* Only process nodes on this level
    for (let i = 0; i < size; i++) {
      const curr = queue.dequeue();

      values.push(curr.val);

      //* Only enqueue non-null nodes
      if (curr.left) queue.enqueue(curr.left);
      if (curr.right) queue.enqueue(curr.right);
    }

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

console.log(levelOrderTraversal(root1));
console.log(levelOrderTraversal(root2));
console.log(levelOrderTraversal(null));

//* Time: O(n) - The time taken scales with the number of nodes in the tree
//* It takes O(1) time to enqueue and dequeue from a queue
//* It takes α(1) time to push to an array

//* Space: O(n) - The results array scales in size linearly with the number of nodes
//* The queue scales in size with the maximum width of the tree O(w)
