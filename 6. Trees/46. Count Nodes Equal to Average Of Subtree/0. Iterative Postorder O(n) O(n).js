class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* We need to process nodes in a postorder manner
//* Use a map to track both number of nodes on a subtree AND the sum of those nodes
//*     - Whenever we travel down the tree, store an array/tuple of the above data
//* Once all the children of a node have been processed
//*     - Get the number of nodes on each side of the subtree, plus their sum from the map
//*     - Use these values to check whether the current node meets the criteria
//*     - Create/update the key for the current node using the total number of nodes and the sum
function countNodesEqualToAverageOfSubstrees(root) {
  if (root === null) return 0;

  const stack = [];
  let curr = root;
  let prev = null;

  let count = 0;

  //* Node: [nodesInSubtree, sumOfNodes]
  //* Null is used because a node may not have children (base case)
  const nodeMap = new Map([[null, [0, 0]]]);

  while (stack.length > 0 || curr !== null) {
    //* Travel as far left as possible
    while (curr !== null) {
      //* Add children to the map so we have a reference later
      if (curr.left) nodeMap.set(curr.left, [1, curr.left.val]);
      if (curr.right) nodeMap.set(curr.right, [1, curr.right.val]);

      stack.push(curr);
      curr = curr.left; //* Go left
    }

    curr = stack[stack.length - 1];

    //* Process this node
    if (curr.right === null || prev === curr.right) {
      const [leftNodes, leftSum] = nodeMap.get(curr.right);
      const [rightNodes, rightSum] = nodeMap.get(curr.left);

      const totalNodes = 1 + leftNodes + rightNodes;
      const sum = curr.val + leftSum + rightSum;

      //* Calculate the average of nodes on left and right subtree (including this node)
      if (Math.floor(sum / totalNodes) === curr.val) {
        count++;
      }

      //* Create/Update the totalNodes and sum for THIS node
      nodeMap.set(curr, [totalNodes, sum]);

      stack.pop();
      prev = curr;
      curr = null;
    } else {
      curr = curr.right; //* Go right
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
