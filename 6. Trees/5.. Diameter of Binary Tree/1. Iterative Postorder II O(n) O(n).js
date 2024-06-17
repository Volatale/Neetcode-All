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

  const stack = [root];
  const depthMap = new Map();

  let diameter = 0;

  while (stack.length > 0) {
    const curr = stack[stack.length - 1];

    if (curr.left && !depthMap.has(curr.left)) {
      stack.push(curr.left);
    } else if (curr.right && !depthMap.has(curr.right)) {
      stack.push(curr.right);
    } else {
      stack.pop();
      const left = depthMap.get(curr.left) || 0;
      const right = depthMap.get(curr.right) || 0;

      const nodeMax = Math.max(left, right) + 1;
      depthMap.set(curr, nodeMax);

      diameter = Math.max(diameter, left + right);
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
