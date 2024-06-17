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
  function dfs(curr) {
    //* Can't distribute to / from a null node
    if (curr === null) return 0;

    const left = dfs(curr.left);
    const right = dfs(curr.right);

    //* Returning from a leaf with 0 gives -1
    //* But you can't have -1 moves
    moves += Math.abs(left) + Math.abs(right);

    //* The sum of the left and right subtrees + these coins - 1
    //* It takes ONE move to move ONE coin
    return left + right + curr.val - 1;
  }

  let moves = 0;
  dfs(root);
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

//* Space: O(h) - The depth of the call stack scales with the height of the tree
//* If the tree is balanced, the space usage is O(log n)
//* When the tree resembles a linked list, the space usage is O(n), but h <= n
