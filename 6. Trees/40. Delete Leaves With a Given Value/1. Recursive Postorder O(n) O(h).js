class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Since we may need to remove the parent too
//* We should traverse in a postorder manner
//* The subtrees should be handled BEFORE the parent
//* Because the parent could become an invalid leaf itself post-deletion
//* Returning null means we return null to the caller (thereby deleting the connection)
function removeLeafNodes(root, target) {
  if (root === null) return null;

  root.left = removeLeafNodes(root.left, target);
  root.right = removeLeafNodes(root.right, target);

  //* If this is a leaf node and the value matches
  if (root.left === root.right && root.val === target) {
    return null; //* Remove this node (returns null to the caller)
  }

  return root;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.left.left = new TreeNode(2);
root1.right = new TreeNode(3);
root1.right.left = new TreeNode(2);
root1.right.right = new TreeNode(4);

const root2 = new TreeNode(5);
root2.left = new TreeNode(5);
root2.left.left = new TreeNode(5);
root2.left.left.left = new TreeNode(5);
root2.left.left.left.left = new TreeNode(5);

const root3 = new TreeNode(1);
root3.left = new TreeNode(2);
root3.right = new TreeNode(3);

console.log(removeLeafNodes(root1));
console.log(removeLeafNodes(root2));
console.log(removeLeafNodes(root3));

//* Time: O(n) - We have to traverse every node in the tree
//* We can't use any heuristics to skip any work

//* Space: O(h) - The depth of the call stack scales with the height of the tree
//* If the tree is balanced, the space usage is limited to O(log n)
//* When the tree resembles a linked list the space usage is O(n), but h <= n
