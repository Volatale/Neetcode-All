class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Use Postorder Traversal
//* We need to process the children before the current node
//* There are 3 (4) cases to handle in each recursive call
//* If root.val === 0 or 1, return the evaluation
//* If root.val === 2, evaluate left || right
//* If root.val === 3, evaluate left && root
//* The "true" value will be propagated up to the caller
function evaluateTree(root) {
  //* Base Case
  if (root === null) return false;

  const left = evaluateTree(root.left);
  const right = evaluateTree(root.right);

  if (root.val === 2) return left || right; //* Evaluate OR
  if (root.val === 3) return left && right; //* Evaluate AND

  return root.val === 1; //* Returns true or false
}

const root = new TreeNode(2);
root.left = new TreeNode(1);
root.right = new TreeNode(3);
root.right.left = new TreeNode(0);
root.right.right = new TreeNode(1);

const root2 = new TreeNode(0);

console.log(evaluateTree(root)); //* True
console.log(evaluateTree(root2)); //* False

//* Time: O(n) - We have to traverse to every node in the tree
//* So the time taken scales with the number of nodes in the tree

//* Space: O(h) - The space usage scales with the height of the tree
//* It is not guaranteed to be balanced
