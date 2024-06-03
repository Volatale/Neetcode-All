class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Use Inorder Traversal
//* We were given a Binary Search Tree
//* BSTs are sorted from left to right
//* Inorder Traversal goes straight to the left
//* So compare the current node with the previous node
//* Use Math.abs(curr.val - results.prev) to handle NEGATIVE values
//* This will give the minimum difference immediately
function minDifference(root) {
  if (root === null) return 0;

  const stack = [];

  let curr = root;
  let prev = null; //* Holds the previous node

  let minDiff = Infinity; //* We want to find the MINIMUM - any value < Infinity

  //* Inorder Traversal
  while (curr !== null || stack.length > 0) {
    //* Go left all the way
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left; //* L
    }

    curr = stack.pop();

    if (prev !== null) {
      minDiff = Math.min(minDiff, Math.abs(curr.val - prev.val)); //* Abs handles negative values
    }

    prev = curr;
    curr = curr.right; //* R
  }

  return minDiff;
}

const root1 = new TreeNode(4);
root1.left = new TreeNode(2);
root1.left.left = new TreeNode(1);
root1.left.right = new TreeNode(3);
root1.right = new TreeNode(6);

const root2 = new TreeNode(1);
root2.left = new TreeNode(0);
root2.right = new TreeNode(48);
root2.right.left = new TreeNode(12);
root2.right.right = new TreeNode(49);

const root3 = new TreeNode(100);
root3.left = new TreeNode(1);

console.log(minDifference(root1));
console.log(minDifference(root2));
console.log(minDifference(root3));

//* Time: O(n) - We have to traverse the entire tree, so the time taken scales with "n"

//* Space: O(h) - The space used by the stack scales with the height of the tree
//* In the worst case it would be O(n) - the tree could resemble a linked list
//* If the tree is balanced, the space usage is O(log n)
