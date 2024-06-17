class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Use Postorder Traversal
//* We need to find the number of coins that the node has
//* But the left and right subtrees' coins must be included
//* We want to leave ONE coin at the current node whenever we distribute
//* So left + right + curr.val - 1 tells us how any moves to move every OTHER coin bar 1
function distributeCoins(root) {
  const stack = [];

  let curr = root;
  let prev = null;

  let moves = 0;

  //* Tracks the number of EXTRA coins that a node has
  const coinMap = new Map();

  while (curr !== null || stack.length > 0) {
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack[stack.length - 1];

    if (curr.right === null || curr.right === prev) {
      //* Get the number of coins on the left and right subtrees
      const left = coinMap.get(curr.left) || 0;
      const right = coinMap.get(curr.right) || 0;

      //* We can't have a negative number of coins
      moves += Math.abs(left) + Math.abs(right);

      //* The number of EXTRA coins at the current node
      coinMap.set(curr, left + right + curr.val - 1);

      stack.pop();
      prev = curr;
      curr = null;
    } else {
      curr = curr.right;
    }
  }

  return moves;
}

const root1 = new TreeNode(0);
root1.left = new TreeNode(0);
root1.left.left = new TreeNode(4);
root1.left.right = new TreeNode(0);
root1.right = new TreeNode(0);
root1.right.left = new TreeNode(3);
root1.right.right = new TreeNode(0);

const root2 = new TreeNode(3);
root2.left = new TreeNode(0);
root2.right = new TreeNode(0);

const root3 = new TreeNode(1);

const root4 = new TreeNode(0);
root4.left = new TreeNode(3);
root4.right = new TreeNode(0);

console.log(distributeCoins(root1)); //* 8
console.log(distributeCoins(root2)); //* 2
console.log(distributeCoins(root3)); //* 0
console.log(distributeCoins(root4)); //* 3

//* Time: O(n) - We have to traverse to every node in the tree
//* We have no heuristic that we can use to skip any work

//* Space: O(n) - The coinMap scales in size linearly with the number of nodes in the tree
//* The space used by the stack scales with the height of the tree
