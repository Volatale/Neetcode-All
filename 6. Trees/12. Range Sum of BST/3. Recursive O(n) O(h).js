class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Perform a preorder traversal to traverse the tree
//* At each node, check if the node is within the given range
//* If it is, add it to the cummulative sum
//* Perform the same check on the left and right subtrees too
function rangeSumOfBST(root, low, high) {
  if (root === null) return null;

  const results = { sum: 0 }; //* For Pass by Reference
  preorder(root, low, high, results);
  return results.sum;
}

function preorder(curr, low, high, results) {
  if (curr === null) return null;

  //* Only sum if the value is within the valid range
  if (curr.val >= low && curr.val <= high) {
    results.sum += curr.val;
  }

  preorder(curr.left, low, high, results); //* L
  preorder(curr.right, low, high, results); //* R
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
