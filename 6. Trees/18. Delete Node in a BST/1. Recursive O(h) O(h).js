class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Travel to the node we need to remove
//* This is a BST so we can utilize the properties of a BST
//* If the current node is > our node, go left
//* Else if the current node is < our node, go right
//* Else, we are at the node we want to delete
//* There are FOUR cases we have to consider from here
//* A node with NO children can just be removed as is (set to null)
//* If the node has no left, return the right child
//* If the node has no right, return the left child
//* If the node has BOTH children, we need to do more
//* Travel right once, and from there, as left as possible
//* Set the node we want to delete's value to the traversed-to node's value
//* Now there are two nodes with the same value in the tree
//* Recursively call deleteNode, but this time on root.right, and root.val
//* Eventually, the duplicate node will be set to null due to one of the conditions
function deleteNode(root, key) {
  //* Base Case
  if (root === null) return null;

  //* Traversal
  if (key < root.val) {
    root.left = deleteNode(root.left, key); //* Value too large, go left
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key); //* Value too small, go right
  } else {
    //* Handle the removals
    if (root.left === null) {
      return root.right; //* Only right child
    } else if (root.right === null) {
      return root.left; //* Only Left Child
    } else {
      //* Both Children
      root.val = getMinValue(root.right); //* Find MIN value in RIGHT subtree
      root.right = deleteNode(root.right, root.val); //* Remove the duplicate node

      //   root.val = getMaxValue(root.left); //*! Or, find MAX value in LEFT subtree
      //   root.left = deleteNode(root.left, root.val)
    }
  }

  return root;
}

//* Find MINIMUM value in RIGHT subtree
function getMinValue(curr) {
  let minValue = curr.val;

  while (curr.left !== null) {
    curr = curr.left; //* Move FIRST, we already got the first value
    minValue = curr.val;
  }

  return minValue;
}

//* Find MAXIMUM value in LEFT subtree
function getMaxValue(curr) {
  let maxValue = curr.val;

  while (curr.right !== null) {
    curr = curr.right; //* Move FIRST, we already got the first value
    maxValue = curr.val;
  }

  return maxValue;
}

const root1 = new TreeNode(5);
root1.left = new TreeNode(4);
root1.left.left = new TreeNode(1);

const root2 = new TreeNode(5);
root2.right = new TreeNode(7);
root2.right.right = new TreeNode(8);

const root3 = new TreeNode(5);
root3.left = new TreeNode(4);
root3.left.left = new TreeNode(1);
root3.right = new TreeNode(9);
root3.right.left = new TreeNode(7);
root3.right.left.left = new TreeNode(6);
root3.right.left.right = new TreeNode(8);
root3.right.right = new TreeNode(10);

console.log(deleteNode(root1, 4)); //* [5, 1]
console.log(deleteNode(root1, 5)); //* [4, 1]
console.log(deleteNode(root2, 7)); //* [5, 8]
console.log(deleteNode(root2, 5)); //* [7, 8]
console.log(deleteNode(root3, 10));
console.log(deleteNode(root3, 7)); //* 8 becomes 9's left child
console.log(deleteNode(root3, 9)); //* 10 becomes 5's right child

//* Time: O(h) - The time taken scales with the height of the tree
//* This is a BST so we can avoid processing every node

//* Space: O(h) - The depth of the call stack scales with the height of the tree
//* In the worst case it would be O(n) for a skewed tree (linked list style)
//* If the tree is balanced, the space usage is limited to O(log n)
