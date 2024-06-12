class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Use Inorder Traversal, this gives us the nodes in order
//* Essentially, we want to ensure that each node is > its previous
//* Additionally, Binary Search Trees should not have duplicate values
//* That means if the value is LESS THAN OR EQUAL TO prev, return false
//! Don't pass prev as an argument, it needs to be a global variable
function isValidBST(root) {
  function validate(curr) {
    //* Null nodes are considered to "valid"
    if (curr === null) return true;

    if (!validate(curr.left)) return false;

    //* Ensure that this node > previous
    if (prev !== null && curr.val <= prev.val) return false;

    //* Update the prev variable
    prev = curr;
    return validate(curr.right);
  }

  let prev = null;
  return validate(root, prev);
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
