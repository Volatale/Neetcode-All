class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildTree(inorder, postorder) {
  const n = inorder.length;
  return build(inorder, postorder, 0, n - 1, n - 1);
}

function build(inorder, postorder, inStart, inEnd, postIndex) {
  //* Base Case - Handles null nodes
  if (inStart > inEnd) return null;

  //* Postorder is used to create the values
  const root = new TreeNode(postorder[postIndex--]);

  //* Find index of root.val in Inorder
  //* Anything on the LEFT of this index is on the LEFT subtree
  //* Anything on the RIGHT of this index is on the RIGHT subtree
  const valIndex = inorder.indexOf(root.val);

  root.right = build(inorder, postorder, valIndex + 1, inEnd, postIndex);

  //* Already processed all the nodes on the right
  //* Decrement postIndex by the amount of nodes on the right subtree
  postIndex -= inEnd - valIndex;

  root.left = build(inorder, postorder, inStart, valIndex - 1, postIndex);

  return root;
}

console.log(buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3]));
console.log(buildTree([10, 6, 7, 3, 9], [10, 7, 6, 9, 3]));
console.log(buildTree([2, 1, 3], [2, 3, 1]));

//* Time: O(n) - Every node is processed once when building the tree
//* It takes O(n) time to find the index of "root.val" in inorder
//* But this can be optimized to O(1) using a hashtable/hashmap

//* Space: O(h) - The depth of the call stack scales with the height of the tree
//* If it is balanced, the space used is O(log n)
