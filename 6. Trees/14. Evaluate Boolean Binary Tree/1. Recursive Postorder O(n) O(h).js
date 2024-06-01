class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Postorder DFS
//* If the node is a leaf, return the value
//* Check the left and right subtrees at each step
//* If root.val === 2, this is an OR operator
//* If left OR right are 1, then return true, else false
//* Otherwise, return true if left AND right are 1
function evaluateTree(root) {
  //* Node is a leaf, so just evaluate it
  if (root.left === null && root.right === null) {
    return root.val;
  }

  const left = evaluateTree(root.left); //* L
  const right = evaluateTree(root.right); //* F

  //* left || right === true if either is true
  if (root.val === 2) return left || right;

  //* left && right === true if BOTH are true
  return left && right;
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

//* Space: O(h) - The space usage scales with the depth of the tree
//* Each successive recursive call adds another stack frame
//* The tree is not guaranteed to be balanced
//* If the tree IS balanced, the space usage scales with O(log n)
