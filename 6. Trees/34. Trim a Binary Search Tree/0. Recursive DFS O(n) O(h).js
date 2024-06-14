class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* There are only two cases to consider
//* Node is WITHIN the boundaries
//*     - Modify the left and right subtrees accordingly
//*     - We can include THIS node in the final tree
//* Node is OUTSIDE of the boundaries
//*     - If the node is too small, go to the right
//*     - If the node is too large, go to the left
//*     - We need to "exclude" nodes outside of the bounaries
function trimBST(root, low, high) {
  if (root === null) return null;

  //* The current node needs to be excluded from the final tree
  if (root.val < low) {
    return trimBST(root.right, low, high); //* Go right, curr is too small
  } else if (root.val > high) {
    return trimBST(root.left, low, high); //* Go left, curr is too large
  }

  //* Current Node is within low and high boundaries
  root.left = trimBST(root.left, low, high);
  root.right = trimBST(root.right, low, high);
  return root;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(0);
root1.right = new TreeNode(2);

const root2 = new TreeNode(3);
root2.left = new TreeNode(0);
root2.left.right = new TreeNode(2);
root2.left.right.left = new TreeNode(1);
root2.right = new TreeNode(4);

const root3 = new TreeNode(4);
root3.left = new TreeNode(2);
root3.left.right = new TreeNode(3);
root3.right = new TreeNode(6);
root3.right.left = new TreeNode(7);

const root4 = new TreeNode(100);
root4.left = new TreeNode(1);

console.log(trimBST(root1, 1, 2));
console.log(trimBST(root2, 1, 3));
console.log(trimBST(root3, 4, 4));
console.log(trimBST(root4, 1, 99));

//* Time: O(n) - In the worst case, we have to process every node in the tree
//* The time taken scales with the number of nodes
//* Even though this is a BST, the tree is not guaranteed to be balanced

//* Space: O(h) - The space used by the call stack scales with the size of the tree
//* If the tree is balanced, the space usage is limited to O(log n)
//* When the tree resembles a linked list, the space usage is O(h) (equivalent to O(n))
