class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Use the properties of a BST
//* If the current value is too large, we need to insert on the LEFT subtree
//* If the current value is too small, insert on the RIGHT subtree
//* So in each iteration of the loop, we compare the value against the node
//* Travel in the correct direction accordingly
//* If you can't travel anymore, you are at the LEAF node
//* In which case just attach a new node in the appropriate direction
function insertIntoBST(root, val) {
  //* There is no node; create one
  if (root === null) return new TreeNode(val);

  //* Used to traverse the BST
  let curr = root;

  while (curr !== null) {
    if (curr.val > val) {
      if (curr.left !== null) {
        curr = curr.left; //* Go left, we need a SMALLER value
      } else {
        //* This is the leaf node
        curr.left = new TreeNode(val); //* Add the new node
        break;
      }
    } else if (curr.val < val) {
      if (curr.right !== null) {
        curr = curr.right; //* Go left, we need a SMALLER value
      } else {
        //* This is the leaf node
        curr.right = new TreeNode(val); //* Add the new node
        break;
      }
    }
  }

  return root;
}

const root = new TreeNode(4);
root.left = new TreeNode(2);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(3);
root.right = new TreeNode(7);

const root2 = new TreeNode(5);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(1);
root2.left.right = new TreeNode(3);
root2.left.right.right = new TreeNode(4);
root2.right = new TreeNode(7);

const root3 = new TreeNode(10);

console.log(insertIntoBST(root, 5));
console.log(insertIntoBST(root2, 8));
console.log(insertIntoBST(root3, 11)); //* [10, null, 11]
console.log(insertIntoBST(root3, 1)); //* [10, 1, null]
console.log(insertIntoBST(null, 100)); //* [100]

//* Time: O(h) - In the worst case, the tree is unbalanced
//* The time taken scales with the height of the tree
//* Imagine a left skewed tree that is 5 levels high, we still have to traverse 5 times
//* Regardless of the fact that this is a BST; if it IS balanced, however, the time taken is O(log n)

//* Space: O(1) - We only create a single node in the entire function
//* Any other work done involves iterative traversals
//* The space used is independant of the input size
