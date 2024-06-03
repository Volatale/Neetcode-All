class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Perform a Preorder DFS, but travel right before left
//* If the results array has a length < level
//* It means we haven't seen a value for this level yet
//* We could have 3 nodes going right and then 5 going left
//* The tree extends beyond where the right side blocks
//* So if there is nothing blocking the "left" nodes, we have to add them too
//* Since you can see them from the right side of the tree
function binaryTreeRightSideView(root) {
  //* We have no nodes
  if (root === null) return [];

  const results = [];
  return preorderTraversal(root, 0, results);
}

function preorderTraversal(curr, level, results) {
  if (curr === null) return null;

  //* We only want push ONE node for each level
  if (results.length === level) {
    results.push(curr.val);
  }

  //* Travel right FIRST, this guarantees that the "right" nodes are seen first
  preorderTraversal(curr.right, level + 1, results); //* R
  preorderTraversal(curr.left, level + 1, results); //* L
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.left.left = new TreeNode(3);
root1.left.right = new TreeNode(4);
root1.right = new TreeNode(5);
root1.right.left = new TreeNode(6);
root1.right.right = new TreeNode(7);
root1.right.right.left = new TreeNode(8);
root1.right.right.right = new TreeNode(9);

const root2 = new TreeNode(1);
root2.right = new TreeNode(5);
root2.left = new TreeNode(3);
root2.left.left = new TreeNode(1);

const root3 = new TreeNode(10);

const root4 = new TreeNode(5);
root4.left = new TreeNode(1);
root4.right = new TreeNode(15);

console.log(binaryTreeRightSideView(root1)); //* [1, 5, 7, 9]
console.log(binaryTreeRightSideView(root2)); //* [1, 5, 1]
console.log(binaryTreeRightSideView(root3)); //* [10]
console.log(binaryTreeRightSideView(root4)); //* [5, 15]
console.log(binaryTreeRightSideView(null)); //* []

//* Time: O(n) - We have to process every node in the tree
//* We have no guarantee that there was no right node
//* So we have to process the left ones too

//* Space: O(h) - If the tree is skewed, we store every node value in the results array
//* If the tree is balanced, the space usage via the recursion is O(log n)
//* The space used by the results array scales with the height of the tree
