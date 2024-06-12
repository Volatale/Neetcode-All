class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Track the MAXIMUM value found in the current path
//* Push tuples of [Node, maxInPath]
//* Track the number of good nodes we have found
//* If curr.val >= maxInPath, you found a good node
//* If left or right exist, push new tuples
//* The new maxInPath becomes Math.max(maxInPath, curr.val)
//* We are comparing the CURRENT value with the current max (that we popped)
//* So if the current > maxInPath, we push the maximum
function goodNodes(root) {
  //* [Node, maxInPath]
  const stack = [[root, root.val]];

  let goodNodes = 0;

  while (stack.length > 0) {
    const [curr, maxInPath] = stack.pop();

    //* Curr is a "good" node
    goodNodes += curr.val >= maxInPath;

    //* Process the children too
    if (curr.right) {
      //* Include whichever "maxInPath" value is larger (maxInPath vs curr.val)
      stack.push([curr.right, Math.max(maxInPath, curr.val)]);
    }

    if (curr.left) {
      stack.push([curr.left, Math.max(maxInPath, curr.val)]);
    }
  }

  return goodNodes;
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
//* We do constant time work within each iteration
//* It takes Amortized Constant Time to push to an array

//* Space: O(h) - The stack size scales with the height of the tree
//* If the tree is balanced, the space usage is O(log n)
//* Otherwise, the tree could resemble a linked list
