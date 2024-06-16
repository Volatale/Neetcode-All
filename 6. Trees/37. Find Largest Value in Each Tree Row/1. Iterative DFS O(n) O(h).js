class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Perform a DFS
//* We need a way to track the nodes and their depths
//* So push tuples of [node, depth]
//* The first time we reach a new depth, add an element to the depthArray
//* It is initialized to -Infinity because we want to find MAXIMUM values
//* Whenever we process a node, try to update depthArray[depth]
function largestValues(root) {
  if (root === null) return [];

  //* [node, depth]
  const stack = [[root, 0]];

  //* depthArray[i] = maxDepth at depth i
  const depthArray = [];

  while (stack.length > 0) {
    const [curr, depth] = stack.pop();

    //* When reaching a new depth, set the max of that depth to -infinity
    if (depth === depthArray.length) {
      depthArray.push(-Infinity);
    }

    //* Try to find a new best for this depth
    depthArray[depth] = Math.max(depthArray[depth], curr.val);

    //* We need to process the children too
    if (curr.right) {
      stack.push([curr.right, depth + 1]);
    }

    if (curr.left) {
      stack.push([curr.left, depth + 1]);
    }
  }

  return depthArray;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(3);
root1.left.left = new TreeNode(5);
root1.left.right = new TreeNode(3);
root1.right = new TreeNode(2);
root1.right.right = new TreeNode(9);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.right = new TreeNode(3);

const root3 = new TreeNode(5);

const root4 = new TreeNode(10);
root4.left = new TreeNode(20);
root4.left.left = new TreeNode(30);
root4.left.left.left = new TreeNode(40);
root4.left.left.left.left = new TreeNode(50);

console.log(largestValues(root1)); //* [1, 3, 9]
console.log(largestValues(root2)); //* [1, 3]
console.log(largestValues(root3)); //* [5]
console.log(largestValues(root4)); //* [10, 20, 30, 40, 50]
console.log(largestValues(null)); //* []

//* Time: O(n) - We have to process every node in the tree
//* We have no guarantee of knowing where the max value is
//* Pushing a value to an array is Amortized Constant Time

//* Space: O(h) - The stack size scales with the height of the tree
//* If the tree resembles a linked list, we store every element (so h === n)
//* When the tree is balanced, the stack size is limited to O(log n)
//* The depthArray scales with the number of levels in the tree
