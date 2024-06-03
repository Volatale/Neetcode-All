class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Perform a preorder traversal (DFS) to navigate to every node
//* Track the current depth that we are on
//* The first time we reach a new depth, push a new array to results
//* Push the node's value to the array at index of "depth"

function levelOrderTraversal(root) {
  //* There are no nodes
  if (root === null) return [];

  const results = [];
  return preorderTraversal(root, 0, results);
}

function preorderTraversal(curr, depth, results) {
  if (curr === null) return null;

  //* Create a new array when we hit a new depth for the first time
  if (depth === results.length) {
    results.push([]);
  }

  //* Push the current value to the array at index of depth
  results[depth].push(curr.val);

  preorderTraversal(curr.left, depth + 1, results); //* L
  preorderTraversal(curr.right, depth + 1, results); //* R

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
//* We have to process every node

//* Space: O(n) - The space used by the results array scales with the number of nodes
//* We also use O(h) space for the call stack; the tree is not guaranteed to be balanced
//* If the tree is balanced, the depth of the call stack is O(log n)
