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
//! This is the iterative version, so we need to use a data structure to track the relevant data
//*     - We can just use a map where the keys are the nodes themselves, and the value is a nodes' data [nodeCount, sumOfSubtree]
//* Once the left and right children have been processed, we can calculate the average of the current node
//* Note that the average of a node's subtree actually also includes the node itself
function averageOfSubtree(root) {
  //* A null node has a node count of 0, and a sum of 0
  if (root === null) return 0;

  const stack = [];
  let curr = root;
  let prev = null;
  let count = 0;

  //* "Node" has [nodesInSubtree, sumOfSubtree]. null has [0, 0]
  const nodeMap = new Map([[null, [0, 0]]]);

  while (stack.length > 0 || curr !== null) {
    while (curr !== null) {
      //* Add the children to the map so we can get the averages later
      if (curr.left) nodeMap.set(curr.left, [1, curr.left.val]);
      if (curr.right) nodeMap.set(curr.right, [1, curr.right.val]);

      stack.push(curr);
      curr = curr.left;
    }

    curr = stack[stack.length - 1];

    if (curr.right === null || curr.right === prev) {
      const [leftNodes, leftSum] = nodeMap.get(curr.left);
      const [rightNodes, rightSum] = nodeMap.get(curr.right);

      const nodeCount = leftNodes + rightNodes + 1;
      const sum = leftSum + rightSum + curr.val;
      const average = Math.floor(sum / nodeCount);

      //* Found a node whose value equals the average of its subtrees
      if (curr.val === average) {
        count++;
      }

      //* Update the nodeCount and sum for the current node
      nodeMap.set(curr, [nodeCount, sum]);

      //* Finish processing the node
      stack.pop();
      prev = curr;
      curr = null;
    } else {
      curr = curr.right;
    }
  }

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
//* Map operations take O(1) on average

//* Space: O(n) - The stack can contain all "n" nodes in the worst case
//* The map will end up having a key/value for all n nodes
