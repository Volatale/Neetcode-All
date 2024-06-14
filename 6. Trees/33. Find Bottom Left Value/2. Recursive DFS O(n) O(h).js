class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Use Depth First Search
//* Track the current depth, and the maximum depth
//* The first time we reach a new depth
//* Modify the bottomLeft variable
function findBottomLeftValue(root) {
  function dfs(curr, depth) {
    if (curr === null) return;

    //* Found a new "max depth", so this is currently the leftmost node
    if (depth > maxDepth) {
      bottomLeft = curr.val;
      maxDepth = depth;
    }

    //* Check the left and right subtrees
    dfs(curr.left, depth + 1);
    dfs(curr.right, depth + 1);
  }

  let maxDepth = 0;
  let bottomLeft = root.val;

  dfs(root, 0);
  return bottomLeft;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(4);
root2.right = new TreeNode(3);
root2.right.left = new TreeNode(5);
root2.right.left.left = new TreeNode(7);
root2.right.right = new TreeNode(6);

const root3 = new TreeNode(100);

const root4 = new TreeNode(1);
root4.left = new TreeNode(3);
root4.left.left = new TreeNode(5);
root4.right = new TreeNode(4);

const root5 = new TreeNode(1);
root5.left = new TreeNode(2);
root5.left.left = new TreeNode(3);

const root6 = new TreeNode(2);
root6.left = new TreeNode(1);
root6.right = new TreeNode(3);

console.log(findBottomLeftValue(root1)); //* 2
console.log(findBottomLeftValue(root2)); //* 7
console.log(findBottomLeftValue(root3)); //* 100
console.log(findBottomLeftValue(root4)); //* 5
console.log(findBottomLeftValue(root5)); //* 3
console.log(findBottomLeftValue(root6)); //* 1

//* Time: O(n) - We have to process every node in the tree
//* Any node can have "n" depth, so we need to check every node
//* It takes O(1) time to dequeue

//* Space: O(h) - The depth of the call stack scales with the height of the tree
//* If the tree is balanced, the size is limited to O(log n)
//* When the tree resembles a linked list, the size is O(n)
