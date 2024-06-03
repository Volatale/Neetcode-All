class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* There are only three cases at each node
//* Case 1: Left AND Right are BOTH null -> true (same structure)
//* Case 2: Left OR Right are null -> false (structures are different)
//* Case 3: Left.val !== Right.val -> false (values are different)
//* We want to traverse the entire tree on both sides at the same time
//* (left.left & right.right) && (left.right & right.left)
function isSymmetric(root) {
  //* A single node is symmetrical
  if (root === null) return true;

  //* Root is always true; check if subtrees are true
  return checkSymmetric(root.left, root.right);
}

function checkSymmetric(left, right) {
  if (left === null && right === null) return true; //* "Same" Structure
  if (left === null || right === null) return false; //* "Different structure"
  if (left.val !== right.val) return false; //* Different value

  //* Check if this is true for the subtrees too
  return (
    checkSymmetric(left.left, right.right) &&
    checkSymmetric(left.right, right.left)
  );
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.left.left = new TreeNode(3);
root1.left.right = new TreeNode(4);
root1.right = new TreeNode(2);
root1.right.left = new TreeNode(4);
root1.right.right = new TreeNode(3);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.right = new TreeNode(3);
root2.right = new TreeNode(2);
root2.right.right = new TreeNode(3);

console.log(isSymmetric(root1)); //* True
console.log(isSymmetric(root2)); //* False

//* Time: O(n) - We have to traverse the entire tree to check for symmetricity

//* Space: O(h) - The space usage scales with the height of the tree
//* If the tree is balanced, the space usage is limited to O(log n)
