//* A Binary Tree is valid if the following invariants are true
//*     - There is only ONE root
//*     - Only ONE connected component
//*     - Each node can only have parent
//*     - There are no cycles

//* Add the child nodes to a set
//* Find the root node, if there are multiple, return false
//* Iterate through the entire tree using DFS
//* When we visit the node, mark it as visited
//* If we have already visited the node, there is a cycle; return false
//* Mark the current node as visited
//* Repeat the process for the children
//* At the end, iterate through visited to check for unvisited nodes
//* Unvisited nodes means there is more than one connected component; return false
function validateTree(n, leftChild, rightChild) {
  //* 1. Add the child nodes to a set
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

  //* 3. Perform DFS (validate nodes)
  const stack = [root];
  const visited = new Array(n).fill(false);

  while (stack.length > 0) {
    const curr = stack.pop(); //* "Visit" node

    if (visited[curr]) return false; //* Cycle Detected

    visited[curr] = true; //* Mark as visited

    //* Push the children to be validated too
    if (rightChild[curr] !== -1) {
      stack.push(rightChild[curr]);
    }

    if (leftChild[curr] !== -1) {
      stack.push(leftChild[curr]);
    }
  }

  //* 4. Check if there is more than 1 connected component
  for (let i = 0; i < n; i++) {
    if (!visited[i]) return false;
  }

  return true;
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
//* The visited array also scales with "n"
//* The size of the stack scales with the height of the tree
//* If the tree is balanced, the space usage of the stack is O(log n)
