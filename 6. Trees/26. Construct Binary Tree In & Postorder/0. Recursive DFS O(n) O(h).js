class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Postorder processes nodes AFTER visiting the left and right children
//* So the rightmost element of "postorder" is our root
//* Since a tree is naturally recursive, we continually grab the last node
//* Keep track of the current index we are looking at in postorder
//* Find the index of postorder[postIndex] in the INORDER array
//* Anything to the LEFT of this index is a node on the LEFT subtree
//* Anything to the RIGHT of this index is a node on the RIGHT subtree
//* Then we build the RIGHT subtree first recursively since postorder is going BACKWARDS
//* After that, build the LEFT subtree
//* This is a divide and conquer since we remove the "valIndex" node from the search space
function buildTree(inorder, postorder) {
  function build(start, end) {
    //* Handles null nodes
    if (start > end) return null;

    //* Postorder is used to create the values
    const root = new TreeNode(postorder[postIndex--]);

    //* Find index of root.val in Inorder
    //* Anything left or right of valIndex is on that respective subtree
    const valIndex = indices[root.val];

    //* Build RIGHT subtree FIRST; postorder is going BACKWARDS
    //* Then build the left subtree
    root.right = build(valIndex + 1, end);
    root.left = build(start, valIndex - 1);

    return root;
  }

  let postIndex = postorder.length - 1; //* Index of next node
  const indices = {}; //* Stores the indices of values in inorder

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

//* Space: O(h) - The depth of the call stack scales with the height of the tree
//* If it is balanced, the space used is O(log n)
