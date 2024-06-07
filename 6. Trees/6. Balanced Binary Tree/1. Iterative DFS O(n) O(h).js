class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Use a hashmap to track the depth of nodes
//* We need to guarantee that the left and right subtrees are balanced first
//* Only then can we process the current node, so we should use postorder traversal
//* Push tuples of the node and the node's depth
//* Then when we have processed the left and right subtrees for this node
//* Get the left and right subtree depths from the depthMap
//* If |left - right| > 1, then the tree is not balanced
//* Otherwise, update the current node in the depthMap to the max of left and right + 1
//* We add one to include the current node in the depth
//* This lets us propagate the values up the tree, similar to the recursive version
function balancedBinaryTree(root) {
  if (root === null) return true;

  const stack = []; //* Stack for Postorder Traversal

  const depthMap = new Map(); //* Map for tracking node depths
  let depth = 0;

  let curr = root;
  let prev = null; //* Lets us go back up the tree from the right side (avoids inf loops)

  while (curr !== null || stack.length > 0) {
    //* Go left as far as possible
    while (curr !== null) {
      depth++;
      stack.push([curr, depth]);
      depthMap.set(curr, depth);
      curr = curr.left;
    }

    [curr, depth] = stack[stack.length - 1];

    if (curr.right === null || curr.right === prev) {
      stack.pop();

      //* Get depth of the left and right subtrees
      const leftDepth = depthMap.get(curr.left) || 0;
      const rightDepth = depthMap.get(curr.right) || 0;

      //* Check if the subtrees are balanced
      if (Math.abs(leftDepth - rightDepth) > 1) return false;

      //* Lets us propagate the max depth back up the tree (add 1 to include this node)
      depthMap.set(curr, Math.max(leftDepth, rightDepth) + 1);

      prev = curr;
      curr = null;
    } else {
      curr = curr.right;
    }
  }

  return true;
}

const root1 = new TreeNode(3);
root1.left = new TreeNode(9);
root1.right = new TreeNode(20);
root1.right.left = new TreeNode(15);
root1.right.right = new TreeNode(7);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(3);
root2.left.right = new TreeNode(3);
root2.left.left.left = new TreeNode(4);
root2.left.left.right = new TreeNode(4);
root2.right = new TreeNode(2);

const root3 = new TreeNode(1);
root3.left = new TreeNode(2);
root3.left.left = new TreeNode(3);
root3.left.left.left = new TreeNode(4);
root3.left.left.left.left = new TreeNode(5);

console.log(balancedBinaryTree(root1)); //* True
console.log(balancedBinaryTree(root2)); //* False
console.log(balancedBinaryTree(root3)); //* False
console.log(balancedBinaryTree(null)); //* True

//* Time: O(n) - We have to process every node in the tree regardless
//* It takes amortized O(1) to push to an array

//* Space: O(h) - The size of the stack scales with the height of the tree
//* If the tree is balanced, the space usage is limited to O(log n)
