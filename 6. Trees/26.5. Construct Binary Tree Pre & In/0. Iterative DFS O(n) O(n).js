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
function buildTreeIterative(preorder, inorder) {
  let preIndex = 0;
  const indices = {}; //* Holds the indices of elements in inorder (for O(1) access)

  const root = new TreeNode(null);

  //* [node, start, end] (iterative divide and conquer)
  const stack = [[root, 0, inorder.length - 1]];

  for (let i = 0; i < inorder.length; i++) {
    indices[inorder[i]] = i;
  }

  while (stack.length > 0) {
    const [curr, start, end] = stack.pop();

    //* "Take" the node from preorder
    curr.val = preorder[preIndex++];

    //* Find the index of curr.val in the inorder array
    //* Anything to the LEFT or RIGHT of valIndex is on THAT respective subtree
    const valIndex = indices[curr.val];

    //* Push the right child first (we want to process the left first)
    if (valIndex + 1 <= end) {
      curr.right = new TreeNode(null);
      stack.push([curr.right, valIndex + 1, end]);
    }

    if (valIndex - 1 >= start) {
      curr.left = new TreeNode(null);
      stack.push([curr.left, start, valIndex - 1]);
    }
  }

  return root;
}

console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));
console.log(buildTree([-1], [-1]));
console.log(buildTree([1, 2, 4, 5, 3, 6, 7], [4, 2, 5, 1, 6, 3, 7]));

//* Time: O(n) - We have to process every node in the tree (both arrays)
//* It takes O(n) time to populate the indices object
//* Since we have that object, it takes Θ(1) to find values in inorder
//* There are "n" iterations of the loop

//* Space: O(n) - The number of keys in indices scales with the number of nodes - O(n)
//* We create a new node for every element in the arrays - O(n)
//* The size of the stack scales with the height of the tree
//* If the tree is balanced, the stack size is limited to O(log n)
