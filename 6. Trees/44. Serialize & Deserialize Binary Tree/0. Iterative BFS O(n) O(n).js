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

//* Make sure you denote null nodes
//* Use separators
function serialize(root) {
  const results = [];
  const queue = new MyQueue([root]);

  while (!queue.isEmpty()) {
    const curr = queue.dequeue();

    if (curr === null) {
      results.push("#"); //* Mark null nodes
    } else {
      results.push(curr.val); //* Add the current value
      queue.enqueue(curr.left);
      queue.enqueue(curr.right);
    }

    results.push(","); //* Add a separator
  }

  return results.join("");
}

//* Convert the data string into an array of strings
//* Track the index we need to create nodes using
//* Ignore null nodes
function deserialize(data) {
  if (data.length === 0 || data[0] === "#") return null;

  data = data.split(","); //* Create an array of nodes and remove the separators
  let index = 0; //* Tracks the index (node) we need to use as a value
  const root = new TreeNode(parseInt(data[index++])); //* Create the root node
  const queue = new MyQueue([root]); //* Queue for BFS

  while (!queue.isEmpty()) {
    const curr = queue.dequeue();

    //* Create the left child's node
    if (index < data.length && data[index] !== "#") {
      curr.left = new TreeNode(parseInt(data[index]));
      queue.enqueue(curr.left);
    }

    //* Move past the current node (it was processed, or null)
    index++;

    //* Create the right child's node
    if (index < data.length && data[index] !== "#") {
      curr.right = new TreeNode(parseInt(data[index]));
      queue.enqueue(curr.right);
    }

    //* Move past the current node (it was processed, or null)
    index++;
  }

  return root;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);
root1.right.left = new TreeNode(4);
root1.right.right = new TreeNode(5);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(3);
root2.left.left.left = new TreeNode(4);
root2.left.left.left.left = new TreeNode(5);

const root3 = new TreeNode(1);
root3.left = new TreeNode(2);
root3.right = new TreeNode(3);

console.log(deserialize(serialize(root1)));
// console.log(deserialize(serialize(root2)));
// console.log(deserialize(serialize(root3)));
// console.log(deserialize(serialize(null)));

//* Time: O(n) - It takes O(n) time to serialize the tree
//* Then it takes O(n) to deserialize the tree
//* Creating nodes takes constant time

//* Space: O(n) - The space usage scales with the number of nodes
//* Serializing creates a string that scales in size with "n"
//* We also create "n" tree nodes
//* The depth of the call stack scales with the height of the tree
