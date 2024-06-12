class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Use Preorder Traversal (NLR)
//* Ensure that the current node is valid when considering its children
//* When you go left, set the UPPER bound to the current node
//* When you go right, set the LOWER bound to the current node
//* This ensures that the current node is < the current node
//* And its also > the previous node
function isValidBST(root) {
  //* Lower and Upper are set to null initially
  return preorderTraversal(root, null, null);
}

function preorderTraversal(curr, lower, upper) {
  //* Null nodes are considered "valid"
  if (curr === null) return true;

  //* Ensure that the node is valid
  if (lower !== null && curr.val <= lower) return false;
  if (upper !== null && curr.val >= upper) return false;

  //* When going left, set the upper bound
  //* When going right, set the lower bound
  return (
    preorderTraversal(curr.left, lower, curr.val) &&
    preorderTraversal(curr.right, curr.val, upper)
  );
}

const root1 = new TreeNode(2);
root1.left = new TreeNode(1);
root1.right = new TreeNode(3);

const root2 = new TreeNode(5);
root2.left = new TreeNode(1);
root2.right = new TreeNode(4);
root2.right.left = new TreeNode(3);
root2.right.right = new TreeNode(6);

const root3 = new TreeNode(100);
root3.left = new TreeNode(150);
root3.right = new TreeNode(200);

const root4 = new TreeNode(2);
root4.left = new TreeNode(1);
root4.right = new TreeNode(3);
root4.right.right = new TreeNode(6);
root4.right.right.left = new TreeNode(5);
root4.right.right.right = new TreeNode(7);

console.log(isValidBST(root1)); //* True
console.log(isValidBST(root2)); //* False
console.log(isValidBST(root3)); //* False
console.log(isValidBST(root4)); //* True

//* Time: O(n) - It takes O(n) time since we need to traverse to every node
//* Checking for the validity of a node is O(1)

//* Space: O(h) - The call stack space scales with the height of the tree
//* If the tree is balanced, it is limited to O(log n)
