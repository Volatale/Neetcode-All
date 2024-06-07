class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Find the maximum depth of the left and right subtrees
//* Check if the absolute value of left - right > 1
//* If it is, then the tree is not height balanced
//* We need to check the subtrees before the root
//* So recursively repeat the process on every node
//* Work your way back up to the root
function balancedBinaryTree(root) {
  //* A null root is still balanced
  if (root === null) return true;

  const results = { balanced: true }; //* For Pass by Reference
  maxDepth(root, results);

  return results.balanced;
}

function maxDepth(curr, results) {
  if (curr === null) return 0;

  //* Find the max depth of the left and right subtrees
  const left = maxDepth(curr.left, results);
  const right = maxDepth(curr.right, results);

  //* Check for the height difference
  if (Math.abs(left - right) > 1) {
    results.balanced = false;
  }

  //* Return the Max Depth of the left or right subtree
  return Math.max(left, right) + 1;
}

const root1 = new TreeNode(3);
root1.left = new TreeNode(9);
root1.right = new TreeNode(20);
root1.right.left = new TreeNode(15);
root1.right.right = new TreeNode(7);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(3);
root2.left.right = new TreeNode(3);
root2.left.left.left = new TreeNode(4);
root2.left.left.right = new TreeNode(4);
root2.right = new TreeNode(2);

const root3 = new TreeNode(1);
root3.left = new TreeNode(2);
root3.left.left = new TreeNode(3);
root3.left.left.left = new TreeNode(4);
root3.left.left.left.left = new TreeNode(5);

console.log(balancedBinaryTree(root1)); //* True
console.log(balancedBinaryTree(root2)); //* False
console.log(balancedBinaryTree(root3)); //* False
console.log(balancedBinaryTree(null)); //* True

//* Time: O(n) - The time taken scales with the number of nodes
//* We have to process every node in the tree regardless

//* Space: O(h) - The space usage scales with the height of the tree
//* If the tree is balanced, the depth of the call stack is O(log n)
