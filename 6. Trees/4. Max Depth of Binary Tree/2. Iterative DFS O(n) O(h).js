class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Find the max depth of the left and right subtrees before the parent
//* Use postorder traversal to accomplish this
//* The depth is the number of nodes along the longest path
//* To find the depth of the root node, we need the children's depths, then we add 1
function maxDepth(root) {
  if (root === null) return 0;

  const stack = [];

  let curr = root;
  let prev = null;

  let depth = 0;
  let maxDepth = 0;

  while (curr !== null || stack.length > 0) {
    //* Move left all the way
    while (curr !== null) {
      stack.push([curr, depth + 1]); //* Push a tuple of the node and the depth of it
      depth++;
      curr = curr.left; //* L
    }

    //* We pushed a tuple so we need to destructure both values
    [curr, depth] = stack[stack.length - 1];

    if (curr.right === null || curr.right === prev) {
      stack.pop();
      maxDepth = Math.max(maxDepth, depth);
      prev = curr;
      curr = null;
    } else {
      curr = curr.right; //* R
    }
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
