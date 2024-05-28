class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Find the max depth of the left and right subtrees recursively
//* The depth is the number of nodes along the longest path
//* To find the depth of the root node, we need the children's depths, then we add 1
function maxDepth(root) {
  //* Base Case - This doesn't count as a node
  if (root === null) return 0;

  //* Find the max depth of the left and right subtree at each node
  //* Then +1 to account for THIS node in particular
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

const root1 = new TreeNode(3);
root1.left = new TreeNode(9);
root1.right = new TreeNode(20);
root1.right.left = new TreeNode(15);
root1.right.right = new TreeNode(7);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(3);
root2.right = new TreeNode(3);

const root3 = new TreeNode(1);
root3.right = new TreeNode(2);

const root4 = new TreeNode(5);
root4.left = new TreeNode(10);
root4.left.left = new TreeNode(15);
root4.left.left.left = new TreeNode(20);
root4.left.left.left.left = new TreeNode(25);

console.log(maxDepth(root1)); //* 3
console.log(maxDepth(root2)); //* 3
console.log(maxDepth(root3)); //* 2
console.log(maxDepth(root4)); //* 5
console.log(maxDepth(null)); //* 0

//* Time: O(n) - We have to process every node in the tree
//* So the time taken scales with the number of nodes

//* Space: O(h) - If the tree resembles a linked list, the stack scales with the height of the tree
