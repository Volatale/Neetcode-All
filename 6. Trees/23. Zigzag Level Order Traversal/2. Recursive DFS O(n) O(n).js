class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
//* Do a regular recursive level order traversal
//* When we reach a new level for the first time
//* Push a new array
//* Add the current element to the array that is tied to the current depth
//* After every node has been accounted for, reverse every second array
function zigzagOrderTraversal(root) {
  if (root === null) return null;

  const results = [];
  preorderTraversal(root, 0, results);

  //* Reverse every second array
  for (let i = 1; i < results.length; i += 2) {
    results[i].reverse();
  }

  return results;
}

function preorderTraversal(curr, depth, results) {
  if (curr === null) return null;

  //* Push a new array the first time we hit a new level
  if (depth === results.length) {
    results.push([]);
  }

  //* Push the depth to the correct array
  results[depth].push(curr.val);

  preorderTraversal(curr.left, depth + 1, results); //* L
  preorderTraversal(curr.right, depth + 1, results); //* R
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

//* Space: O(n) - The space usage scales with the size of the input
//* We also have to consider the call stack depth - that scales with the height of the tree
