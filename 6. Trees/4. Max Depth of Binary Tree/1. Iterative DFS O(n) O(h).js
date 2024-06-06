class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Use DFS since it goes depth first
//* Track the max depth found so far
//* Push tuples of [node, depthOfNode]
//* This way, when we go back up the tree, the depth decreases as necessary
function maxDepth(root) {
  if (root === null) return 0;

  //* [node, depth]
  const stack = [[root, 1]];

  let maxDepth = 0;

  while (stack.length > 0) {
    const [curr, depth] = stack.pop();

    //* Update the depth if possible
    maxDepth = Math.max(maxDepth, depth);

    //* Add the left and right nodes to check their depth too
    if (curr.left) stack.push([curr.left, depth + 1]);
    if (curr.right) stack.push([curr.right, depth + 1]);
  }

  return maxDepth;
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

//* Time: O(n) - We process every node in the tree, so the time taken scales with "n"
//* Pushing and popping take O(1) time

//* Space: O(h) - The stack's size scales with the depth of the tree
//* DFS goes depth first, so an unbalance tree uses more space
//* If the tree is balanced, the stack size scales at a rate of O(log n)
