/**
 ** n binary tree nodes numbered 0 to n - 1
 ** node i has TWO children
 **     - leftchild[i]
 **     - rightChild[i]
 *
 ** If node i has NO left child, leftChild[i] = -1
 ** If node i has NO right child, rightChild[i] = -i
 ** Return TRUE is ALL nodes form EXACTLY ONE VALID binary tree
 ** Nodes have NO VALUES, we can ONLY use the node numbers
 */

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

//* Populate a set so we can check for connected components later
//* Find the root of the tree; if you find more than 1, return false
//* Iterate through the entire tree using BFS
//* When we visit each node, check if we have already visited that node
//* If we have, return false; there is a cycle in the graph somewhere
//* Otherwise, enqueue the left and right children if they are not null
function validateBinaryTreeNodes(n, leftChild, rightChild) {
  //* 1. Add child nodes to the set
  const childNodes = new Set();

  for (let i = 0; i < n; i++) {
    if (leftChild[i] !== -1) childNodes.add(leftChild[i]);
    if (rightChild[i] !== -1) childNodes.add(rightChild[i]);
  }

  //* 2. Find the root
  let root = -1;

  //* Also checks for connected components
  for (let i = 0; i < n; i++) {
    if (!childNodes.has(i)) {
      if (root === -1) {
        root = i;
      } else {
        //* Found more than one root
        return false;
      }
    }
  }

  //* No root was found
  if (root === -1) return false;

  //* 3. Perform a BFS
  const visited = new Set();
  const queue = new MyQueue([root]);

  while (!queue.isEmpty()) {
    const curr = queue.dequeue(); //* "Visit" node

    if (visited.has(curr)) return false; //* Cycle Detected

    visited.add(curr); //* Mark as visited

    //* Enqueue children to be visited too
    if (leftChild[curr] !== -1) {
      queue.enqueue(leftChild[curr]);
    }

    if (rightChild[curr] !== -1) {
      queue.enqueue(rightChild[curr]);
    }
  }

  //* True if we have visited every node
  return visited.size === n;
}

console.log(validateBinaryTreeNodes(4, [1, -1, 3, -1], [2, -1, -1, -1])); //* True
console.log(validateBinaryTreeNodes(4, [1, -1, 3, -1], [2, 3, -1, -1])); //* False -> 3 has 2 parents
console.log(validateBinaryTreeNodes(2, [1, 0], [-1, -1])); //* False -> Cycle

//* Time: O(n) - The time taken to populate the childNodes set scales linearly with "n"
//* It takes O(n) time to find the root and check for connected components
//* Finally, the BFS itself scales with the number of nodes in the tree

//* Space: O(n) - The childNodes set stores "n" values (every node)
//* The queue itself scales with the number of nodes (n)
