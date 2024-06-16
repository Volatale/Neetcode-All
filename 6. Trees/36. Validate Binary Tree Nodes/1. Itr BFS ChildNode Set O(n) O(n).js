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

//* A Binary Tree is valid if the following invariants are true
//*     - There is only ONE root
//*     - Only ONE connected component
//*     - Each node can only have parent
//*     - There are no cycles

//* Populate a set so we can check for the number of parents on a node
//* Find the root of the tree; if you find more than 1, return false
//* Iterate through the entire tree using BFS
//* When we visit each node, check if we have already visited that node
//* If we have, return false; there is a cycle in the graph somewhere
//* Otherwise, repeat for the left and right children if they are not null
function validateTree(n, leftChild, rightChild) {
  //* 1. Add child nodes to the set
  const childNodes = new Set();

  for (let i = 0; i < n; i++) {
    if (leftChild[i] !== -1) childNodes.add(leftChild[i]);
    if (rightChild[i] !== -1) childNodes.add(rightChild[i]);
  }

  //* 2. Check for multiple roots, and/or connected components
  let root = -1; //* We start with no root

  for (let i = 0; i < n; i++) {
    if (!childNodes.has(i)) {
      if (root === -1) {
        root = i;
      } else {
        return false; //* Multiple Roots or Connected Components
      }
    }
  }

  //* Handle self cycles
  //* If there is only 1 node and it self cycles, root will still be -1
  if (root === -1) return false;

  //* 3. Perform BFS (validate nodes)
  const queue = new MyQueue([root]);
  const visited = new Set();

  while (!queue.isEmpty()) {
    const curr = queue.dequeue(); //* "Visit" node

    if (visited.has(curr)) return false; //* Cycle Detected

    visited.add(curr); //* Mark as visited

    //* Push the children to be validated too
    if (leftChild[curr] !== -1) {
      queue.enqueue(leftChild[curr]);
    }

    if (rightChild[curr] !== -1) {
      queue.enqueue(rightChild[curr]);
    }
  }

  //* Return true if we have visited every node
  return visited.size === n;
}

console.log(validateTree(4, [1, -1, 3, -1], [2, -1, -1, -1])); //* True
console.log(validateTree(4, [1, -1, 3, -1], [2, 3, -1, -1])); //* False -> 3 has 2 parents
console.log(validateTree(2, [1, 0], [-1, -1])); //* False -> Cycle
console.log(validateTree(4, [1, -1, 3, -1], [2, -1, -1, -1])); //* True
console.log(validateTree(5, [1, -1, 3, -1, -1], [2, -1, -1, -1, -1])); //* False -> Multiple Connected Components
console.log(validateTree(4, [1, 0, 3, -1], [-1, -1, -1, -1])); //* False -> Cycle, 2 Compnents

//* Time: O(n) - The time taken to populate the childNodes set scales linearly with "n"
//* It takes O(n) time to find the root and check for connected components
//* Finally, the BFS itself scales with the number of nodes in the tree

//* Space: O(n) - The childNodes set stores "n" values (every node)
//* In the worst case, the visited set scales with "n"
//* The queue itself scales with the number of nodes (n)
