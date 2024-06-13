class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Use Preorder Traversal
//* We need to process the left and right children before the current node
//* Use the equation sum * 10 + curr.val
//* This lets us handle place value
//* Check if the current node is null, then do the equation one more time
function sumRootToLeafPath(root) {
  return sumPath(root, 0);
}

function sumPath(curr, sum) {
  if (curr === null) return 0;

  //* Handles the place value
  sum = sum * 10 + curr.val;

  //* Check if leaf
  if (curr.left === null && curr.right === null) {
    return sum;
  }

  return sumPath(curr.left, sum) + sumPath(curr.right, sum);
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(3);
root2.left.right = new TreeNode(4);
root2.right = new TreeNode(5);
root2.right.left = new TreeNode(6);
root2.right.right = new TreeNode(7);

const root3 = new TreeNode(4);
root3.left = new TreeNode(9);
root3.left.left = new TreeNode(5);
root3.left.right = new TreeNode(1);
root3.right = new TreeNode(0);

console.log(sumRootToLeafPath(root1)); //* 25
console.log(sumRootToLeafPath(root2)); //* 560
console.log(sumRootToLeafPath(root3)); //* 1026

//* Time: O(n) - It takes O(n) time to traverse to every node
//* There are "n" recursive calls in total

//* Space: O(h) - The space used by the call stack scales with the height of the tree
//* If the tree is balanced, the space usage is limited to O(h)
