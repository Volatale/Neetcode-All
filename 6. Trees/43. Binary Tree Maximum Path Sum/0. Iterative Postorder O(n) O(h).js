class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* We want to be able to sum the left and right subtrees nodes
//* But we DON'T want to include their values if they return negative
//* Summing negative values would DECREASE the path sum; ignore them (default to 0)
//* So we take the MAXIMUM of the recursive call and 0
//* Therefore the minimum value we can sum on that subtree becomes "0"
//* Basically, we don't include paths that return a negative value
//* Propagate the sum of the current value and the max of the left and right
//* A VALID path can only use ONE branch, so we return the current node + max(left, right)
function maxPathSum(root) {
  if (root === null) return 0;

  const stack = [];
  const pathMap = new Map(); //* Holds the path sums of each node
  let maxSum = -Infinity;

  let curr = root;
  let prev = null;

  while (curr !== null || stack.length > 0) {
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack[stack.length - 1];

    if (curr.right === null || curr.right === prev) {
      //* Get the max path sum from the left and right subtrees
      //* We DON'T want to include negative values, however
      const left = Math.max(pathMap.get(curr.left) || 0, 0);
      const right = Math.max(pathMap.get(curr.right) || 0, 0);

      //* Try to update maxSum
      maxSum = Math.max(maxSum, left + right + curr.val);

      //* Set the path sum of THIS node; valid paths only include ONE branch of a node
      pathMap.set(curr, curr.val + Math.max(left, right));

      stack.pop();
      prev = curr;
      curr = null;
    } else {
      curr = curr.right;
    }
  }

  return maxSum;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);

const root2 = new TreeNode(-10);
root2.left = new TreeNode(9);
root2.right = new TreeNode(20);
root2.right.left = new TreeNode(15);
root2.right.right = new TreeNode(7);

const root3 = new TreeNode(-10);
root3.left = new TreeNode(50);
root3.right = new TreeNode(-70);

const root4 = new TreeNode(20);
root4.left = new TreeNode(-10);
root4.right = new TreeNode(-10);

console.log(maxPathSum(root1));
console.log(maxPathSum(root2));
console.log(maxPathSum(root3));
console.log(maxPathSum(root4));

//* Time: O(n) - We have to process every node in the tree
//* We don't have any heuristics we can use to cut down on work

//* Space: O(h) - The call stack depth scales with the height of the tree
//* When the tree is balanced, the stack size is limited to O(log n)
//* If the tree resembles a linked list, the space usage is O(h), which === O(n)
//* But h <= n
