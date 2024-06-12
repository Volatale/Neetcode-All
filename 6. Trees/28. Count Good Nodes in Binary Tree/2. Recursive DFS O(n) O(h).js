class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Record the MAXIMUM value along the path from root to the node
//* Infinity is the SMALLEST number we can start with
//* We only include nodes that are >= maxInPath
//* The call stack implicitly "removes" the max at the current level
//* This happens when we go back up the tree
//* Do the same process recursively for the left and right subtrees
function goodNodes(root) {
  return countGoodNodes(root, -Infinity);
}

function countGoodNodes(curr, maxInPath) {
  if (curr === null) return 0;

  //* Node is GOOD if value is >= max in this path
  let goods = curr.val >= maxInPath ? 1 : 0;

  //* Find the good nodes on the left and right subtree
  goods += countGoodNodes(curr.left, Math.max(maxInPath, curr.val));
  goods += countGoodNodes(curr.right, Math.max(maxInPath, curr.val));

  return goods;
}

const root1 = new TreeNode(3);
root1.left = new TreeNode(1);
root1.left.left = new TreeNode(3);
root1.right = new TreeNode(4);
root1.right.left = new TreeNode(1);
root1.right.right = new TreeNode(5);

const root2 = new TreeNode(3);
root2.left = new TreeNode(3);
root2.left.left = new TreeNode(4);
root2.left.right = new TreeNode(2);

const root3 = new TreeNode(1);

console.log(goodNodes(root1)); //* 4
console.log(goodNodes(root2)); //* 3
console.log(goodNodes(root3)); //* 1

//* Time: O(n) - We have to process every node in the tree
//* We do constant time work in each recursive call "n" times (so O(n))

//* Space: O(h) - The depth of the call stack scales with the height of the tree
//* If the tree is balanced, the space usage is O(log n)
//* When the tree resembles a linked list, the space usage is O(h)
