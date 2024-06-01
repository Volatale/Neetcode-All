class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Propogate the sum values as we travel back up the tree
//* If the node is null, return 0
//* If the node val < low, there is no point in going left
//* That would be an even smaller value
//* So call the function recursively, but on the RIGHT node
//* That node is guaranteed to be larger due to the BST property
//* Do the opposite check for root.val > high (would be too large)
//* 
function rangeSumOfBST(root, low, high) {
  if (root === null) return 0;
  if (root.val < low) return rangeSumOfBST(root.right, low, high); //* Need a LARGER value
  if (root.val > high) return rangeSumOfBST(root.left, low, high); //* Need a SMALLER value

  return (
    root.val +
    rangeSumOfBST(root.left, low, high) +
    rangeSumOfBST(root.right, low, high)
  );
}

const root = new TreeNode(10);
root.left = new TreeNode(5);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(7);
root.right = new TreeNode(15);
root.right.right = new TreeNode(18);

const root2 = new TreeNode(10);
root2.left = new TreeNode(5);
root2.left.left = new TreeNode(3);
root2.left.left.left = new TreeNode(1);
root2.left.right = new TreeNode(7);
root2.left.right.left = new TreeNode(6);
root2.right = new TreeNode(15);
root2.left = new TreeNode(13);
root2.right.right = new TreeNode(18);

console.log(rangeSumOfBST(root, 7, 15)); //* 32
console.log(rangeSumOfBST(root2, 6, 10)); //* 10

//* Time: O(n) - In the worst case, we visit every node in the tree

//* Space: O(h) - In the worst case the space usage scales with the height of the tree
//* If we are given a tree that looks like a linked list, the call stack scales in size with the height
//* When the tree is balanced, the space usage is O(log n)
