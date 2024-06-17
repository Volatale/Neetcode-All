class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* We need a way to retain the maximum diameter found so far
//* Using a parameter wouldn't help because the state would be removed on pop (callstack)
//* So we use an object, which gives us Pass by Reference
//* The diameter is the length of the longest path between any two nodes
//* So take the maximum depth of the left and right subtrees and sum them
function diameterOfBinaryTree(root) {
  if (root === null) return 0;

  const results = { diameter: 0 }; //* Pass by Reference maintains the max through calls
  getMaxDepth(root, results);
  return results.diameter;
}

function getMaxDepth(curr, results) {
  if (curr === null) return 0;

  //* Get the max depth of the left and right subtrees
  const left = getMaxDepth(curr.left, results);
  const right = getMaxDepth(curr.right, results);

  //* Check if this is a new max diameter
  results.diameter = Math.max(results.diameter, left + right);

  //* Gives us the maximum of the left and right subtrees, then include THIS node (+1)
  return Math.max(left, right) + 1;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.left.right = new TreeNode(7);
root1.left.left = new TreeNode(3);
root1.left.left.left = new TreeNode(4);
root1.left.left.left.left = new TreeNode(5);
root1.right = new TreeNode(6);

const root2 = new TreeNode(1);
root2.left = new TreeNode(5);
root2.right = new TreeNode(9);

const root3 = new TreeNode(1);
root3.left = new TreeNode(2);
root3.right = new TreeNode(3);
root3.left.left = new TreeNode(4);
root3.left.right = new TreeNode(5);

const root4 = new TreeNode(100);

const root5 = new TreeNode(1);
root5.left = new TreeNode(2);

console.log(diameterOfBinaryTree(root1));
console.log(diameterOfBinaryTree(root2));
console.log(diameterOfBinaryTree(root3));
console.log(diameterOfBinaryTree(root4));
console.log(diameterOfBinaryTree(root5));
console.log(diameterOfBinaryTree(null));

//* Time: O(n) - We process every node in the tree
//* So the time taken scales with "n"

//* Space: O(h) - In a perfect binary tree, there are 2^h nodes
//* So the space complexity scales with the "height" of the tree
//* In the worst case, the tree resembles a linked list
