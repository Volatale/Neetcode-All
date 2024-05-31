class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Preorder DFS to travel to each node in the tree
//* Add the value at the current node
//* Check if this node is a leaf node
//* And also check if the sum === targetSum
//* If it is, we found a root-to-leaf path
//* Otherwise, check the left and right subtrees
//* When we go back up the tree, the stack frame is popped
//* So the "sum" goes back to the previous value (automatic subtraction)
function pathSum(root, targetSum) {
  //* There must be at least one node in the path to be true
  if (root === null) return false;

  return preorderTraversal(root, targetSum, 0);
}

function preorderTraversal(curr, targetSum, sum) {
  if (curr === null) return false;

  //* Add the current value
  sum += curr.val;

  //* If curr is a leaf, and sum === target
  if (curr.left === null && curr.right === null && sum === targetSum) {
    return true;
  }

  //* Check the left and right subtrees
  return (
    preorderTraversal(curr.left, targetSum, sum) ||
    preorderTraversal(curr.right, targetSum, sum)
  );
}

const root1 = new TreeNode(5);
root1.left = new TreeNode(2);
root1.left.left = new TreeNode(3);
root1.left.right = new TreeNode(2);
root1.right = new TreeNode(4);

const root2 = new TreeNode(10);
root2.left = new TreeNode(5);
root2.right = new TreeNode(100);

const root3 = new TreeNode(1);
root3.left = new TreeNode(5);
root3.left.right = new TreeNode(10);

const root4 = new TreeNode(10);

console.log(pathSum(root1, 9)); //* True
console.log(pathSum(root2, 10)); //* False, not at leaf
console.log(pathSum(root3, 16)); //* True
console.log(pathSum(root4, 6)); //* False, not at leaf
console.log(pathSum(root4, 10)); //* True
console.log(pathSum(null, 0)); //* False

//* Time: O(n) - We have to iterate through every element in the tree
//* Adding and subtracting the values takes O(1) time

//* Space: O(h) - The depth of the call stack scales with the height of the tree
//* If the tree is balanced, the space usage is therefore O(log n)
