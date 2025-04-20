class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Return the number of nodes where the average is equal to the average of its subtree
//* So for each node, we need to know how many nodes are in its left and right subtrees
//* And we also need to know what the SUMS of those subtrees are.
//* To calculate the average of a node's subtrees, we first need to ensure the children are processed
//* Thus, we need to do a Postorder traversal (DFS) of the tree (left, right, node)
//* Once the left and right children have been processed, we can calculate the average of the current node
//* Note that the average of a node's subtree actually also includes the node itself
function averageOfSubtree(root) {
  function postorder(node) {
    //* Base Case: A null node has a node count of 0, and a sum of 0
    if (node === null) return [0, 0];

    const [leftCount, leftSum] = postorder(node.left);
    const [rightCount, rightSum] = postorder(node.right);

    //* These values include the current node
    const nodeCount = leftCount + rightCount + 1;
    const nodeSum = leftSum + rightSum + node.val;
    const average = Math.floor(nodeSum / nodeCount);

    //* Found a node whose value equals the average of its subtrees
    if (average === node.val) count++;

    return [nodeCount, nodeSum];
  }

  if (root === null) return 0;

  let count = 0;
  postorder(root);
  return count;
}

const root1 = new TreeNode(4);
root1.left = new TreeNode(6);
root1.left.left = new TreeNode(5);
root1.left.right = new TreeNode(6);
root1.right = new TreeNode(3);

const root2 = new TreeNode(4);
root2.left = new TreeNode(8);
root2.left.left = new TreeNode(0);
root2.left.right = new TreeNode(1);
root2.right = new TreeNode(5);
root2.right.right = new TreeNode(6);

console.log(averageOfSubtree(root1)); //* 4
console.log(averageOfSubtree(root2)); //* 5
console.log(averageOfSubtree(null)); //* 0
console.log(averageOfSubtree(new TreeNode(1))); //* 1

//* Time: O(n) - We have to process every node once - there are "n" nodes in total

//* Space: O(n) - The depth of the recursion tree scales with the height of the tree
//* In the worst case, the tree resembles a linked list
//* In the best case, the tree is balanced, so the space complexity would be O(log n)
