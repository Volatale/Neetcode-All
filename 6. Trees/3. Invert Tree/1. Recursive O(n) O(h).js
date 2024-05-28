class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function invertTree(root) {
  if (root === null) return root;

  return invert(root);
}

//* Inverting the left and right children is the same as swapping them
//* We need to perform these same steps for both the left and right subtrees
function invert(curr) {
  if (curr === null) return curr;

  //* Swap the left and right
  let temp = curr.left;
  curr.left = curr.right;
  curr.right = temp;

  //* Do the same for the left and right subtree
  invert(curr.left);
  invert(curr.right);

  return curr;
}

const root = new TreeNode(2);
root.left = new TreeNode(1);
root.right = new TreeNode(3);

const root2 = new TreeNode(4);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(1);
root2.left.right = new TreeNode(3);
root2.right = new TreeNode(7);
root2.right.left = new TreeNode(6);
root2.right.right = new TreeNode(9);

const root3 = new TreeNode(1);

console.log(invertTree(root));
console.log(invertTree(root2));
console.log(invertTree(root3));
console.log(invertTree(null));

//* Time: O(n) - We have to travel to every node in the list

//* Space: O(h) - The space usage scales with the height of the tree
//* In the worst case, the tree resembles a linked list
//* In the best case, we have a perfect binary tree, so the space usage is O(log n)
