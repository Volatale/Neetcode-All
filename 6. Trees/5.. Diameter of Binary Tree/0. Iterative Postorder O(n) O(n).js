class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* We need a way to propagate values back up the tree
//* Since this isn't recursion we can't just pop the callstack
//* Instead we need to keep track of the depth of the nodes in a map
//* The first time we find a node, add it to the depthMap
//* When we process nodes, get the depth of the left and right subtrees from depthMap
//* Then, calculate the max of left and right + 1
//* Update the current node with that value in the depthMap
//* This sets the CURRENT node to the max of left and right + 1
//* After, try to update the diameter
function diameterOfBinaryTree(root) {
  if (root === null) return 0;

  const stack = [];
  const depthMap = new Map(); //* Depth of each node

  let curr = root;
  let prev = null;

  let diameter = 0;

  while (curr !== null || stack.length > 0) {
    while (curr !== null) {
      depthMap.set(curr, 0); //* Depth of nodes is 0 to start with
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack[stack.length - 1];

    if (curr.right === null || curr.right === prev) {
      stack.pop();

      //* Get the depths of the left and right subtrees
      const left = depthMap.get(curr.left) || 0;
      const right = depthMap.get(curr.right) || 0;

      const nodeMax = Math.max(left, right) + 1;

      //* Update the depth of THIS node with the max of left & right + 1
      depthMap.set(curr, nodeMax);

      //* Try to update the diameter
      diameter = Math.max(diameter, left + right);

      prev = curr;
      curr = null;
    } else {
      curr = curr.right;
    }
  }

  return diameter;
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

//* Time: O(n) - We have to process every node in the tree
//* The time taken to get/set in a map is O(1) on average

//* Space: O(h) - The stack size scales with the height of the tree
//* The depthMap scales with the number of nodes in the tree
