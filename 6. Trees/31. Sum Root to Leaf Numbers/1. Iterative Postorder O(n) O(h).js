class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Use Postorder Traversal
//* We need to process the left and right children before the current node
//* Use the equation sum * 10 + curr.val
//* This lets us handle place value
//* Check if the current node is null, then do the equation one more time
function sumRootToLeafPath(root) {
  let curr = root;
  let prev = null;

  let sum = 0;
  let totalSum = 0;

  //* [node, sum]
  const stack = [];

  while (curr !== null || stack.length > 0) {
    while (curr !== null) {
      sum = sum * 10 + curr.val; //* Add the current digit (place value)
      stack.push([curr, sum]); //* Push the state to the stack
      curr = curr.left;
    }

    //* Retrieve the state
    [curr, sum] = stack[stack.length - 1];

    if (curr.right === null || curr.right === prev) {
      //* If the current node is a leaf
      if (curr.left === null && curr.right === null) {
        totalSum += sum;
      }

      stack.pop();
      prev = curr;
      curr = null;
    } else {
      curr = curr.right;
    }
  }

  return totalSum;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(3);
root2.left.right = new TreeNode(4);
root2.right = new TreeNode(5);
root2.right.left = new TreeNode(6);
root2.right.right = new TreeNode(7);

const root3 = new TreeNode(4);
root3.left = new TreeNode(9);
root3.left.left = new TreeNode(5);
root3.left.right = new TreeNode(1);
root3.right = new TreeNode(0);

console.log(sumRootToLeafPath(root1)); //* 25
console.log(sumRootToLeafPath(root2)); //* 560
console.log(sumRootToLeafPath(root3)); //* 1026

//* Time: O(n) - It takes O(n) time to traverse to every node
//* Pushing to an array takes Amortized Constant Time

//* Space: O(h) - The space used by the stack scales with the height of the tree
//* If the tree is balanced, the space usage is limited to O(h)
