class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* In a preorder traversal, the first node is ALWAYS the root
//* Since this is a tree we can recursively apply the same logic
//* Repeatedly take nodes from the front of the PREORDER array
//* Then, find that value in the INORDER array
//* Anything on the LEFT of that index in inorder is on the LEFT subtree
//* Anything on the RIGHT of that index is on the RIGHT subtree
//* Recursively call build for root.left and root.right
//* We build the LEFT subtree first since we PREORDER processes nodes FIRST
//* Then, build the right subtree
//* This is basically divide and conquer since we reduce the search space each call
function buildTree(preorder, inorder) {
  function build(start, end) {
    //* Base Case - Handles the null nodes
    if (end < start) return null;

    //* Create the node using preorder
    const root = new TreeNode(preorder[preIndex++]);

    //* Find the index of preorder[preIndex] in inorder
    //* Anything left or right of valIndex is on that respective subtree
    const valIndex = indices[root.val];

    //* Build the LEFT subtree first since we grab PREORDER nodes
    //* Then build the RIGHT subtree
    root.left = build(start, valIndex - 1);
    root.right = build(valIndex + 1, end);

    return root;
  }

  let preIndex = 0; //* Tracks the next node we need in preorder

  const indices = {};

  //* Key = inorder[i], value = i
  for (let i = 0; i < inorder.length; i++) {
    indices[inorder[i]] = i;
  }

  return build(0, inorder.length - 1);
}

console.log(buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3]));
console.log(buildTree([10, 6, 7, 3, 9], [10, 7, 6, 9, 3]));
console.log(buildTree([2, 1, 3], [2, 3, 1]));

//* Time: O(n) - We have to process every node in the tree (both arrays)
//* It takes O(n) time to populate the indices object
//* Since we have that object, it takes Θ(1) to find values in inorder
//* There will be "n" recursive calls to build

//* Space: O(n) - The number of keys in indices scales with the number of nodes - O(n)
//* We create a new node for every element in the arrays - O(n)
//* The depth of the call stack scales with the height of the tree
//* If the tree is balanced, the depth of the call stack is O(log n)
