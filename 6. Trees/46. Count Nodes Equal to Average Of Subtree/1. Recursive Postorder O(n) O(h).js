class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* In a postorder manner, get the number of nodes on each subtree and the sum for each node
//*     - We need to process both children BEFORE processing the current node
//*     - Hence we need to use postorder traversal
//* A null node has no sum, nor any children
//*     - So in this case, just return an array of [0, 0]/
//*     - This indicates this subtree had 0 nodes and a sum of 0
function countNodesEqualToAverageOfSubstrees(root) {
  function postOrder(curr) {
    //* Base Case: [Nodes in subtree, sum of nodes]
    if (curr === null) return [0, 0];

    const [leftNodes, leftSum] = postOrder(curr.left);
    const [rightNodes, rightSum] = postOrder(curr.right);

    const totalNodes = 1 + leftNodes + rightNodes;
    const sum = curr.val + leftSum + rightSum;

    //* Calculate the average of nodes on left and right subtree (including this node)
    if (Math.floor(sum / totalNodes) === curr.val) {
      count++;
    }

    return [totalNodes, sum];
  }

  let count = 0;

  postOrder(root);
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

console.log(countNodesEqualToAverageOfSubstrees(root1)); //* 4
console.log(countNodesEqualToAverageOfSubstrees(root2)); //* 5

//* Time: O(n) - We have to process every node once - there are "n" nodes in total

//* Space: O(n) - The depth of the recursion tree scales with the height of the tree
//* In the worst case, the tree resembles a linked list
//* In the best case, the tree is balanced, so the space complexity would be O(log n)
