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
  let postIndex = postorder.length - 1;
  const indices = {}; //* Holds the indices of elements in inorder (for O(1) access)

  const root = new TreeNode(null);

  //* [node, start, end]
  const stack = [[root, 0, inorder.length - 1]];

  for (let i = 0; i < inorder.length; i++) {
    indices[inorder[i]] = i;
  }

  while (stack.length > 0) {
    const [curr, start, end] = stack.pop();

    //* "Take" the node from postorder
    curr.val = postorder[postIndex--];

    //* Find the index of curr.val in inorder
    //* Anything to the LEFT or RIGHT of valIndex is on THAT respective subtree
    const valIndex = indices[curr.val];

    //* Push the left child first since we want to process RIGHT first
    if (valIndex - 1 >= start) {
      curr.left = new TreeNode(null);
      stack.push([curr.left, start, valIndex - 1]);
    }

    if (valIndex + 1 <= end) {
      curr.right = new TreeNode(null);
      stack.push([curr.right, valIndex + 1, end]);
    }
  }

  return root;
}

console.log(buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3]));
console.log(buildTree([10, 6, 7, 3, 9], [10, 7, 6, 9, 3]));
console.log(buildTree([2, 1, 3], [2, 3, 1]));

//* Time: O(n) - It takes O(n) time to iterate over the inorder array
//* Then we do O(n) iterations of the while loop (one for each node)

//* Space: O(n) - The space used by the indices object scales with the number of nodes
//* The stack size scales proportionally with the height of the tree
//* If the tree is balanced, the stack size is limited to O(log n)
